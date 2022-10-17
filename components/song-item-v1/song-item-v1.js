// import { playerStore } from '../../store/index'
Component({
  
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onItemTap() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + id,
      });
    }
  }
})
