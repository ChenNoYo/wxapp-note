<script>

export default {
  onLaunch: function () {
    // 更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    this.getSystemInf()
    wx.cloud.init()
    setTimeout(() => {
      if (!this.$store.getters.userInfo._id) {
        this.$store.dispatch('login')
      }
    }, 2000)
  },
  onShow: function (option) {
    // console.log('App Show，app展现在前台')
  },
  onLoad: function () {
    // console.log('App Load，app展现在前台')
  },
  onHide: function (option) {
    // console.log('App Hide，app不再展现在前台')
  },
  methods: {
    getSystemInf () {
      uni.getSystemInfo({
        success: res => {
          let modelmes = res.model;
          let iphoneArr = ['iPhone X', 'iPhone XS', 'iPhone 11', 'iPhone XR', 'iPhone 11 Pro Max', 'iPhone 12 Mini',
            'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max', "iPhone X (GSM+CDMA)<iPhone10,3>"
          ]
          uni.setStorageSync('isIphoneX', false)
          iphoneArr.forEach(function (item) {
            if (modelmes.indexOf(item) != -1) {
              uni.setStorageSync('isIphoneX', true)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/iconfont.less';
@import './common/common.less';
@import 'uview-ui/index.scss';
</style>
