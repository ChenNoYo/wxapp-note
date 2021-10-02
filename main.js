
import Vue from 'vue'
import App from './App'
import api from './api'
import store from './store'
import initComFun from './utils/comFun'
import baseTabbar from './components/baseTabbar.vue'
import uView from 'uview-ui'

Vue.component('base-tabbar', baseTabbar)

Vue.use(uView)
Vue.use(initComFun)

Vue.prototype.$api = api
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()