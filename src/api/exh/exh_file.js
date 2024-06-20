import request from '@/utils/request'

// 查询展会资料列表
export function listExh_file(query) {
  return request({
    url: '/exh/exh_file/list',
    method: 'get',
    params: query
  })
}

// 查询展会资料详细
export function getExh_file(id) {
  return request({
    url: '/exh/exh_file/' + id,
    method: 'get'
  })
}

// 新增展会资料
export function addExh_file(data) {
  return request({
    url: '/exh/exh_file',
    method: 'post',
    data: data
  })
}

// 修改展会资料
export function updateExh_file(data) {
  return request({
    url: '/exh/exh_file',
    method: 'put',
    data: data
  })
}

// 删除展会资料
export function delExh_file(id) {
  return request({
    url: '/exh/exh_file/' + id,
    method: 'delete'
  })
}
