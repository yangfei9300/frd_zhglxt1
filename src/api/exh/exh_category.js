import request from '@/utils/request'

// 查询类别管理列表
export function listExh_category(query) {
  console.log("查询类别管理列表",query)
  return request({
    url: '/exh/exh_category/list',
    method: 'get',
    params: query
  })
}

// 查询类别管理详细
export function getExh_category(id) {
  return request({
    url: '/exh/exh_category/' + id,
    method: 'get'
  })
}

// 新增类别管理
export function addExh_category(data) {
  return request({
    url: '/exh/exh_category',
    method: 'post',
    data: data
  })
}

// 修改类别管理
export function updateExh_category(data) {
  return request({
    url: '/exh/exh_category',
    method: 'put',
    data: data
  })
}

// 删除类别管理
export function delExh_category(id) {
  return request({
    url: '/exh/exh_category/' + id,
    method: 'delete'
  })
}
