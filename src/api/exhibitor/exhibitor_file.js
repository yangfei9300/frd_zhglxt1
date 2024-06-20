import request from '@/utils/request'

// 查询展商文件列表
export function listExhibitor_file(query) {
  return request({
    url: '/exhibitor/exhibitor_file/list',
    method: 'get',
    params: query
  })
}

// 查询展商文件详细
export function getExhibitor_file(id) {
  return request({
    url: '/exhibitor/exhibitor_file/' + id,
    method: 'get'
  })
}

// 新增展商文件
export function addExhibitor_file(data) {
  return request({
    url: '/exhibitor/exhibitor_file',
    method: 'post',
    data: data
  })
}

// 修改展商文件
export function updateExhibitor_file(data) {
  return request({
    url: '/exhibitor/exhibitor_file',
    method: 'put',
    data: data
  })
}

// 删除展商文件
export function delExhibitor_file(id) {
  return request({
    url: '/exhibitor/exhibitor_file/' + id,
    method: 'delete'
  })
}
