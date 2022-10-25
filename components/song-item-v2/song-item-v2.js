import { favorCollection, likeCollection } from '../../database/index'

Component({
  
  properties: {
    serial: {
      type: Number,
      value: 0
    },
    itemData: {
      type: Object,
      value: {}
    },
  },

  methods: {
    onItemTap() {
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + this.properties.itemData.id
      })
    },

    onMoreBtnTap() {
      // 淡出 actionsheet
      wx.showActionSheet({
        itemList: ['收藏', '喜欢', '添加到歌单'],
        success: res => {
          this.handleOperationResult( res.tapIndex)
        }
      })
    },

    handleOperationResult(index) {
      let promise = null
      switch (index) {
        case 0:  // 收藏
          promise = favorCollection.insert(this.properties.itemData)
          break;
        case 1: // 喜欢
          promise = likeCollection.insert(this.properties.itemData)
          break;
        case 2: // 添加歌单
          // this.properties.menulist.map(item => item.name)
        default:
          break;
      }
      promise.then(() => {
        const title = index === 0 ? '收藏'
          : index === 1 ? '喜欢'
          : '添加'
        wx.showToast({
          title: `${title}成功`
        })
      })
    }
  }
})
