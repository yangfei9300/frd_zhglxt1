import request from '@/utils/request'

// 查询展会信息列表
export function listExh_list(query) {
  return request({
    url: '/exh/exh_list/list',
    method: 'get',
    params: query
  })
}

// 查询展会信息详细
export function getExh_list(id) {
  return request({
    url: '/exh/exh_list/' + id,
    method: 'get'
  })
}

// 新增展会信息
export function addExh_list(data) {
  return request({
    url: '/exh/exh_list',
    method: 'post',
    data: data
  })
}

// 修改展会信息
export function updateExh_list(data) {
  return request({
    url: '/exh/exh_list',
    method: 'put',
    data: data
  })
}

// 删除展会信息
export function delExh_list(id) {
  return request({
    url: '/exh/exh_list/' + id,
    method: 'delete'
  })
}
