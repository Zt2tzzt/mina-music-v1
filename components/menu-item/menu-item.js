/*
 * @Description: file contenttem
 * @Author: ZeT1an
 * @Date: 2022-01-04 15:59:04
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-10-14 20:59:24
 * @LastEditContent: 
 */
Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onItemTap() {
      wx.navigateTo({
        url: '/pages/detail-song/detail-song?type=menu&menuId=' + this.properties.itemData.id
      })
    }
  }

})
