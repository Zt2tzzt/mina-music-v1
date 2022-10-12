import { getMvUrl, getMVInfo, getMvRelate } from '../../services/modules/video'

Page({
	data: {
		id: 0,
		mvUrl: '',
		danmuList: [
			{ text: '哈哈哈, 真好听', color: '#ff0000', time: 3 },
			{ text: '呵呵呵, 不错哦', color: '#ffff00', time: 10 },
			{ text: '嘿嘿嘿, 好喜欢', color: '#0000ff', time: 15 }
		],
    mvInfo: {},
    relativeMvs: []
	},

	// -------------------- 生命周期 ----------------------

	onLoad(options) {
		// 1.获取 id
		const id = options.id
		this.setData({ id })

		// 2.请求数据
		this.fetchMvUrl()
    this.fetchMVInfo()
    this.fetchMvRelate()
	},

	// -------------------- 自行封装 ----------------------

	async fetchMvUrl() {
		const res = await getMvUrl(this.data.id)
		console.log('mv url res', res)
		this.setData({ mvUrl: res.data.url })
	},

  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    console.log('mv info res', res)
    this.setData({ mvInfo: res.data})
  },
  async fetchMvRelate() {
    const res = await getMvRelate(this.data.id)
    console.log('mv relative res', res)
    this.setData({ relativeMvs: res.data})
  },

})
