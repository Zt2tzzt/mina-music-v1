import recommendStore from '../../store/recommendStore'

Page({
  data: {
    songs: []
  },

	// -------------------- 生命周期 ----------------------

  onLoad() {
    recommendStore.onState('recommendSongs', this.handSongs)
  },

  onUnload() {
    recommendStore.offState('recommendSongs', this.handSongs)
  },

  // -------------------- 事件处理 ----------------------

  handSongs(value) {
    this.setData({
      songs: value
    })
  }

})