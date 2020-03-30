import request from '@/utils/request'

export function getReturnList(data) {
  return request({
    url: '/item/returnlist',
    method: 'post',
    data
  })
}

export function getClaimList(data) {
  return request({
    url: 'item/claimlist',
    method: 'post',
    data
  })
}

export function getItemClass(data) {
  return request({
    url: '/item/itemclass',
    method: 'post'
  })
}