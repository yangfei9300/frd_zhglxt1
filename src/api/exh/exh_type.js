import request from '@/utils/request'

// 查询展会项目列表
export function listExh_type(query) {
  return request({
    url: '/exh/exh_type/list',
    method: 'get',
    params: query
  })
}

// 查询展会项目详细
export function getExh_type(id) {
  return request({
    url: '/exh/exh_type/' + id,
    method: 'get'
  })
}

// 新增展会项目
export function addExh_type(data) {
  return request({
    url: '/exh/exh_type',
    method: 'post',
    data: data
  })
}

// 修改展会项目
export function updateExh_type(data) {
  return request({
    url: '/exh/exh_type',
    method: 'put',
    data: data
  })
}

// 删除展会项目
export function delExh_type(id) {
  return request({
    url: '/exh/exh_type/' + id,
    method: 'delete'
  })
}
