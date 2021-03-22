import request from '@/utils/request'

/**获取主页广告图(3张)*/
export function getHomePageImage(data) {
  return request({
    url: '/getHomePageImage',
    method: 'post',
    data
  })
}

/**获取链接*/
export function getLink(data) {
  return request({
    url: '/getLink',
    method: 'post',
    data
  })
}

/**获取公告*/
export function getBulletin(data) {
  return request({
    url: '/getBulletin',
    method: 'post',
    data
  })
}