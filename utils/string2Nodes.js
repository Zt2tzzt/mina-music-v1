/**
 * @description: 此函数用于：将关键字，转成富文本节点。
 * @Author: ZeT1an
 * @param {String} keywords 服务器返回的关键字
 * @param {String} value 搜索的文本
 * @return {Object} 富文本节点
 */
export default (keyword, value) => keyword.toUpperCase().startsWith(value.toUpperCase())
  ? [{
      name: 'span',
      attrs: { style: 'color: #26ce8a; font-size: 14px;' },
      children: [{ type: 'text', text: keyword.slice(0, value.length) }]
    }, {
      name: 'span',
      attrs: { style: 'color: #000000; font-size: 14px;' },
      children: [{ type: 'text', text: keyword.slice(value.length) }]
    }]
  : [{
      name: 'span',
      attrs: { style: 'color: #00000; font-size: 14px;' },
      children: [{ type: 'text', text: keyword }]
    }]