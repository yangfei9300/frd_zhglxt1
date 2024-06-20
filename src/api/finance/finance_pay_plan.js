import request from '@/utils/request'

// 查询付款(回款)计划列表
export function listFinance_pay_plan(query) {
  return request({
    url: '/finance/finance_pay_plan/list',
    method: 'get',
    params: query
  })
}

// 查询付款(回款)计划详细
export function getFinance_pay_plan(id) {
  return request({
    url: '/finance/finance_pay_plan/' + id,
    method: 'get'
  })
}

// 新增付款(回款)计划
export function addFinance_pay_plan(data) {
  return request({
    url: '/finance/finance_pay_plan',
    method: 'post',
    data: data
  })
}
export function claimfinancefinance(data) {
  return request({
    url: '/finance/finance/claim',
    method: 'post',
    data: data
  })
}

// 修改付款(回款)计划
export function updateFinance_pay_plan(data) {
  return request({
    url: '/finance/finance_pay_plan',
    method: 'put',
    data: data
  })
}

// 删除付款(回款)计划
export function delFinance_pay_plan(id) {
  return request({
    url: '/finance/finance_pay_plan/' + id,
    method: 'delete'
  })
}
