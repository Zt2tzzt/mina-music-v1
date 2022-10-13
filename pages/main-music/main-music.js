import { getBanners, getMenu } from '../../services/modules/music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
import recommendStore from '../../store/recommendStore'

const queryRectThrottle = throttle(queryRect, 30)

Page({

  data: {
    banners: [],
    swiperHeight: 150,
    recommendSongs: [],
    hotMenu: [],
    screenWidth: 375
  },

	// -------------------- 生命周期 ----------------------

  onLoad() {
    // 发送请求，获取轮播图
    this.fetchBanners()
    // 发送请求，获取热门歌单
    this.fetchHotMenu()
    // 发送请求，获取推荐歌曲
    recommendStore.dispatch('fetchRecommendSongsAction')
    recommendStore.onState('recommendSongs', this.handleRecommendSongs)
  },

  onUnload() {
    recommendStore.offState('recommendSongs', this.handleRecommendSongs)
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
  handlleRecommendSongLoadMore() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song'
    })
  },

  // 从 store 中获取 recommendSongs
  handleRecommendSongs(value) {
    console.log('onState recoSong value:', value)
    this.setData({
      recommendSongs: value.slice(0, 6)
    })
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
  }

})