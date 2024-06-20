import request from '@/utils/request'

// 查询调查问卷问题列表
export function listQuestionnaire_question(query) {
  return request({
    url: '/survey/questionnaire_question/list',
    method: 'get',
    params: query
  })
}

// 查询调查问卷问题详细
export function getQuestionnaire_question(id) {
  return request({
    url: '/survey/questionnaire_question/' + id,
    method: 'get'
  })
}

// 新增调查问卷问题
export function addQuestionnaire_question(data) {
  return request({
    url: '/survey/questionnaire_question',
    method: 'post',
    data: data
  })
}

// 修改调查问卷问题
export function updateQuestionnaire_question(data) {
  return request({
    url: '/survey/questionnaire_question',
    method: 'put',
    data: data
  })
}

// 删除调查问卷问题
export function delQuestionnaire_question(id) {
  return request({
    url: '/survey/questionnaire_question/' + id,
    method: 'delete'
  })
}
