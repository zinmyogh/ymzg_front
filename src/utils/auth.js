import Cookies from 'js-cookie'
// import AES from '@/api/aes'
import $Global from '@/api/global'

const TokenKey = 'Admin-Token'
// 自动登录有效时间为 1小时 { expires: expTime }
const expTime = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
// cookie过期时间，次日凌晨
const expires = new Date(new Date(new Date().getTime() + 30*24 * 60 * 60 * 1000).setHours(0, 0, 0, 0));
var curDate = new Date();

//当前时间戳
var curTamp = curDate.getTime();

//当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;

//当日已经过去的时间（毫秒）
var passedTamp = curTamp - curWeeHours;

//当日剩余时间
var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
var leftTime = new Date();
leftTime.setTime(leftTamp + curTamp);  // .toGMTString()

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAnswerToday() {
  return Cookies.set('answer', true, { expires: leftTime })
}

export function getAnswerToday() {
  return Cookies.get('answer')
}

export function removeAnswerToday() {
  return Cookies.remove('answer')
}

export function setLOgin(data) {
  return Cookies.set('_login_', data)
}

export function getLOgin() {
  return Cookies.get('_login_')
}

export function removeLOgin() {
  return Cookies.remove('_login_')
}
