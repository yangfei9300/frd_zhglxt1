import request from '@/utils/request'

// 查询调查问卷观众回答列表
export function listQuestionnaire_answer(query) {
  return request({
    url: '/visitor/questionnaire_answer/list',
    method: 'get',
    params: query
  })
}

// 查询调查问卷观众回答详细
export function getQuestionnaire_answer(id) {
  return request({
    url: '/visitor/questionnaire_answer/' + id,
    method: 'get'
  })
}

// 新增调查问卷观众回答
export function addQuestionnaire_answer(data) {
  return request({
    url: '/visitor/questionnaire_answer',
    method: 'post',
    data: data
  })
}

// 修改调查问卷观众回答
export function updateQuestionnaire_answer(data) {
  return request({
    url: '/visitor/questionnaire_answer',
    method: 'put',
    data: data
  })
}

// 删除调查问卷观众回答
export function delQuestionnaire_answer(id) {
  return request({
    url: '/visitor/questionnaire_answer/' + id,
    method: 'delete'
  })
}
