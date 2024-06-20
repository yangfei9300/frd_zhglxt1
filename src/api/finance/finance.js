import request from '@/utils/request'

// 查询付款认领记录列表
export function listFinance(query) {
  return request({
    url: '/finance/finance/list',
    method: 'get',
    params: query
  })
}

// 查询付款认领记录详细
export function getFinance(id) {
  return request({
    url: '/finance/finance/' + id,
    method: 'get'
  })
}

// 新增付款认领记录
export function addFinance(data) {
  return request({
    url: '/finance/finance',
    method: 'post',
    data: data
  })
}
// 获取认领的业务员接口 /finance/finance/user/list
export function listuserfinance(data) {
  return request({
    url: '/finance/finance/user/list',
    method: 'post',
    data: data
  })
}




// 修改付款认领记录
export function updateFinance(data) {
  return request({
    url: '/finance/finance',
    method: 'put',
    data: data
  })
}

// 删除付款认领记录
export function delFinance(id) {
  return request({
    url: '/finance/finance/' + id,
    method: 'delete'
  })
}
