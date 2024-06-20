import request from '@/utils/request'

// 查询展商服务预定列表
export function listExhibitor_service_reservation(query) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation/list',
    method: 'get',
    params: query
  })
}

// 查询展商服务预定详细
export function getExhibitor_service_reservation(id) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation/' + id,
    method: 'get'
  })
}

// 新增展商服务预定
export function addExhibitor_service_reservation(data) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation',
    method: 'post',
    data: data
  })
}
// 新增展商的服务
export function buyexhibitor_service_reservation(data) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation/buy',
    method: 'post',
    data: data
  })
}
// 获取展商已选择的服务
export function booklistexhibitor_service_reservation(data) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation/list/book',
    method: 'get',
    params: data
  })
}



// 修改展商服务预定
export function updateExhibitor_service_reservation(data) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation',
    method: 'put',
    data: data
  })
}

// 删除展商服务预定
export function delExhibitor_service_reservation(id) {
  return request({
    url: '/exhibitor/exhibitor_service_reservation/' + id,
    method: 'delete'
  })
}
