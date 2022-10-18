/**
 * @description: 此函数用于：防抖。
 * @Author: ZeT1an
 * @param {Function} fn 需要防抖的函数。
 * @param {Number} delay 推迟时间（ms）
 * @param {Boolean} immediate 是否立即执行一次
 * @param {Boolean} trailling 是否末尾执行一次
 * @return {Function} 防抖的函数
 */
export default (fn, delay, immediate = false) =>  {
  let timer = null
  let isInvoke = false
  
  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      try {
        if (timer) clearTimeout(timer)
        if (immediate && !isInvoke) {
          const res = fn.apply(this, args)
          resolve(res)
          isInvoke = true
          return
        }
        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          resolve(res)
          timer = null
          isInvoke = false
        }, delay);
      } catch (error) {
        reject(error)
      }
    })
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }
  return _debounce
}