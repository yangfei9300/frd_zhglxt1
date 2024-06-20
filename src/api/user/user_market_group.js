import request from '@/utils/request'

// 查询市场部人员分组列表
export function listUser_market_group(query) {
  return request({
    url: '/user/user_market_group/list',
    method: 'get',
    params: query
  })
}

// 查询市场部人员分组详细
export function getUser_market_group(id) {
  return request({
    url: '/user/user_market_group/' + id,
    method: 'get'
  })
}

// 新增市场部人员分组
export function addUser_market_group(data) {
  return request({
    url: '/user/user_market_group',
    method: 'post',
    data: data
  })
}

// 修改市场部人员分组
export function updateUser_market_group(data) {
  return request({
    url: '/user/user_market_group',
    method: 'put',
    data: data
  })
}

// 删除市场部人员分组
export function delUser_market_group(id) {
  return request({
    url: '/user/user_market_group/' + id,
    method: 'delete'
  })
}
