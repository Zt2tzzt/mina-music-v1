import playStore, { audioContext } from '../../store/playStore'
import throttle from '../../utils/throttle'

const app = getApp()
const modeNames = ['order', 'repeat', 'random']
const stateKeys = ['id', 'song', 'songs', 'songIndex', 'lyric', 'lyricIndex', 'lyrics', 'nowTime', 'durationTime', 'isPlaying', 'modeIndex']

Page({

  data: {
    contentHeight: 500,  // swiper 的高度，默认 600
    tabs: ['歌曲', '歌词'],
    page: 0, // 当前页面（歌词：1/歌曲：0）

    id: 0, // 歌曲 id
    song: {}, // 歌曲
    songIndex: 0, // 歌曲索引
    songs: [], // 歌曲列表
    lyric: '', // 一句歌词
    lyricIndex: -1, // 一句歌词的索引
    lyrics: [], // 所有歌词
    nowTime: 0, // 当前时间
    durationTime: 0, // 歌曲时长
    sliderProgress: 0, // 滑块进度

    showLyric: true, // 歌曲页，一句歌词，是否展示，根据设备比例该表
    isPlaying: true, // 是否正在播放
    
    modeName: 'order', // 歌曲播放模式名称，用于控制操作栏图片
    btnPlayOrPauseName: 'pause', // 歌曲播放状态，用于控制操作栏图片

    lyricScrollTop: 0, // 歌词页竖向滚动条位置
  },

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

    // 播放歌曲
    const id = option.id
    if (id) playStore.dispatch('playSongAction', id)

    // 数据状态监听
    playStore.onStates(stateKeys, this.handleStatesListenner)
  },

  onUnload() {
    playStore.offStates(stateKeys, this.handleStatesListenner)
  },

  // -------------------- 事件处理 ----------------------

  // 处理导航栏点击返回事件
  handleBackTap() {
    wx.navigateBack()
  },

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
    playStore.dispatch('playOrPauseChangeAction')
  },

  // 处理播放前一首按钮点击
  onPreBtnTap() {
    playStore.dispatch('playNewSongAction', false)
  },

  // 处理播放下一首按钮点击
  onNextBtnTap() {
    playStore.dispatch('playNewSongAction')
  },

  // 处理播放模式按钮点击。
  onModeBtnTap() {
    playStore.dispatch('modeChangeAction')
  },

  handleStatesListenner({
    id,
    song,
    songIndex,
    songs,
    lyric,
    lyricIndex,
    lyrics,
    nowTime,
    durationTime,
    isPlaying,
    modeIndex
  }) {
    console.log('nowTime', nowTime);
    console.log('durationTime', durationTime);
    if (id !== undefined) this.setData({ id })
    if (song) this.setData({ song })
    if (songIndex !== undefined) this.setData({ songIndex })
    if (songs) this.setData({ songs })
    if (lyric) this.setData({ lyric })
    if (lyricIndex !== undefined) this.setData({ lyricIndex, lyricScrollTop: lyricIndex * 35 })
    if (lyrics) this.setData({ lyrics })
    if (nowTime) this.updateSliderAndNowtime(nowTime, durationTime)
    if (durationTime) this.setData({ durationTime }); this.updateSliderAndNowtime(nowTime, durationTime)
    if (isPlaying !== undefined) this.setData({ isPlaying })
    if (modeIndex !== undefined) this.setData({ modeName: modeNames[modeIndex] })
  },

	// -------------------- 自行封装 ----------------------

  // 改变滑块进度，和当前时间显示。
  updateSliderAndNowtime: throttle(function(nowTime, durationTime) {
    if (this.isSliderChanging) return
    this.setData({
      nowTime,
      sliderProgress: (nowTime ||= this.data.nowTime) / (durationTime ||= this.data.durationTime) * 100
    })
  }, 800, { leading: false })

  /* updateSliderAndNowtime(nowTime, durationTime) {
    if (this.isSliderChanging) return
    this.setData({
      nowTime,
      sliderProgress: (nowTime ||= this.data.nowTime) / (durationTime ||= this.data.durationTime) * 100
    })
  } */

})