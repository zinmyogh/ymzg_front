import request from '@/utils/request'

/**获取题目*/
export function getTopic(data) {
  return request({
    url: '/getTopic',
    method: 'post',
    data
  })
}

/**答题*/
export function postAnswer(data) {
  // console.log(data, 'post answer')
  return request({
    url: '/answer',
    method: 'post',
    data
  })
}

/**签到*/
export function postSign(data) {
  return request({
    url: '/sign',
    method: 'post',
    data
  })
}

/**获取首页广播图(3张)*/
export function getFirstPageImage(data) {
  return request({
    url: '/getFirstPageImage',
    method: 'post',
    data
  })
}

/**获取首页广播图(3张)*/
export function getDownload(data) {
  return request({
    url: '/download',
    method: 'get',
    data
  })
}

/**获取登录广告图(1张)*/
export function getLoginImage() {
  // console.log(data)
  return request({
    url: '/getLoginImage',
    method: 'post'
  })
}

/**获取登录广告图(1张)*/
export function getAppImage () {
  // console.log(data)
  return request({
    url: '/getAppImage ',
    method: 'post'
  })
}

/**获取登录广告图(1张)*/
export function getImage (data) {
  // console.log(data)
  return request({
    url: '/getImage ',
    method: 'post',
    data
  })
}