import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 微信用户信息
    wxUserInfo: {},
    // 用户信息
    userInfo: {},
    // 重定向地址
    redirect: '',
    isIphoneX: uni.getStorageSync('isIphoneX'),
    tabberHeight: uni.getStorageSync('isIphoneX') ? '200rpx' : '140rpx',
  },
  mutations: {
    // 保存微信授权信息
    setWxUserInfo (state, wxUserInfo) {
      state.wxUserInfo = wxUserInfo
      console.log('wxUserInfo: ', wxUserInfo)
    },
    // 保存用户信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      console.log('userInfo: ', userInfo);
    },
    // 重定向的页面
    setRedirect (state, redirect) {
      state.redirect = redirect
    },
  },
  getters: {
    userInfo (state) {
      return state.userInfo
    },
    wxUserInfo (state) {
      return state.wxUserInfo
    },
    redirect (state) {
      return state.redirect
    },
    isIphoneX (state) {
      return state.isIphoneX
    },
    tabberHeight (state) {
      return state.tabberHeight
    }
  },
  actions: {
    // 微信登录 
    async login ({ commit, state }, phone = '') {
      return new Promise(async (resolve, reject) => {
        try {
          // 获取用户信息
          let userInfo = await api.login()
          commit('setUserInfo', userInfo)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  }
})

export default store
