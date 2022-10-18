Component({
  
  properties: {
    serial: {
      type: Number,
      value: 0
    },
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onItemTap() {
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + this.properties.itemData.id
      })
    }
  }
})
