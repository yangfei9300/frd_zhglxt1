import request from '@/utils/request'

// 查询展商轨迹列表
export function listExhibitor_trail(query) {
  return request({
    url: '/exhibitor/exhibitor_trail/list',
    method: 'get',
    params: query
  })
}

// 查询展商轨迹详细
export function getExhibitor_trail(id) {
  return request({
    url: '/exhibitor/exhibitor_trail/' + id,
    method: 'get'
  })
}

// 新增展商轨迹
export function addExhibitor_trail(data) {
  return request({
    url: '/exhibitor/exhibitor_trail',
    method: 'post',
    data: data
  })
}

// 修改展商轨迹
export function updateExhibitor_trail(data) {
  return request({
    url: '/exhibitor/exhibitor_trail',
    method: 'put',
    data: data
  })
}

// 删除展商轨迹
export function delExhibitor_trail(id) {
  return request({
    url: '/exhibitor/exhibitor_trail/' + id,
    method: 'delete'
  })
}
