import request from '@/utils/request'

export function getPickList(data) {
  return request({
    url: '/item/picklist',
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

export function publishPick(data) {
  return request({
    url: '/item/publishpick',
    method: 'post',
    data
  })
}

export function claimItem(data) {
  return request({
    url: '/item/claimitem',
    method: 'post',
    data
  })
}