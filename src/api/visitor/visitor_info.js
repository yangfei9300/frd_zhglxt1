import request from '@/utils/request'

// 查询观众信息列表
export function listVisitor_info(query) {
  return request({
    url: '/visitor/visitor_info/list',
    method: 'get',
    params: query
  })
}

// 查询观众信息详细
export function getVisitor_info(id) {
  return request({
    url: '/visitor/visitor_info/' + id,
    method: 'get'
  })
}

// 新增观众信息
export function addVisitor_info(data) {
  return request({
    url: '/visitor/visitor_info',
    method: 'post',
    data: data
  })
}

// 导入观众信息
export function visitor_infoimport(data) {
  return request({
    url: '/visitor/visitor_info/import',
    method: 'post',
    data: data
  })
}


// 历史几路
export function visitor_exhhistory(data) {
  return request({
    url: '/visitor/visitor_exh/list/history',
    method: 'post',
    data: data
  })
}
// 提交新数据
export function user_market_data_examinesubmit(data) {
  return request({
    url: '/user/user_market_data_examine/submit',
    method: 'post',
    data: data
  })
}
// 判断数据是否可修改
export function user_market_data_examinecheck(data) {
  return request({
    url: '/user/user_market_data_examine/check',
    method: 'post',
    data: data
  })
}
// 获取审核人员数据
export function allocatedList(query) {
  return request({
    url: '/system/role/authUser/allocatedList/market',
     method: 'get',
     params: query
  })
}


// 修改观众信息
export function updateVisitor_info(data) {
  return request({
    url: '/visitor/visitor_info',
    method: 'put',
    data: data
  })
}

// 删除观众信息
export function delVisitor_info(id) {
  return request({
    url: '/visitor/visitor_info/' + id,
    method: 'delete'
  })
}
