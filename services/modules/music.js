import ztRequest from "../request/index";

/**
 * @description: 此函数用于，获取轮播图数据（type=2，数用于iphone），用于音乐首页。
 * @Author: ZeT1an
 * @param {*}
 * @return {Promise} 返回封装的请求。
 */
 export const getBanners = () => ztRequest.get({
	url: '/banner',
	data: {
		type: 2
	}
 })

/**
 * @description: 此函数用于，获取歌单详情信息。
 * @Author: ZeT1an
 * @param {String} id 歌单的Id。
 * @return {Promise} 返回封装的请求。
 */
 export const getPlayListDetail = id => ztRequest.get({
	url: '/playlist/detail',
	data: {
		id
	}
 })

/**
 * @description: 此函数用于获取，歌单数据。
 * @Author: ZeT1an
 * @param {String} cat 目录类型，比如 "华语"、"古风"、"欧美"、"流行",默认为"全部"。
 * @param {Number} limit 取出歌单数量，默认为6。
 * @param {Number} offset 偏移数量，用于分页。
 * @return {Promise} 
 */
 export const getMenu = (cat = "全部", limit = 6, offset = 0) => ztRequest.get({
	url: '/top/playlist',
	data: {
		cat,
		limit,
		offset
	}
})

