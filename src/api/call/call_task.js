import request from '@/utils/request'

// 查询联络任务列表
export function listCall_task(query) {
  return request({
    url: '/call/call_task/list',
    method: 'get',
    params: query
  })
}

// 查询联络任务详细
export function getCall_task(id) {
  return request({
    url: '/call/call_task/' + id,
    method: 'get'
  })
}

// 新增联络任务
export function addCall_task(data) {
  return request({
    url: '/call/call_task',
    method: 'post',
    data: data
  })
}
// 获取按照数量统计
export function callcountcount(data) {
  return request({
    url: '/api/call/count/count',
    method: 'post',
    data: data
  })
}
// 按照类别百分比统计
export function reasoncountcall(data) {
  return request({
    url: '/api/call/count/reason',
    method: 'post',
    data: data
  })
}
// 按照工作人員百分比
export function staffcountcall(data) {
  return request({
    url: '/api/call/count/staff',
    method: 'post',
    data: data
  })
}
// 业绩看板
export function kbcountcall(data) {
  return request({
    url: '/api/call/count/kb',
    method: 'post',
    data: data
  })
}
//工作日情况
 export function workdaycountcall(data) {
   return request({
     url: '/api/call/count/workday',
     method: 'post',
     data: data
   })
 }
 // 将选中的数据添加到现有任务中
 export function importcall_importcall(data) {
   return request({
     url: '/call/call_import/import',
     method: 'post',
     data: data
   })
 }
 
 // 
 export function resultcountcall(data) {
   return request({
     url: '/api/call/count/result',
     method: 'post',
     data: data
   })
 }
 export function allocationcall_import(data) {
   return request({
     url: '/call/call_import/allocation',
     method: 'post',
     data: data
   })
 }
 
 
 
 // 获取相关业务员
 export function staffscall_import(data) {
   return request({
     url: '/call/call_import/staffs',
     method: 'get',
    params: data
   })
 }



// 修改联络任务
export function updateCall_task(data) {
  return request({
    url: '/call/call_task',
    method: 'put',
    data: data
  })
}

// 删除联络任务
export function delCall_task(id) {
  return request({
    url: '/call/call_task/' + id,
    method: 'delete'
  })
}
