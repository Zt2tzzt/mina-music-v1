import { BASE_URL } from './config'

/**
 * @description: 此类用于：创建发送网络请求的实例。
 * @Author: ZeT1an
 */
class ZtRequest {
	constructor(baseURL) {
		this.baseURL = baseURL
	}

	request(options) {
		const { url } = options
		return new Promise(resolve => {
			wx.request({
				...options,
				url: this.baseURL + url,
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					console.log('err:', err)
				}
			})
		})
	}

	get(options) {
		return this.request({ ...options, method: 'get' })
	}

	post(options) {
		return this.request({ ...options, method: 'post' })
	}
}

export default new ZtRequest(BASE_URL)
