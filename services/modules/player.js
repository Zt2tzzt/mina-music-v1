import ztRequest from "../request/index";

/**
 * @description: 此函数用于：发送网络请求，获取歌曲信息
 * @Author: ZeT1an
 * @param {Number/Number[]} ids 歌曲的 id，可传多个
 * @return {Promise} 返回一个 promise 用于处理请求结果。
 */
export const getSongs = ids => ztRequest.get({
	url: '/song/detail',
	data: {
		ids
	}
})

/**
 * @description: 此函数用于：发送网络请求，获取歌词信息
 * @Author: ZeT1an
 * @param {Number} ids 歌曲的 id
 * @return {Promise} 返回一个 promise 用于处理请求结果。
 */
export const getSongLyric = id => ztRequest.get({
  url: '/lyric',
  data: {
    id
  }
})