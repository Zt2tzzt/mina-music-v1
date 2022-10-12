Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {

    // video-item 点击，跳转详情页
    onItemTap() {
      wx.navigateTo({
        url: '/pages/detail-video/detail-video?id=' + this.properties.itemData.id
      })
    }
  }

})
