import request from '@/utils/request'

// 查询招展服务项目列表
export function listRecruit_service_project(query) {
  return request({
    url: '/recruit/recruit_service_project/list',
    method: 'get',
    params: query
  })
}

// 查询招展服务项目详细
export function getRecruit_service_project(id) {
  return request({
    url: '/recruit/recruit_service_project/' + id,
    method: 'get'
  })
}

// 批量导入服务项目
export function recruit_service_projectbatchimport(data) {
  return request({
    url: '/recruit/recruit_service_project/batch/import',
    method: 'post',
    data: data
  })
}

// 新增招展服务项目
export function addRecruit_service_project(data) {
  return request({
    url: '/recruit/recruit_service_project',
    method: 'post',
    data: data
  })
}



// 批量导入其他展会服务内容
export function importbatchrecruit_service_project(data) {
  return request({
    url: '/recruit/recruit_service_project/batch/import',
    method: 'post',
    data: data
  })
}

// 修改招展服务项目
export function updateRecruit_service_project(data) {
  return request({
    url: '/recruit/recruit_service_project',
    method: 'put',
    data: data
  })
}

// 删除招展服务项目
export function delRecruit_service_project(id) {
  return request({
    url: '/recruit/recruit_service_project/' + id,
    method: 'delete'
  })
}
