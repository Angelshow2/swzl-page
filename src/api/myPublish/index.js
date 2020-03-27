import request from '@/utils/request'

export function getUserLost(params) {
  return request({
    url: '/item/userlost',
    method: 'get',
    params
  })
}

export function getUserPick(params) {
  return request({
    url: '/item/userpick',
    method: 'get',
    params
  })
}

export function updateUserLost(data) {
  return request({
    url: '/item/updateuserlost',
    method: 'post',
    data
  })
}

export function updateUserPick(data) {
  return request({
    url: '/item/updateuserpick',
    method: 'post',
    data
  })
}

export function deleteUserLost(data) {
  return request({
    url: '/item/deleteuserlost',
    method: 'post',
    data
  })
}

export function deleteUserPick(data) {
  return request({
    url: '/item/deleteuserpick',
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