import { getMenu, getMenuTitle } from "../../services/modules/music";

Page({

  data: {
    menus: []
  },
  
  // -------------------- 生命周期 ----------------------

  onLoad() {

    // 发送网络请求，请求歌单数据
    this.fetchAllMenu()
  },

  // -------------------- 自行封装 ----------------------

  async fetchAllMenu() {
    const res = await getMenuTitle()
    console.log('menu title res:', res)
    const menus = await Promise.all(res.tags.map(tag => getMenu(tag.name)))
    console.log('menus res', menus)
    this.setData({ menus })
  }

})