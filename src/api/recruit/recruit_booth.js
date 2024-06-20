import request from '@/utils/request'

// 查询招展展位列表
export function listRecruit_booth(query) {
  return request({
    url: '/recruit/recruit_booth/list',
    method: 'get',
    params: query
  })
}

// 查询招展展位详细
export function getRecruit_booth(id) {
  return request({
    url: '/recruit/recruit_booth/' + id,
    method: 'get'
  })
}

// 新增招展展位
export function addRecruit_booth(data) {
  return request({
    url: '/recruit/recruit_booth',
    method: 'post',
    data: data
  })
}
// 给展商添加展位
export function addexhibitor_exhbuybooth(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/buy/booth',
    method: 'post',
    data: data
  })
}

// 未购买的展位
export function notbuylistrecruit_booth(data) {
  return request({
    url: '/recruit/recruit_booth/list/notbuy',
    method: 'get',
    params: data
  })
}
//获取已选择的展位
export function buylistrecruit_booth(data) {
  return request({
    url: '/recruit/recruit_booth/list/buy',
    method: 'get',
    params: data
  })
}



// 批量添加招展
export function addRecruit_boothbatchadd(data) {
  return request({
    url: '/recruit/recruit_booth/batch/add',
    method: 'post',
    data: data
  })
}
// 批量导入招展展位（从其他展会导入）
export function recruitrecruit_boothbatchimport(data) {
  return request({
    url: '/recruit/recruit_booth/batch/import',
    method: 'post',
    data: data
  })
}

// 修改招展展位
export function updateRecruit_booth(data) {
  return request({
    url: '/recruit/recruit_booth',
    method: 'put',
    data: data
  })
}

// 删除招展展位
export function delRecruit_booth(id) {
  return request({
    url: '/recruit/recruit_booth/' + id,
    method: 'delete'
  })
}
// 展位退订
export function boothreturnexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/return/booth',
       method: 'post',
       data: data
  })
}
