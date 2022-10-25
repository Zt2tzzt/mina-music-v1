// components/menu-item-v2/menu-item-v2.js
import { playListCollection } from "../../database/index"
import playListStore from "../../store/playListStore"

Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  methods: {
    async onDeleteTap() {
      // 1.获取点击歌单的_id
      const _id = this.properties.itemData._id

      // 2.删除数据
      const res = await playListCollection.remove(_id)

      if (res) {
        wx.showToast({ title: "删除歌单成功~" })
        playListStore.dispatch("fetchPlayListAction")
      }
    }
  }
})
