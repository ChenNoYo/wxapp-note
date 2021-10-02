import * as tools from './tools'
export default {
  install: (Vue) => {
    // 跳转
    Vue.prototype.$go = (url, isPackage = false, success = new Function()) => {
      if (isPackage) {
        url = `/packages/${url}`
      } else {
        url = `/pages/${url}`
      }
      uni.navigateTo({ url, success })
    }
    // 重定向
    Vue.prototype.$re = (url, success = new Function()) => {
      uni.redirectTo({ url: `/pages/${url}`, success })
    }
    // 返回
    Vue.prototype.$back = (delta = 1, success = new Function()) => {
      uni.navigateBack({ delta, success })
    }
    Vue.prototype.$tools = tools
  }
}