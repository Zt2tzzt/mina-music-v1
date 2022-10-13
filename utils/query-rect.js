/**
 * @description: 此函数用于：获取组件的实际高度
 * @Author: ZeT1an
 * @param {String} 组件的选择器
 */
export default selector => new Promise(resolve => {
	const query = wx.createSelectorQuery()
	query.select(selector).boundingClientRect()
	query.exec(resolve)
})
