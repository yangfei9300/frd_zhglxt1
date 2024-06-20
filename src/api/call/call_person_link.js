import request from '@/utils/request'









// 查询联络关联列表
export function listCall_person_link(query) {
  return request({
    url: '/call/call_person_link/list',
    method: 'get',
    params: query
  })
}

// 查询联络关联详细
export function getCall_person_link(id) {
  return request({
    url: '/call/call_person_link/' + id,
    method: 'get'
  })
}

// 新增联络关联
export function addCall_person_link(data) {
  return request({
    url: '/call/call_person_link',
    method: 'post',
    data: data
  })
}

// 修改联络关联
export function updateCall_person_link(data) {
  return request({
    url: '/call/call_person_link',
    method: 'put',
    data: data
  })
}

// 删除联络关联
export function delCall_person_link(id) {
  return request({
    url: '/call/call_person_link/' + id,
    method: 'delete'
  })
}
