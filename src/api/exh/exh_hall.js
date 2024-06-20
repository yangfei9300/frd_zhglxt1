import request from '@/utils/request'

// 查询展厅信息列表
export function listExh_hall(query) {
  return request({
    url: '/exh/exh_hall/list',
    method: 'get',
    params: query
  })
}
export function exhlistexh_hall(query) {
  return request({
    url: '/exh/exh_hall/list/exh',
    method: 'get',
    params: query
  })
}

// 查询展厅信息详细
export function getExh_hall(id) {
  return request({
    url: '/exh/exh_hall/' + id,
    method: 'get'
  })
}

// 新增展厅信息
export function addExh_hall(data) {
  return request({
    url: '/exh/exh_hall',
    method: 'post',
    data: data
  })
}

// 修改展厅信息
export function updateExh_hall(data) {
  return request({
    url: '/exh/exh_hall',
    method: 'put',
    data: data
  })
}

// 删除展厅信息
export function delExh_hall(id) {
  return request({
    url: '/exh/exh_hall/' + id,
    method: 'delete'
  })
}
