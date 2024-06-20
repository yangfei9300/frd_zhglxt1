import request from '@/utils/request'

// 查询联络历史列表
export function listCall_person_link_history(query) {
  return request({
    url: '/call/call_person_link_history/list',
    method: 'get',
    params: query
  })
}

// 查询联络历史详细
export function getCall_person_link_history(id) {
  return request({
    url: '/call/call_person_link_history/' + id,
    method: 'get'
  })
}

// 新增联络历史
export function addCall_person_link_history(data) {
  return request({
    url: '/call/call_person_link_history',
    method: 'post',
    data: data
  })
}

// 修改联络历史
export function updateCall_person_link_history(data) {
  return request({
    url: '/call/call_person_link_history',
    method: 'put',
    data: data
  })
}

// 删除联络历史
export function delCall_person_link_history(id) {
  return request({
    url: '/call/call_person_link_history/' + id,
    method: 'delete'
  })
}
