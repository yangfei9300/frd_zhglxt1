import request from '@/utils/request'

// 查询招展服务展位价格类别列表
export function listRecruit_service_booth_price(query) {
  return request({
    url: '/recruit/recruit_service_booth_price/list',
    method: 'get',
    params: query
  })
}

// 查询招展服务展位价格类别详细
export function getRecruit_service_booth_price(id) {
  return request({
    url: '/recruit/recruit_service_booth_price/' + id,
    method: 'get'
  })
}

// 新增招展服务展位价格类别
export function addRecruit_service_booth_price(data) {
  return request({
    url: '/recruit/recruit_service_booth_price',
    method: 'post',
    data: data
  })
}

// 修改招展服务展位价格类别
export function updateRecruit_service_booth_price(data) {
  return request({
    url: '/recruit/recruit_service_booth_price',
    method: 'put',
    data: data
  })
}

// 删除招展服务展位价格类别
export function delRecruit_service_booth_price(id) {
  return request({
    url: '/recruit/recruit_service_booth_price/' + id,
    method: 'delete'
  })
}
