import request from '@/utils/request'

//获取招商金额统计
export function moneytotalrecruit(query) {
  return request({
    url: '/data/recruit/total/money',
    method: 'post',
    params: query
  })
}
// 统计企业招商类别分类
export function typeexhibitorrecruit(query) {
  return request({
    url: '/data/recruit/exhibitor/type',
    method: 'post',
    params: query
  })
}
// 参展企业地区统计
export function regionexhibitorrecruit(query) {
  return request({
    url: '/data/recruit/exhibitor/region',
    method: 'post',
    params: query
  })
}

// 统计展位面积
export function areaboothrecruit(query) {
  return request({
    url: '/data/recruit/booth/area',
    method: 'post',
    params: query
  })
}
