import { db, favorCollection, likeCollection, playListCollection } from '../../database/index'
import playListStore from '../../store/playListStore'

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
    playList: {
      type: Array,
      value: []
    }
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
          this.handleOperationResult(res.tapIndex)
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
          const playListNames = this.properties.playList.map(item => item.name)
          wx.showActionSheet({
            itemList: playListNames,
            success: res => {
              this.handlePlayListIndex(res.tapIndex)
            }
          })
          return
      }
      promise.then(() => {
        const title = index === 0 ? '收藏' : '喜欢'
        wx.showToast({
          title: `${title}成功`
        })
      })
    },

    handlePlayListIndex(index) {
      // 1.获取要添加的歌单
      const playListItem = this.properties.playList[index]
      // 2.向 playListItem 歌单中 songs 中添加一条数据。
      const data = this.properties.itemData
      const cmd = db.command
      playListCollection.update(playListItem._id, { songs: cmd.push(data) })
      .then(() => {
        wx.showToast({
          title: '添加成功',
        })
        // 进行数据回显
        playListStore.dispatch('fetchPlayListAction')
      })
    }
  }
})
