import { HYEventStore } from 'hy-event-store'
import { playListCollection } from '../database/index'

const playListStore = new HYEventStore({
  state: {
    playList: []
  },
  actions: {
    fetchPlayListAction(ctx) {
      // 获取歌单数据
      playListCollection.query().then(res => {
        ctx.playList = res.data
      })
    }
  }
})
playListStore.dispatch('fetchPlayListAction')
export default playListStore