import request from '@/utils/request'

/**获取所有下级会员信息(九级)*/
export function getRelationData(data) {
  return request({
    url: '/getLowerLevelMember',
    method: 'post',
    data
  })
}

/**获取余额(查看资产)*/
export function getScoreData(data) {
  return request({
    url: '/getScore',
    method: 'post',
    data
  })
}

/**查看推荐奖(记录)*/
export function getReferalScore(data) {
  return request({
    url: '/getReferalScore',
    method: 'post',
    data
  })
}

/**查看推荐奖(记录)*/
export function getAsset(data) {
  return request({
    url: '/getAsset',
    method: 'post',
    data
  })
}

/**获取资金明细(记录)*/
export function getFunds(data) {
  return request({
    url: '/getFunds',
    method: 'post',
    data
  })
}

/**完善、修改个人信息*/
export function editOwnInfo(data) {
  return request({
    url: '/editOwnInfo',
    method: 'post',
    data
  })
}

/**获取个人信息*/
export function getOwnInfo(data) {
  return request({
    url: '/getOwnInfo',
    method: 'post',
    data
  })
}

/**获取上级信息*/
export function getReferenceInfo(data) {
  return request({
    url: '/getReferenceInfo',
    method: 'post',
    data
  })
}
