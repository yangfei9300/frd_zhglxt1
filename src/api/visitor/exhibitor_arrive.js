import request from '@/utils/request'

// 查询展商报道列表
export function listExhibitor_arrive(query) {
  return request({
    url: '/visitor/exhibitor_arrive/list',
    method: 'get',
    params: query
  })
}

// 查询展商报道详细
export function getExhibitor_arrive(id) {
  return request({
    url: '/visitor/exhibitor_arrive/' + id,
    method: 'get'
  })
}

// 新增展商报道
export function addExhibitor_arrive(data) {
  return request({
    url: '/visitor/exhibitor_arrive',
    method: 'post',
    data: data
  })
}

// 修改展商报道
export function updateExhibitor_arrive(data) {
  return request({
    url: '/visitor/exhibitor_arrive',
    method: 'put',
    data: data
  })
}

// 删除展商报道
export function delExhibitor_arrive(id) {
  return request({
    url: '/visitor/exhibitor_arrive/' + id,
    method: 'delete'
  })
}
// 导出二维码
 export function exhibitorexport() {
  return request({
    url: '/visitor/exhibitor_arrive/export/exhibitor' ,
     method: 'post',
     data: {}
     // method: 'get',
     // params: query
  })
}
// 导入文件

 export function importexh_log_verification() {
  return request({
    url: '/visitor/exh_log_verification/import' ,
     method: 'post',
     data: {}
     // method: 'get',
     // params: query
  })
}