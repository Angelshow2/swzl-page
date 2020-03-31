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

export function cancelReturn(data) {
  return request({
    url: '/item/cancelreturn',
    method: 'post',
    data
  })
}

export function cancelClaim(data) {
  return request({
    url: '/item/cancelclaim',
    method: 'post',
    data
  })
}

export function returnSucceed(data) {
  return request({
    url: '/item/returnsucceed',
    method: 'post',
    data
  })
}

export function claimSucceed(data) {
  return request({
    url: '/item/claimsucceed',
    method: 'post',
    data
  })
}