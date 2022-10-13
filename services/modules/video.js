import ztRequest from "../request/index";

/**
 * @description: 此函数用于，发送网络请求，请求视频数据
 * @Author: ZeT1an
 * @param {Number} limit 获取视频数量
 * @param {Number} offset 偏移数量，用于分页
 * @return {Promise} 返回一个 promise，用于处理请求结果
 */
export const getTopMv = (offset, limit = 20) => ztRequest.get({
	url: '/top/mv',
	data: {
		offset,
		limit
	}
})

/**
 * @description: 此函数用于，发送网络请求，请求视频 url
 * @Author: ZeT1an
 * @param {Number} mvid 视频 id
 * @return {Promise} 返回一个 promise，用于处理请求结果
 */
export const getMvUrl = id => ztRequest.get({
	url: '/mv/url',
	data: {
		id
	}
})

/**
 * @description: 此函数用于，获取 mv 的信息
 * @Author: ZeT1an
 * @param {Number} mvid 视频id
 * @return {Promise} 返回的请求
 */
 export const getMVInfo = mvid => ztRequest.get({
	url: '/mv/detail', 
	data: {
		mvid
	}
})

/**
 * @description: 此函数用于获取相关视频数据，用于视频详情页
 * @Author: ZeT1an
 * @param {Number} id 视频id
 * @return {Promise} 返回的请求
 */
export const getMvRelate = id => ztRequest.get({
	url: '/related/allvideo',
	data: {
		id
	}
})
