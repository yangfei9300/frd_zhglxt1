import request from '@/utils/request'


// 新增观众信息
export function usernumpda(data) {
  return request({
    url: '/api/pda/num/user',
    method: 'get',
      params: data
  })
}
export function doornumpda(data) {
  return request({
    url: '/api/pda/num/door',
    method: 'get',
      params: data
  })
}


