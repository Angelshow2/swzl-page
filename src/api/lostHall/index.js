import request from '@/utils/request'

export function getLostList(data) {
  return request({
    url: '/item/lostlist',
    method: 'post',
    data
  })
}

export function getItemClass(data) {
  return request({
    url: '/item/itemclass',
    method: 'get'
  })
}

export function publishLost(data) {
  return request({
    url: '/item/publishlost',
    method: 'post',
    data
  })
}