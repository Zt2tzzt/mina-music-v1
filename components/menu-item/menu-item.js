/*
 * @Description: file contenttem
 * @Author: ZeT1an
 * @Date: 2022-01-04 15:59:04
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-10-16 12:07:43
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
        url: '/pages/detail-songs/detail-songs?type=menu&menuId=' + this.properties.itemData.id
      })
    }
  }

})
