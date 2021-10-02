import request from './request.js';
//请求方法
export default {
  // 新增
  addNote (data) {
    return request('note', 'add', data)
  },
  // 数量
  count (data) {
    return request('note', 'count', data)
  },
  // 分页
  page (data) {
    return request('note', 'page', data)
  }
}