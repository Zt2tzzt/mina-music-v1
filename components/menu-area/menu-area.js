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
    handleMenuItemClick(event) {
      const { item } = event.currentTarget.dataset
      wx.navigateTo({
        url: `/packageDetail/pages/detail-songs/index?id=${item.id}&type=menu`
      })
    }
  }
})
