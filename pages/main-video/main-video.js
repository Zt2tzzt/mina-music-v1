import { getTopMv } from '../../services/modules/video'

Page({
	data: {
		videoList: [],
	},

  hasMore: true, // 记录是否还能请求更多数据

	// -------------------- 生命周期 ----------------------

	onLoad() {
    this.fetchTopMv()
  },

	// -------------------- 原生事件 ----------------------

  onReachBottom() {
    this.fetchTopMv()
  },

  onPullDownRefresh() {
    // 1.清空之前的数据
    this.setData({ videoList: [] })
    this.hasMore = true

    // 2.请求新数据
    this.fetchTopMv().then(_ => {
      // 3.停止刷新动画
      wx.stopPullDownRefresh()
    })
  },

	// -------------------- 自行封装 ----------------------

  // 发送网络请求，请求视频数据。
	async fetchTopMv() {
    
    // 0。如果没有更多数据，则直接返回
    if (!this.hasMore) return

    // 1.获取视频数据
		const res = await getTopMv(this.data.videoList.length)

    // 2.将视频数据添加到 videoList
		this.setData({
			videoList: this.data.videoList.concat(res.data)
		})
    this.hasMore = res.hasMore
	}
})
