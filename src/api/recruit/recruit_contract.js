import request from '@/utils/request'

// 查询合同列表
export function listRecruit_contract(query) {
  return request({
    url: '/recruit/recruit_contract/list',
    method: 'get',
    params: query
  })
}

// 查询合同详细
export function getRecruit_contract(id) {
  return request({
    url: '/recruit/recruit_contract/' + id,
    method: 'get'
  })
}

// 新增合同
export function addRecruit_contract(data) {
  return request({
    url: '/recruit/recruit_contract',
    method: 'post',
    data: data
  })
}

// 修改合同
export function updateRecruit_contract(data) {
  return request({
    url: '/recruit/recruit_contract',
    method: 'put',
    data: data
  })
}

// 删除合同
export function delRecruit_contract(id) {
  return request({
    url: '/recruit/recruit_contract/' + id,
    method: 'delete'
  })
}
