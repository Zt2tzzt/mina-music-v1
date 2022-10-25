import { playListCollection } from "../../database/index"
import playListStore from "../../store/playListStore"

Page({

  data: {
    isLogin: false,
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    tabs: [
      {
        name: "我的收藏",
        type: "favor"
      },
      {
        name: "我的喜欢",
        type: "like"
      },
      {
        name: "历史记录",
        type: "history"
      },
    ],
    showDialog: false,
    playListName: '', // 新建歌单的名字
    playList: []
  },
  
  // -------------------- 生命周期 ----------------------
  
  onLoad() {
    // 1.判断用户是否登录
    const openid = wx.getStorageSync('openid')
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      isLogin: !!openid
    })
    if (this.data.isLogin) {
      this.setData({
        userInfo
      })
    }
    // 2.共享歌单数据
    playListStore.onState('playList', this.handlePlayList)
  },
  
  onUnload() {
    playListStore.offState('playList', this.handlePlayList)
  },

	// -------------------- 事件处理 ----------------------

  // 登录
  onUserInfoTap() {
    if (isLogin) return

    // 1. 获取用户的头像、昵称
    const p1 = wx.getUserProfile({
      desc: '获取您的头像、昵称',
    })

    // 2. 获取用户的 openid
    const p2 = wx.cloud.callFunction({
      name: 'music-login'
    })

    Promise.all([p1, p2]).then(res => {
      console.log('login res:', res);
      const userInfo = res[0].userInfo
      const openid = res[1].result.openid

      wx.setStorageSync('openid', openid)
      wx.setStorageSync('userInfo', userInfo)

      this.setData({
        isLogin: true,
        userInfo,
      })
    })
  },

  // 收藏、喜欢、历史记录点击
  onMyTabTap(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/detail-songs?type=profile&tabname=${item.type}&title=${item.name}`,
    })
  },

  // 创建歌单
  onPlusTap() {
    this.setData({ showDialog: true })
  },

  // 小程序中 input 组件进行双向绑定，会报一个警告，这是小程序内部的 bug，需要监听 input 事件，处理事件的函数可以什么都不做。
  onInputChange() {},

  onDialogConfirm() {
    const playListName = this.data.playListName
    const record = {
      name: playListName,
      songs: []
    }
    playListCollection.insert(record).then(() => {
      wx.showToast({
        title: '添加歌单成功',
      })
      playListStore.dispatch('fetchPlayListAction')
    })
  },

  handlePlayList(value) {
    this.setData({ playList: value  })
  }
})