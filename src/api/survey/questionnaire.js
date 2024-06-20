import request from '@/utils/request'

// 查询调查问卷列表
export function listQuestionnaire(query) {
  return request({
    url: '/survey/questionnaire/list',
    method: 'get',
    params: query
  })
}

// 查询调查问卷详细
export function getQuestionnaire(id) {
  return request({
    url: '/survey/questionnaire/' + id,
    method: 'get'
  })
}

// 新增调查问卷
export function addQuestionnaire(data) {
  return request({
    url: '/survey/questionnaire',
    method: 'post',
    data: data
  })
}

// 修改调查问卷
export function updateQuestionnaire(data) {
  return request({
    url: '/survey/questionnaire',
    method: 'put',
    data: data
  })
}

// 删除调查问卷
export function delQuestionnaire(id) {
  return request({
    url: '/survey/questionnaire/' + id,
    method: 'delete'
  })
}
