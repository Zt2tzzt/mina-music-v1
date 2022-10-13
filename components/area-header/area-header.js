/*
 * @Description: file content
 * @Author: ZeT1an
 * @Date: 2022-01-02 19:36:29
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-10-13 15:36:18
 * @LastEditContent: 
 */
Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    rightText: {
      type: String,
      value: '更多'
    },
    showRight: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onRightTap() {
      this.triggerEvent('RightTap')
    },
  }
})
