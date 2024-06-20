import request from '@/utils/request'

// 查询展商展会关联列表
export function listExhibitor_exh(query) {
  return request({
    url: '/exhibitor/exhibitor_exh/list',
    method: 'get',
    params: query
  })
}
//公海领取
export function takeseaexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/take',
    method: 'post',
    data: data
  })
}
export function averageeaexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/average',
    method: 'post',
    data: data
  })
}



// 获取展商的展品分类
export function classificationexhId_liveimage(data) {
  return request({
    url: '/miniapp/liveimage/classificationexhId',
    method: 'post',
    data: data
  })
}


// 将企业添加到公海
export function seaexhibitor_exhexhibitor(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea',
    method: 'post',
    data: data
  })
}
export function replaceseaexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/replace',
    method: 'post',
    data: data
  })
}
// 将展商分给业务员
export function distributeseaexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/distribute',
    method: 'post',
    data: data
  })
}





// 查询展商展会关联详细
export function getExhibitor_exh(id) {
  return request({
    url: '/exhibitor/exhibitor_exh/' + id,
    method: 'get',
  })
}

// 新增展商展会关联
export function addExhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh',
    method: 'post',
    data: data
  })
}


// 获取业务员列表
export function listexh_userexh(data) {
  return request({
    url: '/exh/exh_user/list',
    method: 'post',
    data: data
  })
}


// 获取参展记录
// 获取参展历史  exhibitorId
export function historylistexhibitor_exh(query) {
  return request({
    url: '/exhibitor/exhibitor_exh/list/history',
    method: 'GET',
    params: query
  })
}




// 从历史展商中添加展商
export function addExhToBp(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/batch/add',
    method: 'post',
    data: data
  })
}
// 从历史展会中添加展商
export function exhibitor_exhimport(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/batch/import',
    method: 'post',
    data: data
  })
}
// 展商退出到公海
export function exhibitor_exhseaput(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/put',
    method: 'post',
    data: data
  })
}

// 获取公海
export function listseaexhibitor_exh(query) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/list',
  method: 'get',
  params: query
  })
}

// 获取展商概况详情（合同）
export function contractinfoexh(data) {
  return request({
    url: '/exh/info/contract',
  method: 'post',
  data: data
  })
}
// 服务概况
export function serviceinfoexh(data) {
  return request({
    url: '/exh/info/service',
  method: 'post',
  data: data
  })
}
// 展位概况1
export function boothinfoexh(data) {
  return request({
    url: '/exh/info/booth',
  method: 'post',
  data: data
  })
}
// 展位概况2
export function priceboothinfo(data) {
  return request({
    url: '/exh/info/booth/price',
  method: 'post',
  data: data
  })
}
// 获取展商概况
export function exhibitorinfoexh(data) {
  return request({
    url: '/exh/info/exhibitor',
  method: 'post',
  data: data
  })
}
// 获取合同概况
export function contractlistexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/list/contract',
  method: 'post',
  data: data
  })
}



// 修改展商展会关联
export function updateExhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh',
    method: 'put',
    data: data
  })
}



// 删除展商展会关联
export function delExhibitor_exh(id) {
  return request({
    url: '/exhibitor/exhibitor_exh/' + id,
    method: 'delete'
  })
}

// 退展
export function cancelseaexhibitor_exh(data) {
  return request({
    url: '/exhibitor/exhibitor_exh/sea/cancel',
  method: 'post',
  data: data
  })
}