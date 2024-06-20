import request from '@/utils/request'

// 查询展商联络记录列表
export function listExhibitor_contact_record(query) {
  return request({
    url: '/exhibitor/exhibitor_contact_record/list',
    method: 'get',
    params: query
  })
}

// 查询展商联络记录详细
export function getExhibitor_contact_record(id) {
  return request({
    url: '/exhibitor/exhibitor_contact_record/' + id,
    method: 'get'
  })
}

// 新增展商联络记录
export function addExhibitor_contact_record(data) {
  return request({
    url: '/exhibitor/exhibitor_contact_record',
    method: 'post',
    data: data
  })
}

// 修改展商联络记录
export function updateExhibitor_contact_record(data) {
  return request({
    url: '/exhibitor/exhibitor_contact_record',
    method: 'put',
    data: data
  })
}

// 删除展商联络记录
export function delExhibitor_contact_record(id) {
  return request({
    url: '/exhibitor/exhibitor_contact_record/' + id,
    method: 'delete'
  })
}
