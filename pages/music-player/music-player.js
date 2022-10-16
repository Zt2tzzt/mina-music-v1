import { getSongs, getSongLyric } from '../../services/modules/player'
import parseLyric from '../../utils/parse-lyric'
import throttle from '../../utils/throttle'

const app = getApp()
const audioContext = wx.createInnerAudioContext()

Page({

  data: {
    contentHeight: 500,  // swiper 的高度，默认 600
    tabs: ['歌曲', '歌词'],
    page: 0, // 当前页面（歌词：1/歌曲：0）

    id: 0, // 歌曲 id
    song: {}, // 歌曲
    lyric: '', // 一句歌词
    lyricIndex: -1, // 一句歌词的索引
    lyrics: [], // 所有歌词
    nowTime: 0, // 当前时间
    durationTime: 0, // 歌曲时长
    sliderProgress: 0, // 滑块进度

    showLyric: true, // 歌曲页，一句歌词，是否展示，根据设备比例该表
    isPlaying: true, // 是否正在播放
    
    playModeName: 'order', // 歌曲播放模式名称，用于控制操作栏图片
    btnPlayOrPauseName: 'pause', // 歌曲播放状态，用于控制操作栏图片

    lyricScrollTop: 0, // 歌词页竖向滚动条位置
  },

  isFirstPlay: true, // 是否第一次播放歌曲
  isWaiting: false, // 是否延迟为播放实例设值进度
  isSliderChanging: false, // 用户是否正在拖动滑块

	// -------------------- 生命周期 ----------------------

  onLoad(option) {
    // 获取设备信息
    const { contentHeight, deviceRadio } = app.globalData
    console.log('contentHeight', contentHeight, "deviceRadio", deviceRadio);
    this.setData({
      contentHeight,
      showLyric: deviceRadio > 2
    })

    // 获取传入的 id
    const id = option.id

    // 根据 id，播放歌曲
    this.playSong(id)
  },

  // -------------------- 事件处理 ----------------------
  
  // 处理顶部 tab 点击事件
  onTabTap(event) {
    this.setData({ page: event.currentTarget.dataset.index })
  },

  // 处理滑动页面（轮播图）事件
  onSwiperChange(event) {
    this.setData({ page: event.detail.current })
  },

  // 处理滑块点击事件
  onSliderChange(event) {
    // 等待 1.5s，audioContext.onUpdataTime 中再改变滑块的进度，和歌曲当前时间显示。避免滑块反复横跳的 bug
    this.isWaiting = true
    setTimeout(() => this.isWaiting = false, 1000)
    // 计算当前时间
    const sliderProgress = event.detail.value
    const nowTime = sliderProgress / 100 * this.data.durationTime 
    // 设值进度，时间显示
    audioContext.seek(nowTime / 1000)
    this.setData({
      nowTime,
      sliderProgress
    })
    // 改变拖动滑块的状态
    this.isSliderChanging = false
  },

  // 处理滑块拖动事件
  onSliderChanging: throttle(function(event) {
    // 计算当前时间
    const sliderProgress = event.detail.value
    const nowTime = sliderProgress / 100 * this.data.durationTime 
    // 设值时间显示
    this.setData({ nowTime })
    // 改变拖动滑块的状态
    this.isSliderChanging = true
  }, 100),

  // 处理播放/暂停按钮点击
  onPlayOrPauseBtnTap() {
    const isPlaying = !audioContext.paused
    let btnPlayOrPauseName = this.data.btnPlayOrPauseName
    if (isPlaying) {
      audioContext.pause()
      btnPlayOrPauseName = 'resume'
    } else {
      audioContext.play()
      btnPlayOrPauseName = 'pause'
    }
    this.setData({ isPlaying, btnPlayOrPauseName })
  },

  // 处理导航栏点击返回事件
  handleBackTap() {
    wx.navigateBack()
  },

	// -------------------- 自行封装 ----------------------

  // 播放歌曲
  playSong(id) {

    this.setData({ id })

    // 根据 id 获取歌曲的信息
    getSongs(id).then(res => {
      console.log('song info res:', res)
      this.setData({
        song: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })

    // 根据 id 获取歌词的信息
    getSongLyric(id).then(res => {
      console.log('song lyric res:', res);
      const lyrics = parseLyric(res.lrc.lyric)
      console.log('lyrics:', lyrics);
      this.setData({ lyrics })
    })

    // 播放歌曲
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    if (!this.isFirstPlay) return
    this.isFirstPlay = false

    const throttleUpdataSliderAndTime = throttle(this.updateSliderAntTime, 500, { leading: false })

    // 监听歌曲播放进度
    audioContext.onTimeUpdate(() => {
      // 更新歌曲进度
      if (!this.isSliderChanging && !this.isWaiting) throttleUpdataSliderAndTime()

      // 匹配正确的歌词
      const  lyrics = this.data.lyrics
      const lyricLength = lyrics.length
      if (lyricLength === 0) return
      let lyricIndex = lyrics.findIndex(item => item.time > audioContext.currentTime * 1000)
      lyricIndex = lyricIndex === -1 ? lyricLength - 1 : lyricIndex - 1

      // 拿到歌词对应的时间，文本
      if (lyricIndex === this.data.lyricIndex) return
      console.log('set lyric');
      const lyric = this.data.lyrics[lyricIndex].text
      this.setData({
        lyric,
        lyricIndex,
        lyricScrollTop: lyricIndex * 35
      })
    })

    audioContext.onWaiting(() => {
      audioContext.pause()
    })

    audioContext.onCanplay(() => {
      audioContext.play()
    })

  },

  // 改变滑块进度，和当前时间显示。
  updateSliderAntTime() {
    this.setData({
      nowTime: audioContext.currentTime * 1000,
      sliderProgress: this.data.nowTime / this.data.durationTime * 100
    })
  },

})