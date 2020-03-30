import request from '@/utils/request'

export function getUserReturn(data) {
  return request({
    url: '/item/userreturn',
    method: 'post',
    data
  })
}

export function getUserClaim(data) {
  return request({
    url: '/item/userclaim',
    method: 'post',
    data
  })
}

