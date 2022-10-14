import { HYEventStore } from 'hy-event-store'
import { getPlayListDetail } from '../services/modules/music'

export default new HYEventStore({
	state: {
		recommendSongs: {}
	},
	actions: {
		// 发送网络请求，获取推荐歌曲列表
		async fetchRecommendSongsAction(ctx) {
			const res = await getPlayListDetail(3778678)
			// ctx.recommendSongs = res.playlist.tracks
			ctx.recommendSongs = res.playlist
		}
	}
})