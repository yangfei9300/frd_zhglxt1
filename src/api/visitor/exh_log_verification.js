import request from '@/utils/request'

// 查询展会核销记录列表
export function listExh_log_verification(query) {
  return request({
    url: '/visitor/exh_log_verification/list',
    method: 'get',
    params: query
  })
}

// 查询展会核销记录详细
export function getExh_log_verification(id) {
  return request({
    url: '/visitor/exh_log_verification/' + id,
    method: 'get'
  })
}

// 查询


export function list_user_exh_log_verification_visitor(data) {
  return request({
    url: '/visitor/exh_log_verification/user/list',
    method: 'post',
    data: data
  })
}


// 新增展会核销记录
export function addExh_log_verification(data) {
  return request({
    url: '/visitor/exh_log_verification',
    method: 'post',
    data: data
  })
}

// 修改展会核销记录
export function updateExh_log_verification(data) {
  return request({
    url: '/visitor/exh_log_verification',
    method: 'put',
    data: data
  })
}

// 删除展会核销记录
export function delExh_log_verification(id) {
  return request({
    url: '/visitor/exh_log_verification/' + id,
    method: 'delete'
  })
}
 export function importexh_log_verification(data) {
  return request({
    url: '/visitor/exh_log_verification/import' ,
     method: 'post',
     data: data
     // method: 'get',
     // params: query
  })
}
