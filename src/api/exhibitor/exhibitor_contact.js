import request from '@/utils/request'

// 查询展商联系人列表
export function listExhibitor_contact(query) {
  return request({
    url: '/exhibitor/exhibitor_contact/list',
    method: 'get',
    params: query
  })
}

// 查询展商联系人详细
export function getExhibitor_contact(id) {
  return request({
    url: '/exhibitor/exhibitor_contact/' + id,
    method: 'get'
  })
}

// 新增展商联系人
export function addExhibitor_contact(data) {
  return request({
    url: '/exhibitor/exhibitor_contact',
    method: 'post',
    data: data
  })
}

// 修改展商联系人
export function updateExhibitor_contact(data) {
  return request({
    url: '/exhibitor/exhibitor_contact',
    method: 'put',
    data: data
  })
}

// 删除展商联系人
export function delExhibitor_contact(id) {
  return request({
    url: '/exhibitor/exhibitor_contact/' + id,
    method: 'delete'
  })
}
