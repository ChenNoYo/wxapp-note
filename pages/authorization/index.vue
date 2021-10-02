<template>
  <div class="authorization">
    <template v-if="auth">
      <img src="./logo.png"
           class="logo">
      <div class="tip">
        记下你的日常小片段
      </div>
      <button class="u-button large primary"
              hover-class="btn-hover"
              @tap="getUserProfile">微信授权登录</button>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 授权操作
      auth: false
    }
  },
  mounted () {
    wx.cloud.init()
  },
  onLoad (options) {
    this.options = options
    this.login()
    // this.test()
  },
  methods: {
    async login () {
      await this.$store.dispatch('login')
      this.auth = Boolean(this.options.auth)
      // 非授权操作直接进入首页
      if (!this.auth) {
        this.goIndex()
      }
    },
    // 微信授权
    getUserProfile (e) {
      e.preventDefault()
      e.stopPropagation()
      uni.getUserProfile({
        desc: '椿龄居家服务用户授权',
        success: (res) => {
          if (res.userInfo) {
            this.$store.commit('setWxUserInfo', res.userInfo)
            this.$api.registered(res.userInfo).then(res => {
              this.$store.commit('setUserInfo', res)
              this.goIndex()
            })
          }
        }
      })
    },
    goIndex () {
      let url = '/pages/home/index'
      if (this.$store.getters.redirect !== '') {
        url = this.$store.getters.redirect
        this.$store.commit('setRedirect', '')
      }
      uni.reLaunch({
        url
      })
    }
  }
}
</script>
<style lang="scss">
.authorization {
  padding-top: 100rpx;
  .logo {
    margin: 30rpx auto;
    width: 400rpx;
    height: 400rpx;
    display: block;
  }
  .tip {
    text-align: center;
    color: $font;
    margin-bottom: 30rpx;
  }
}
</style>