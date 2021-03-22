import request from '@/utils/request'

/**用户登录 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**用户注册 */
export function register(data) {
  return request({
    url: '/regist',
    method: 'post',
    data
  })
}

/**修改密码 */
export function editPassword(data) {
  return request({
    url: '/editPw',
    method: 'post',
    data
  })
}

/**修改nickname */
export function editNickName(data) {
  return request({
    url: '/editNickName',
    method: 'post',
    data
  })
}



