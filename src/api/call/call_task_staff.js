import request from '@/utils/request'

// 查询联络任务业务员列表
export function listCall_task_staff(query) {
  return request({
    url: '/call/call_task_staff/list',
    method: 'get',
    params: query
  })
}

// 查询联络任务业务员详细
export function getCall_task_staff(id) {
  return request({
    url: '/call/call_task_staff/' + id,
    method: 'get'
  })
}

// 新增联络任务业务员
export function addCall_task_staff(data) {
  return request({
    url: '/call/call_task_staff',
    method: 'post',
    data: data
  })
}

// 修改联络任务业务员
export function updateCall_task_staff(data) {
  return request({
    url: '/call/call_task_staff',
    method: 'put',
    data: data
  })
}

// 删除联络任务业务员
export function delCall_task_staff(id) {
  return request({
    url: '/call/call_task_staff/' + id,
    method: 'delete'
  })
}
