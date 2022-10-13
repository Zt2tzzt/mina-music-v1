/**
 * @description: 此函数用于：节流。
 * @Author: ZeT1an
 * @param {Function} fn 需要节流的函数。
 * @param {Number} interval 间隔时间（ms）
 * @param {Boolean} leading 是否最初执行一次
 * @param {Boolean} trailling 是否末尾执行一次
 * @return {Function} 节流的函数
 */
export default (fn, interval, { leading = true, trailling = false } = {}) => {
	let timer = null
	let lastTime = 0

	function _throttle(...args) {
		return new Promise(resolve => {
			const nowTime = (new Date).getTime()
			if (!leading && !lastTime) lastTime = nowTime
			const remainTime = interval - (nowTime - lastTime)
			if (remainTime <= 0) {
				if (timer) clearTimeout(timer)
				timer = null
				const res = fn.apply(this, args)
				resolve(res)
				lastTime = nowTime
				return
			}
			if (trailling && !timer) {
				timer = setTimeout(() => {
					const res = fn.apply(this, args)
					resolve(res)
					timer = null
					lastTime = leading ? (new Date).getTime() : 0
				}, remainTime);
			}
		})
	}

	_throttle.cancel = () => {
		if (timer) clearTimeout(timer)
		timer = null
		lastTime = 0
	}

	return _throttle
}
