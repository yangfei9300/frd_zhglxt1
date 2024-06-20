import request from '@/utils/request'

// 查询付款(回款)记录列表
export function listFinance_pay_record(query) {
  return request({
    url: '/finance/finance_pay_record/list',
    method: 'get',
    params: query
  })
}

// 查询付款(回款)记录详细
export function getFinance_pay_record(id) {
  return request({
    url: '/finance/finance_pay_record/' + id,
    method: 'get'
  })
}



// 新增付款(回款)记录
export function addFinance_pay_record(data) {
  return request({
    url: '/finance/finance_pay_record',
    method: 'post',
    data: data
  })
}
// 导入收款记录
export function finance_pay_recordbatchimport(data) {
  return request({
    url: '/finance/finance_pay_record/batch/import',
    method: 'post',
    data: data
  })
}





// 修改付款(回款)记录
export function updateFinance_pay_record(data) {
  return request({
    url: '/finance/finance_pay_record',
    method: 'put',
    data: data
  })
}

// 删除付款(回款)记录
export function delFinance_pay_record(id) {
  return request({
    url: '/finance/finance_pay_record/' + id,
    method: 'delete'
  })
}
