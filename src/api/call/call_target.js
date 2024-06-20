import request from '@/utils/request'

// 查询联络目标列表
export function listCall_target(query) {
  return request({
    url: '/call/call_target/list',
    method: 'get',
    params: query
  })
}



// 查询联络目标详细
export function getCall_target(id) {
  return request({
    url: '/call/call_target/' + id,
    method: 'get'
  })
}

// 新增联络目标
export function addCall_target(data) {
  return request({
    url: '/call/call_target',
    method: 'post',
    data: data
  })
}
// 获取导入记录列表
export function groupcall_import(data) {
  return request({
    url: '/call/call_import/group',
    method: 'post',
    data: data
  })
}
// 获取导入记录列表
export function filecall_import(data) {
  return request({
    url: '/call/call_import/file',
    method: 'post',
    data: data
  })
}
export function listcall_import(data) {
  return request({
    url: '/call/call_import/list',
    method: 'get',
    // data: data
    params: data
  })
}
export function alladdcall_import(data) {
  return request({
    url: '/call/call_import/add/all',
    method: 'post',
    data: data
  })
}


export function addcall_import(data) {
  return request({
    url: '/call/call_import/add',
    method: 'post',
    data: data
  })
}

export function selectlistcall_import(data) {
  return request({
    url: '/call/call_import/selectlist',
    method: 'get',
    params: data
  })
}






// 修改联络目标
export function updateCall_target(data) {
  return request({
    url: '/call/call_target',
    method: 'put',
    data: data
  })
}

// 删除联络目标
export function delCall_target(id) {
  return request({
    url: '/call/call_target/' + id,
    method: 'delete'
  })
}
