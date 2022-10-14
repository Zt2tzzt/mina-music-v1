// import { playerStore } from '../../store/index'
Component({
  
  properties: {
    index: {
      type: Number,
      value: 0
    },
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    /* handleSongItemClick() {
      const id = this.properties.item.id
      // 页面跳转
      wx.navigateTo({
        url: '/packagePlayer/pages/music-player/index?id=' + id
      })
      // 对歌曲的数据请求和其它操作
      playerStore.dispatch("playMusicWithSongIdAction", { id })
    } */
  }
})
