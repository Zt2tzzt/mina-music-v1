const re = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

/**
 * @description: 此函数用于：解析服务器返回的歌词文本
 * @Author: ZeT1an
 * @return {String} 解析后的歌词
 */
export default lyricText => lyricText.split('\n').map(text => {
    const res = re.exec(text)
    if (!res) return
    const min = res[1] * 60 * 1000 // 分钟转毫秒
    const sec = res[2] * 1000 // 秒钟转毫秒
    let mil = res[3] // 毫秒
    mil = mil.length === 2 ? mil * 10 : mil * 1
    return {
      time: min + sec + mil,
      text: text.replace(re, '')
    }
  })
  .filter(item => item !== undefined)
  .sort((i1, i2) => i1.time - i2.time)