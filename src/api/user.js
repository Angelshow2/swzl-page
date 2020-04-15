import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getDepartList(data) {
  return request({
    url: '/user/departlist',
    method: 'post'
  })
}

export function getMajorList(data) {
  return request({
    url: '/user/majorlist',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/item/userinfo',
    method: 'post',
    data
  })
}


export function resetPwd(data) {
  return request({
    url: '/item/resetpwd',
    method: 'post',
    data
  })
}


// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }



