import request from './request.js';
//请求方法
export default {
  // 登录 获取用户信息
  login (data) {
    return request('user', 'login', data)
  },
  // 注册 保存用户信息
  registered (data) {
    return request('user', 'registered', data)
  }
}