import request from '@/utils/request'

// 查询观众团体列表
export function visitor_referrerlist(query) {
  return request({
    url: '/visitor/visitor_referrer/list',
    method: 'get',
    params: query
  })
}

// 导出展会核销 导出展会核销记录列表
export function visitor_referrerExport(data) {
  return request({
    url: '/visitor/visitor_referrer/export',
    method: 'post',
    data: data
  })
}
