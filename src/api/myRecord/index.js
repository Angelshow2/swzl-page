import request from '@/utils/request'

export function getUserReturn(params) {
  return request({
    url: '/item/userreturn',
    method: 'get',
    params
  })
}

export function getUserClaim(params) {
  return request({
    url: '/item/userclaim',
    method: 'get',
    params
  })
}

