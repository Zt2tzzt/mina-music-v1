App({
	globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    deviceRadio: 0,
    navBarHeight: 44, // 给手机顶部导航栏默认高度 44 px，用于播放页，自定义导航栏
    contentHeight: 0, // 屏幕内容高度 = 视口高度 - 状态栏高度 - 导航栏高度；用于播放页
  },

	onLaunch() {
    // 获取屏幕的长宽
    const info = wx.getSystemInfoSync();
    // 获取手机屏幕宽度。
    this.globalData.screenWidth = info.screenWidth
    // 获取手机屏幕高度
    this.globalData.screenHeight = info.screenHeight
    // 获取手机状态栏高度
    this.globalData.statusBarHeight = info.statusBarHeight
    // 获取屏幕内容高度
    this.globalData.contentHeight =this.globalData.screenHeight - this.globalData.statusBarHeight - this.globalData.navBarHeight
    // 获取手机高度/宽度比例。
    this.globalData.deviceRadio = info.screenHeight / info.screenWidth

    // 启用云开发能力
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-8g4a3iira9235aea',
        traceUser: true,
      });
    }
  },
})
