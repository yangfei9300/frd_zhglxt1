import request from '@/utils/request'

// 查询开票记录列表
export function listFinance_invoice_record(query) {
  return request({
    url: '/finance/finance_invoice_record/list',
    method: 'get',
    params: query
  })
}

// 查询开票记录详细
export function getFinance_invoice_record(id) {
  return request({
    url: '/finance/finance_invoice_record/' + id,
    method: 'get'
  })
}

// 新增开票记录
export function addFinance_invoice_record(data) {
  return request({
    url: '/finance/finance_invoice_record',
    method: 'post',
    data: data
  })
}

// 修改开票记录
export function updateFinance_invoice_record(data) {
  return request({
    url: '/finance/finance_invoice_record',
    method: 'put',
    data: data
  })
}

// 删除开票记录
export function delFinance_invoice_record(id) {
  return request({
    url: '/finance/finance_invoice_record/' + id,
    method: 'delete'
  })
}
