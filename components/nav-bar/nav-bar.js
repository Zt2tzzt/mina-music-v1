const app = getApp()

Component({
  options: {
    multipleSlots: true, // 开启使用多个插槽的功能
  },
  properties: {
    title: {
      type: String,
      value: '默认标题'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
  },

  methods: {
    onBackTap() {
      this.triggerEvent('BackTap')
    },
  },

  lifetimes: {
    attached() {
      const { statusBarHeight, navBarHeight } = app.globalData
      this.setData({
        statusBarHeight,
        navBarHeight,
      })
    }
  },
})
