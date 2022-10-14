const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },
    songMenu: {
      type: Array,
      value: []
    }
  },

  data: {
    screenWidth: 375
  },

  lifetimes: {
    attached() {
      // 设值屏幕的宽度
      this.setData({
        screenWidth: app.globalData.screenWidth
      })
    },
  },

  methods: {
    // 处理歌单标题右测“更多”点击事件
    async handleMoreMenuTap() {
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu'
      })
    },

    // 处理歌单 item 点击事件
    onItemTap() {
      const { item } = event.currentTarget.dataset
      wx.navigateTo({
        url: `/packageDetail/pages/detail-songs/index?id=${item.id}&type=menu`
      })
    }
  }
})
