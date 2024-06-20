import request from '@/utils/request'

// 查询调查问卷选项列表
export function listQuestionnaire_option(query) {
  return request({
    url: '/survey/questionnaire_option/list',
    method: 'get',
    params: query
  })
}

// 查询调查问卷选项详细
export function getQuestionnaire_option(id) {
  return request({
    url: '/survey/questionnaire_option/' + id,
    method: 'get'
  })
}

// 新增调查问卷选项
export function addQuestionnaire_option(data) {
  return request({
    url: '/survey/questionnaire_option',
    method: 'post',
    data: data
  })
}

// 修改调查问卷选项
export function updateQuestionnaire_option(data) {
  return request({
    url: '/survey/questionnaire_option',
    method: 'put',
    data: data
  })
}

// 删除调查问卷选项
export function delQuestionnaire_option(id) {
  return request({
    url: '/survey/questionnaire_option/' + id,
    method: 'delete'
  })
}
