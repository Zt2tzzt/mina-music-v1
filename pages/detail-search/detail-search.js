import { getHotKey, getSuggest, getSearchResult } from '../../services/modules/search'
import playerStore from '../../store/playStore'
import debounce from '../../utils/debounce'
import string2Nodes from '../../utils/string2Nodes'

const debounceGetSearchSugest = debounce(getSuggest, 500)

Page({

	data: {
		hotKeys: [], // 服务器返回的热门关键字
		searchValue: "", // 搜索的关键字
		suggestSongs: [], // 根据搜索的关键字联想的歌曲
		suggestSongsNodes: [], // 用于富文本组件的关键字联想Nodes
		resultSongs: [], // 搜索结果
	},

	// ------------------------------------生命周期---------------------------------------

	onLoad: function () {
		this.getPageData()
	},

	// ------------------------------------事件处理---------------------------------------

	// 搜索框输入事件
	onSearchInputChange(event) {
		// 1.获取输入的关键字
		const searchValue = event.detail
		// 2.保存关键字
		this.setData({ searchValue })
		// 3.判断关键字为空字符的处理逻辑
		if (!searchValue.length) {
			this.setData({
				suggestSongs: [],
				resultSongs: []
			})
			debounceGetSearchSugest.cancel()
			return
		}
		// 4.根据关键字进行搜索
		debounceGetSearchSugest(searchValue).then(res => {
			// 1.获取建议的关键字歌曲
			const suggestSongs = res.result.allMatch
			this.setData({ suggestSongs })

			// 2.转成nodes节点
			if (!suggestSongs) return
      const suggestSongsNodes = suggestSongs.map(item => string2Nodes(item.keyword, searchValue))
      console.log('suggest Song node:', suggestSongsNodes);
			this.setData({ suggestSongsNodes })
		})
	},

	// 搜索框确认事件
	onSearchConfirm() {
		const searchValue = this.data.searchValue
		getSearchResult(searchValue).then(res => {
			this.setData({ resultSongs: res.result.songs })
		})
	},

	// 热门关键词/联想关键词点击事件
	onkeyWordTap(event) {
		// 1.获取关键词
		const keyword = event.currentTarget.dataset.keyword
		// 2.将关键设置到searchValue中
		this.setData({ searchValue: keyword })
		// 3.发送网络请求
		this.onSearchConfirm()
	},

	// 歌曲item点击事件
	onItemTap(event) {
		const index = event.currentTarget.dataset.index
		playerStore.setState('songs', this.data.resultSongs)
		playerStore.setState('songIndex', index)
	},

	// ------------------------------------自行封装---------------------------------------

	getPageData() {
		getHotKey().then(res => {
			this.setData({ hotKeys: res.result.hots })
		})
	},

})