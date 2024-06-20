import request from '@/utils/request'

// 查询企业发票信息列表
export function listExhibitor_invoice_info(query) {
  return request({
    url: '/exhibitor/exhibitor_invoice_info/list',
    method: 'get',
    params: query
  })
}

// 查询企业发票信息详细
export function getExhibitor_invoice_info(id) {
  return request({
    url: '/exhibitor/exhibitor_invoice_info/' + id,
    method: 'get'
  })
}

// 新增企业发票信息
export function addExhibitor_invoice_info(data) {
  return request({
    url: '/exhibitor/exhibitor_invoice_info',
    method: 'post',
    data: data
  })
}

// 修改企业发票信息
export function updateExhibitor_invoice_info(data) {
  return request({
    url: '/exhibitor/exhibitor_invoice_info',
    method: 'put',
    data: data
  })
}

// 删除企业发票信息
export function delExhibitor_invoice_info(id) {
  return request({
    url: '/exhibitor/exhibitor_invoice_info/' + id,
    method: 'delete'
  })
}
