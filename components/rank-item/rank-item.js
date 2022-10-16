Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: 'new'
    }

  },

  methods: {

    // 处理 rank item 点击事件
    onItemTap() {
      wx.navigateTo({
        url: '/pages/detail-songs/detail-songs?type=rank&key='+ this.properties.key
      })
    }
  }

})
