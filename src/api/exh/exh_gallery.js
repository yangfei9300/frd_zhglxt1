import request from '@/utils/request'

// 查询展馆信息列表
export function listExh_gallery(query) {
  return request({
    url: '/exh/exh_gallery/list',
    method: 'get',
    params: query
  })
}

// 查询展馆信息详细
export function getExh_gallery(id) {
  return request({
    url: '/exh/exh_gallery/' + id,
    method: 'get'
  })
}

// 新增展馆信息
export function addExh_gallery(data) {
  return request({
    url: '/exh/exh_gallery',
    method: 'post',
    data: data
  })
}

// 修改展馆信息
export function updateExh_gallery(data) {
  return request({
    url: '/exh/exh_gallery',
    method: 'put',
    data: data
  })
}

// 删除展馆信息
export function delExh_gallery(id) {
  return request({
    url: '/exh/exh_gallery/' + id,
    method: 'delete'
  })
}
