import request from '@/utils/request'

// 查询商协会嘉宾列表
export function listBusinessGuest(query) {
  return request({
    url: '/guest/businessGuest/list',
    method: 'get',
    params: query
  })
}

// 查询商协会嘉宾详细
export function getBusinessGuest(id) {
  return request({
    url: '/guest/businessGuest/' + id,
    method: 'get'
  })
}

// 新增商协会嘉宾
export function addBusinessGuest(data) {
  return request({
    url: '/guest/businessGuest',
    method: 'post',
    data: data
  })
}

// 修改商协会嘉宾
export function updateBusinessGuest(data) {
  return request({
    url: '/guest/businessGuest',
    method: 'put',
    data: data
  })
}

// 删除商协会嘉宾
export function delBusinessGuest(id) {
  return request({
    url: '/guest/businessGuest/' + id,
    method: 'delete'
  })
}
