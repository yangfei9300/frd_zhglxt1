import request from '@/utils/request'

// 查询展会核销员工列表
export function listExh_log_staff(query) {
  return request({
    url: '/visitor/exh_log_staff/list',
    method: 'get',
    params: query
  })
}

// 查询展会核销员工详细
export function getExh_log_staff(id) {
  return request({
    url: '/visitor/exh_log_staff/' + id,
    method: 'get'
  })
}

// 新增展会核销员工
export function addExh_log_staff(data) {
  return request({
    url: '/visitor/exh_log_staff',
    method: 'post',
    data: data
  })
}

// 修改展会核销员工
export function updateExh_log_staff(data) {
  return request({
    url: '/visitor/exh_log_staff',
    method: 'put',
    data: data
  })
}

// 删除展会核销员工
export function delExh_log_staff(id) {
  return request({
    url: '/visitor/exh_log_staff/' + id,
    method: 'delete'
  })
}
