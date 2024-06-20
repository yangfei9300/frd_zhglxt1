import request from '@/utils/request'

// 查询市场数据审核列表
export function listUser_market_data_examine(query) {
  return request({
    url: '/user/user_market_data_examine/list',
    method: 'get',
    params: query
  })
}

// 查询市场数据审核详细
export function getUser_market_data_examine(id) {
  return request({
    url: '/user/user_market_data_examine/' + id,
    method: 'get'
  })
}

// 新增市场数据审核
export function addUser_market_data_examine(data) {
  return request({
    url: '/user/user_market_data_examine',
    method: 'post',
    data: data
  })
}
//获取需要审核的数据
export function user_market_data_examinelist(query) {
  return request({
    url: '/user/user_market_data_examine/list',
   method: 'get',
   params: query
  })
}

// 修改市场数据审核
export function updateUser_market_data_examine(data) {
  return request({
    url: '/user/user_market_data_examine',
    method: 'put',
    data: data
  })
}

// 删除市场数据审核
export function delUser_market_data_examine(id) {
  return request({
    url: '/user/user_market_data_examine/' + id,
    method: 'delete'
  })
}
