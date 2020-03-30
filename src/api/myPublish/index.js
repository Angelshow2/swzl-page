import request from '@/utils/request'

export function getUserLost(data) {
  return request({
    url: '/item/userlost',
    method: 'post',
    data
  })
}

export function getUserPick(data) {
  return request({
    url: '/item/userpick',
    method: 'post',
    data
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
    method: 'post'
  })
}