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
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + this.properties.itemData.id,
      });
    }
  }
})
