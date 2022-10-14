import { getBanners, getMenu } from '../../services/modules/music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import recommendStore from '../../store/recommendStore'
import ranksStore, { ranksKey, ranks } from '../../store/ranksStore'

const queryRectThrottle = throttle(queryRect, 30)

Page({

  data: {
    banners: [], // 轮播图

    swiperHeight: 150, // 轮播图高度
    screenWidth: 375, // 屏幕宽度

    recommendSongs: [], // 推荐歌曲

    hotMenu: [], // 热门歌单
    recommendMenu: [], // 推荐歌单

    ranks,
    hasRanksData: false
  
  },

	// -------------------- 生命周期 ----------------------

  onLoad() {
    // 发送请求，获取轮播图
    this.fetchBanners()
    // 发送请求，获取热门歌单
    this.fetchHotMenu()
    // 发送请求，获取推荐歌单
    this.fetchRecommendMenu()

    // 发送请求，获取推荐歌曲
    recommendStore.dispatch('fetchRecommendSongsAction')
    recommendStore.onState('recommendSongs', this.handleRecommendSongs)

    // 发送请求，获取排行榜
    ranksStore.dispatch('fetchRanksSongs')
    ranksKey.forEach(key => {
      ranksStore.onState(key, this.handleRanks(key))
    })
    // ranksStore.onStates(['new', 'original', 'soaring'], this.handleRanks)
  },

  onUnload() {
    recommendStore.offState('recommendSongs', this.handleRecommendSongs)
    ranksKey.forEach(key => {
      ranksStore.offState(key, this.handleRanks(key))
    })
  },

	// -------------------- 事件处理 ----------------------

  // 点击搜索框，跳转搜索页面
  onSearchInputTap() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search'
    });
  },

  // 处理轮播图加载完成的事件
  onImageLoaded() {
    queryRectThrottle('.swiper-image').then(res => {
      this.setData({
        swiperHeight: res[0].height
      })
    })
  },

  // 处理标题右测区域点击
  handlleMoreRecommendSongTap() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend'
    })
  },

  // 从 store 中获取 recommendSongs
  handleRecommendSongs(value) {
    console.log('onState recoSong value:', value)
    this.setData({
      recommendSongs: value.tracks?.slice(0, 6)
    })
  },

  // 从 store 中获取新歌榜、原创榜、飙升榜数据
  handleRanks(key) {
    return value => {
      console.log('onState ranks:', key, 'value:', value)
      this.setData({
        hasRanksData: !!value.name,
        ranks: { ...this.data.ranks, [key]: value }
      })

    }
  },

	// -------------------- 自行封装 ----------------------

  // 发送网络请求，获取轮播图数据。
  async fetchBanners() {
    const res = await getBanners()
    this.setData({
      banners: res.banners
    })
  },

  // 发送网络请求，获取热门歌单。
  async fetchHotMenu() {
    const res = await getMenu()
    console.log('hot menu res:', res)
    this.setData({
      hotMenu: res.playlists
    })
  },

  // 发送网络请求，获取推荐歌单。
  async fetchRecommendMenu() {
    const res = await getMenu('华语')
    console.log('recommend menu res:', res)
    this.setData({
      recommendMenu: res.playlists
    })
  }

})