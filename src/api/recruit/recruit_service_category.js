import request from '@/utils/request'

// 查询招展服务类别列表
export function listRecruit_service_category(query) {
  return request({
    url: '/recruit/recruit_service_category/list',
    method: 'get',
    params: query
  })
}

// 查询招展服务类别详细
export function getRecruit_service_category(id) {
  return request({
    url: '/recruit/recruit_service_category/' + id,
    method: 'get'
  })
}

// 新增招展服务类别
export function addRecruit_service_category(data) {
  return request({
    url: '/recruit/recruit_service_category',
    method: 'post',
    data: data
  })
}

// 修改招展服务类别
export function updateRecruit_service_category(data) {
  return request({
    url: '/recruit/recruit_service_category',
    method: 'put',
    data: data
  })
}

// 删除招展服务类别
export function delRecruit_service_category(id) {
  return request({
    url: '/recruit/recruit_service_category/' + id,
    method: 'delete'
  })
}
