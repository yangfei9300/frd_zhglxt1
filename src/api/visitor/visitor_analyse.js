import request from '@/utils/request'


// 问题统计信息
export function quesanalysevisitor(data) {
  return request({
    url: '/api/visitor/analyse/ques',
    method: 'post',
    data: data
  })
}
// 3.1.统计展会本地和外地观众数量
export function hostVisitoranalyse(data) {
  return request({
    url: '/api/visitor/analyse/hostVisitor',
    method: 'post',
    data: data
  })
}
// 3.2.非展会本地观众，各行政区域比例
export function otherCityanalyse(data) {
  return request({
    url: '/api/visitor/analyse/otherCity',
    method: 'post',
    data: data
  })
}
// 3.3.大陆地区观众按省份分类统计
export function byProvinceanalyse(data) {
  return request({
    url: '/api/visitor/analyse/byProvince',
    method: 'post',
    data: data
  })
}



// 3.4.外地观众按城市统计
export function byCityanalyse(data) {
  return request({
    url: '/api/visitor/analyse/byCity',
    method: 'post',
    data: data
  })
}




// 3.5.1.规范职务，出现30次以上的列表
export function deptlistanalyse(data) {
  return request({
    url: '/api/visitor/analyse/deptlist',
    method: 'post',
    data: data
  })
}
// 3.5.2.部门分类统计比例
export function dutiesratio(data) {
  return request({
    url: '/api/visitor/analyse/ratio/duties',
    method: 'post',
    data: data
  })
}


// 3.5.3.职位分类统计比例
export function deptratio(data) {
  return request({
    url: '/api/visitor/analyse/ratio/dept',
    method: 'post',
    data: data
  })
}

// 每日观众情况——观众到达情况统计
export function dateanalysevisitor(data) {
  return request({
    url: '/api/visitor/analyse/date',
    method: 'post',
    data: data
  })
}
// 报名信息统计——有效数据构成
export function EnrollCountanalyse(data) {
  return request({
    url: '/api/visitor/analyse/EnrollCount',
    method: 'post',
    data: data
  })
}
//
export function citycountanalyse(data) {
  return request({
    url: '/api/visitor/analyse/count/city',
    method: 'post',
    data: data
  })
}
// 联系电话记录苏
export function validanalysevisitor(data) {
  return request({
    url: '/api/visitor/analyse/valid',
    method: 'post',
    data: data
  })
}
// 上传文件
export function commonupload(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    data: data
  })
}
// 生成文件   
export function visitoranalysefile(data) {
  return request({
    url: '/api/visitor/analyse/file',
    method: 'post',
    data: data
  })
}