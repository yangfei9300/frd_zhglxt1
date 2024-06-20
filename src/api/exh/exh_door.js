import request from '@/utils/request'

// 查询展会出入口列表
export function listExh_door(query) {
  return request({
    url: '/exh/exh_door/list',
    method: 'get',
    params: query
  })
}

// 查询展会出入口详细
export function getExh_door(id) {
  return request({
    url: '/exh/exh_door/' + id,
    method: 'get'
  })
}

// 新增展会出入口
export function addExh_door(data) {
  return request({
    url: '/exh/exh_door',
    method: 'post',
    data: data
  })
}

// 修改展会出入口
export function updateExh_door(data) {
  return request({
    url: '/exh/exh_door',
    method: 'put',
    data: data
  })
}

// 删除展会出入口
export function delExh_door(id) {
  return request({
    url: '/exh/exh_door/' + id,
    method: 'delete'
  })
}
