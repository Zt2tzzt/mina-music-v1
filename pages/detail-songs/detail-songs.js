import ranksStore from '../../store/ranksStore';
import recommendStore from '../../store/recommendStore'
import playStore from '../../store/playStore'
import playListStore from '../../store/playListStore'
import { getPlayListDetail } from '../../services/modules/music'
import { db } from '../../database/index'

Page({
  data: {
    songs: [],
    playList: []
  },
  type: '', // 页面类型：rank: 榜单歌曲；recommend: 推荐歌曲；menu: 歌单。
  key: '', // 巅峰帮榜单的 key
  menuId: '', // menu 的 id

	// -------------------- 生命周期 ----------------------

  onLoad(options) {
    const { type } = options
    this.type = type

    switch (type) {
      case 'rank':
        this.key = options.key
        ranksStore.onState(this.key, this.handSongsListenner)
        break;
      case 'recommend':
        this.key = 'recommendSongs'
        recommendStore.onState(this.key, this.handSongsListenner)
        break;
      case 'menu':
        this.setData({ type: this.type })
        this.menuId = options.menuId
        this.fetchSongs()
        break;
      case 'profile':
        const tabname = options.tabname
        // 1. 动态获取集合
        const collection = db.collection(`c_${tabname}`)
        // 2. 获取数据打结果
        let promise = null
        switch (tabname) {
          case 'playList':
            const _id = options._id
            collection.doc(_id).get()
            .then(res => {
              this.setData({
                songs: {
                  name: res.data.name,
                  tracks: res.data.songs
                }
              })
            })
            break;
          default:
            const title = options.title
            collection.get()
            .then(res => {
              this.setData({
                songs: {
                  name: title,
                  tracks: res.data
                }
              })
            })
            break;
        }
        break;
    }
    playListStore.onState('playList', this.handlePlayList)
  },
  
  onUnload() {
    const type = this.type
    switch (type) {
      case 'rank':
        ranksStore.offState(this.key, this.handSongsListenner)
        break;
      case 'recommend':
        recommendStore.offState(this.key, this.handSongsListenner)
        break;
    }
    playListStore.offState('playList', this.handlePlayList)
  },

  // -------------------- 事件处理 ----------------------

  // 处理 store 中，歌曲列表数据的更改。
  handSongsListenner(value) {
    console.log('detai song onState:', value)
    this.setData({ songs: value })
    // 设值页面标题
    wx.setNavigationBarTitle({
      title: value.name
    });
  },

  // 处理歌曲 iten 点击事件
  onItemTap(event) {
    const index =  event.currentTarget.dataset.index
    playStore.setState('songs', this.data.songs.tracks)
    playStore.setState('songIndex', index)
  },

  handlePlayList(value) {
    this.setData({ playList: value })
  },

  // -------------------- 自行封装 ----------------------

  // 发送网络请求，获取歌单中的歌曲列表数据。
  async fetchSongs() {
    const res = await getPlayListDetail(this.menuId)
    console.log('fetchSongs res:', res)
    this.setData({
      songs: res.playlist
    })
  }

})