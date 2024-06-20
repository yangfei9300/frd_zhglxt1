import request from '@/utils/request'

// 查询展商信息列表
export function listExhibitor_info(query) {
  console.log("aaaa--",query);
  return request({
    url: '/exhibitor/exhibitor_info/list',
    method: 'get',
    params: query
  })
}

// 查询展商信息详细
export function getExhibitor_info(id) {
  return request({
    url: '/exhibitor/exhibitor_info/' + id,
    method: 'get'
  })
}

// 新增展商信息
export function addExhibitor_info(data) {
  return request({
    url: '/exhibitor/exhibitor_info',
    method: 'post',
    data: data
  })
}

export function fileimportsea(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/fileimport',
    method: 'post',
    data: data
  })
}






// 修改展商信息
export function updateExhibitor_info(data) {
  return request({
    url: '/exhibitor/exhibitor_info',
    method: 'put',
    data: data
  })
}

// 删除展商信息
export function delExhibitor_info(id) {
  return request({
    url: '/exhibitor/exhibitor_info/' + id,
    method: 'delete'
  })
}
