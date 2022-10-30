import { playListCollection } from "../../database/index"
import playListStore from "../../store/playListStore"

Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
  },

  methods: {
    onPlayListItemTap() {
      wx.navigateTo({
        url: `/pages/detail-songs/detail-songs?type=profile&tabname=playList&_id=${this.properties.itemData._id}`,
      })
    },

    onDeleteTap() {
      // 1.获取点击歌单的_id
      const _id = this.properties.itemData._id

      // 2.删除数据
      playListCollection.delete(_id).then(() => {
        wx.showToast({ title: "删除歌单成功~" })
        playListStore.dispatch("fetchPlayListAction")
      })
    }
  }
})
