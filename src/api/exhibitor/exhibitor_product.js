import request from '@/utils/request'

// 查询展商展品列表
export function listExhibitor_product(query) {
  return request({
    url: '/exhibitor/exhibitor_product/list',
    method: 'get',
    params: query
  })
}

// 查询展商展品详细
export function getExhibitor_product(id) {
  return request({
    url: '/exhibitor/exhibitor_product/' + id,
    method: 'get'
  })
}

// 新增展商展品
export function addExhibitor_product(data) {
  return request({
    url: '/exhibitor/exhibitor_product',
    method: 'post',
    data: data
  })
}

// 修改展商展品
export function updateExhibitor_product(data) {
  return request({
    url: '/exhibitor/exhibitor_product',
    method: 'put',
    data: data
  })
}

// 删除展商展品
export function delExhibitor_product(id) {
  return request({
    url: '/exhibitor/exhibitor_product/' + id,
    method: 'delete'
  })
}
