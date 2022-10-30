import playerStore from '../../store/playStore'

Component({

  /**
   * 组件的初始数据
   */
  data: {
    playAnimState: 'paused', // 是否有动画
    song: {}, // 正在播放的歌曲
    isPlaying: false // 是否正在播放
  },

  lifetimes: {
    attached: function () {
      // 播放器监听
      playerStore.onStates(['isPlaying', 'song'], this.handleMusicListener.bind(this))
    },
    detached: function () {
      playerStore.offStates(['isPlaying', 'song'], this.handleMusicListener.bind(this))
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    obarTap() {
      // 页面跳转
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + this.data.song.id
      })
    },

    onPlayOrPauseBtnTap() {
      playerStore.dispatch('playOrPauseChangeAction')
    },

    handleMusicListener({ isPlaying, song }) {
      if (song) this.setData({ song })
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playAnimState: isPlaying ? 'running' : 'paused'
        })
      }
    },
  }
})
