import request from '@/utils/request'

// 查询招展模版列表
export function listRecruit_template(query) {
  return request({
    url: '/recruit/recruit_template/list',
    method: 'get',
    params: query
  })
}

// 查询招展模版详细
export function getRecruit_template(id) {
  return request({
    url: '/recruit/recruit_template/' + id,
    method: 'get'
  })
}

// 新增招展模版
export function addRecruit_template(data) {
  return request({
    url: '/recruit/recruit_template',
    method: 'post',
    data: data
  })
}

// 修改招展模版
export function updateRecruit_template(data) {
  return request({
    url: '/recruit/recruit_template',
    method: 'put',
    data: data
  })
}

// 删除招展模版
export function delRecruit_template(id) {
  return request({
    url: '/recruit/recruit_template/' + id,
    method: 'delete'
  })
}
