import request from './request.js';
//请求方法
export default {
  // 上传
  upload (data) {
    return request('common', 'upload', data)
  },
}