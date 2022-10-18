import ztRequest from "../request/index";

/**
 * @description: 此函数用于，发送网络请求，获取热门关键词
 * @Author: ZeT1an
 * @return {Promise} 返回一个 promise，用于处理结果
 */
export const getHotKey = () => ztRequest.get({
  url: '/search/hot'
})

/**
 * @description: 此函数用于，发送网络请求，获取搜索关键词联想
 * @Author: ZeT1an
 * @param {String} keywords 输入的关键字
 * @param {String} type 返回值适用于设备类型，如mobile
 * @return {Promise}  返回一个 promise，用于处理结果
 */
export const getSuggest = (keywords, type = 'mobile') => ztRequest.get({
  url: '/search/suggest',
  data: {
    keywords,
    type
  }
})

/**
 * @description: 此函数用于，发送网络请求，获取搜索关键词的结果
 * @Author: ZeT1an
 * @param {String} keywords 输入的关键字
 * @return {Promise} 返回一个 promise，用于处理结果
 */
export const getSearchResult = (keywords) => ztRequest.get({
  url:'/search',
  data: {
    keywords
  }
})