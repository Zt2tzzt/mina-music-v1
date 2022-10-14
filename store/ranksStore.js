import { HYEventStore } from 'hy-event-store'
import { getPlayListDetail } from '../services/modules/music'

// 榜单与请求 id 的映射对象
const rankMap = {
	new: 3779629, // 新歌榜
	original: 2884035, // 原创榜
	soaring: 19723756  // 飙升榜
}

export const ranksKey = Object.keys(rankMap)
export const ranks = ranksKey.reduce((accumulator, name) => {
  accumulator[name] = []
  return accumulator
}, {})

export default new HYEventStore({
	state: ranks,
	actions: {
		fetchRanksSongs(ctx) {
			ranksKey.forEach(key => {
				getPlayListDetail(rankMap[key]).then(res => {
					console.log('rank', key, 'res:', res)
					ctx[key] = res.playlist
				})
			})
		}
	}
})