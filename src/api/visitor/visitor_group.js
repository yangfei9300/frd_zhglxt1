import request from '@/utils/request'

// 查询观众团体列表
export function listVisitor_group(query) {
  return request({
    url: '/visitor/visitor_group/list',
    method: 'get',
    params: query
  })
}

// 查询观众团体详细
export function getVisitor_group(id) {
  return request({
    url: '/visitor/visitor_group/' + id,
    method: 'get'
  })
}

// 新增观众团体
export function addVisitor_group(data) {
  return request({
    url: '/visitor/visitor_group',
    method: 'post',
    data: data
  })
}

// 导入企业战团
export function visitor_groupfileimport(data) {
  return request({
    url: '/visitor/visitor_group/fileimport',
    method: 'post',
    data: data
  })
}
// 新建战团
export function createvisitor_group(data) {
  return request({
    url: '/visitor/visitor_group/create',
    method: 'post',
    data: data
  })
}
// 获取没参展的观众
export function nogroupvisitor_info(data) {
  return request({
    url: '/visitor/visitor_info/nogroup',
    method: 'post',
    data: data
  })
}



// 修改观众团体
export function updateVisitor_group(data) {
  return request({
    url: '/visitor/visitor_group',
    method: 'put',
    data: data
  })
}

// 删除观众团体
export function delVisitor_group(id) {
  return request({
    url: '/visitor/visitor_group/' + id,
    method: 'delete'
  })
}

// 统计人数消息结果
export function enrollNumstatvisitor(data) {
  return request({
    url: '/api/visitor/stat/enrollNum',
    method: 'post',
    data: data
  })
}
// 导出到现场观众信息
export function arriveVisitorexportstat(data) {
  return request({
    url: '/api/visitor/stat/export/arriveVisitor',
    method: 'post',
    data: data
  })
}
// 导出展会核销 导出展会核销记录列表
export function logVerificationexport(data) {
  return request({
    url: '/api/visitor/stat/export/logVerification',
    method: 'post',
    data: data
  })
}