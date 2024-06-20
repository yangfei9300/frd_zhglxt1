import request from '@/utils/request'

// 查询合同内容列表
export function listRecruit_contract_content(query) {
  return request({
    url: '/recruit/recruit_contract_content/list',
    method: 'get',
    params: query
  })
}

// 查询合同内容详细
export function getRecruit_contract_content(id) {
  return request({
    url: '/recruit/recruit_contract_content/' + id,
    method: 'get'
  })
}

// 新增合同内容
export function addRecruit_contract_content(data) {
  return request({
    url: '/recruit/recruit_contract_content',
    method: 'post',
    data: data
  })
}

// 修改合同内容
export function updateRecruit_contract_content(data) {
  return request({
    url: '/recruit/recruit_contract_content',
    method: 'put',
    data: data
  })
}

// 删除合同内容
export function delRecruit_contract_content(id) {
  return request({
    url: '/recruit/recruit_contract_content/' + id,
    method: 'delete'
  })
}
