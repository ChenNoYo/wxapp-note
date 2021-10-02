import { mapGetters } from "vuex"

// 通用
export const common = {
  data: () => {
    return {
      option: {},
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isIphoneX', 'tabberHeight'])
  },
  onLoad (options) {
    this.options = options
  },
  onShow () {
    this.init && this.init()
  },
  methods: {
    // 判断是否有登录权限
    checkAuth (callback) {
      if (this.userInfo._id) { // 已经登录
        callback()
      } else {
        let pages = getCurrentPages()
        let page = pages[pages.length - 1]
        let path = page.$page.fullPath
        this.$store.commit('setRedirect', path) //保存授权后需要重定向的地址
        this.$go('authorization/index?auth=true')
      }
    }
  }
}

// 分页列表
export const getData = {
  data () {
    return {
      dataList: [],
      pageNum: 1,
      pageSize: 10,
      more: 'loading',
      contentText: {
        contentdown: "上滑显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多了"
      },
      canReload: true
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.loadData(true)
  },
  onShow () {
    this.loadData(true)
  },
  //上拉加载
  onReachBottom: function () {
    this.pageNum++
    this.loadData(false)
  },
  methods: {
    async loadData (init) {
      if (init) {
        this.pageNum = 1
        this.more = 'more'
      }
      if (this.more == 'nomore') {
        return
      }
      this.more = 'loading'
      let list = await this.getData({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      if (init) {
        this.dataList = []
      }
      this.dataList.push(...list)
      if (list.length && list.length >= this.pageSize) {
        this.more = 'more'
      } else {
        this.more = 'nomore'
      }
      this.$nextTick(() => {
        uni.stopPullDownRefresh()
      })
    },
  }
}

// 表单通用
export const form = {
  data: () => {
    return {
      formData: {},
      loading: false
    }
  },
  onReady () {
    this.$nextTick(() => {
      this.$refs.form.setRules(this.rules)
    });
  },
  methods: {
    submitForm (form) {
      // 手动提交表单
      this.$refs.form.submit().then(res => {
        let formData = JSON.parse(JSON.stringify(this.formData))
        this.loading = true
        this.submit(formData)
      }).catch(err => {
        console.log('表单错误信息：', err);
      })
    }
  },
}

//  支付
export const pay = {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    // 调起支付
    pay (info, callback) {
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: info.timeStamp,        //时间戳，自1970年以来的秒数     
        nonceStr: info.nonceStr,         //随机串     
        package: info.package,
        signType: info.signType,         //微信签名方式：     
        paySign: info.paySign,           //微信签名
        success: function (res) {
          console.log('success:' + JSON.stringify(res));
          callback(true)
        },
        fail: function (err) {
          console.log('fail:' + JSON.stringify(err))
          callback(false)
        }
      })
    }
  },
}

// swiper
export const swiper = {
  data () {
    return {
      current: 0,
      dotsStyles: {
        width: 7,
        height: 7,
        bottom: 0,
        backgroundColor: '#DFDFDF',
        border: 'none',
        selectedBackgroundColor: '#2F9969',
        selectedBorder: 'none'
      },
    }
  },
  methods: {
    swiperChange (e) {
      this.current = e.detail.current
    }
  },
}