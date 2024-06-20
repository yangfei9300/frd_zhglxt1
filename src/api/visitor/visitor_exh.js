import request from '@/utils/request'

// 查询观众展会关联列表
export function listVisitor_exh(query) {
  return request({
    url: '/visitor/visitor_exh/list',
    method: 'get',
    params: query
  })
}

// 查询观众展会关联详细
export function getVisitor_exh(id) {
  return request({
    url: '/visitor/visitor_exh/' + id,
    method: 'get'
  })
}

// 新增观众展会关联
export function addVisitor_exh(data) {
  return request({
    url: '/visitor/visitor_exh',
    method: 'post',
    data: data
  })
}
// 获取团体列表
export function grouplistvisitor_exh(data) {
  return request({
    url: '/visitor/visitor_exh/list/group',
    method: 'post',
    data: data
  })
}
// 获取邀请人列表   
export function referrerlistvisitor_exh(data) {
  return request({
    url: '/visitor/visitor_exh/list/referrer',
    method: 'post',
    data: data
  })
}


// 修改观众展会关联
export function updateVisitor_exh(data) {
  return request({
    url: '/visitor/visitor_exh',
    method: 'put',
    data: data
  })
}

// 删除观众展会关联
export function delVisitor_exh(id) {
  return request({
    url: '/visitor/visitor_exh/' + id,
    method: 'delete'
  })
}
