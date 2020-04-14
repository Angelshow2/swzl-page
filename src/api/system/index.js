import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/item/userlist',
    method: 'post',
    data
  })
}

export function getAuthList() {
  return request({
    url: '/item/authlist',
    method: 'post'
  })
}

export function setAdmin(data) {
  return request({
    url: '/item/setadmin',
    method: 'post',
    data
  })
}

export function cancelAdmin(data) {
  return request({
    url: '/item/canceladmin',
    method: 'post',
    data
  })
}

export function startATop(data) {
  return request({
    url: '/item/startatop',
    method: 'post',
    data
  })
}

export function initPwd(data) {
  return request({
    url: '/item/initpwd',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/item/deleteuser',
    method: 'post',
    data
  })
}

export function getAllLostList(data) {
  return request({
    url: '/item/alllostlist',
    method: 'post',
    data
  })
}

export function getAllPickList(data) {
  return request({
    url: '/item/allpicklist',
    method: 'post',
    data
  })
}

export function deleteLost(data) {
  return request({
    url: '/item/admindeletelost',
    method: 'post',
    data
  })
}

export function deletePick(data) {
  return request({
    url: '/item/admindeletepick',
    method: 'post',
    data
  })
}

export function newDepart(data) {
  return request({
    url: '/item/newdepart',
    method: 'post',
    data
  })
}

export function newMajor(data) {
  return request({
    url: '/item/newmajor',
    method: 'post',
    data
  })
}

export function editDepart(data) {
  return request({
    url: '/item/editdepart',
    method: 'post',
    data
  })
}

export function editMajor(data) {
  return request({
    url: '/item/editmajor',
    method: 'post',
    data
  })
}

export function deleteDepart(data) {
  return request({
    url: '/item/deletedepart',
    method: 'post',
    data
  })
}

export function deleteMajor(data) {
  return request({
    url: '/item/deletemajor',
    method: 'post',
    data
  })
}

export function addClass(data) {
  return request({
    url: '/item/addclass',
    method: 'post',
    data
  })
}

export function editClass(data) {
  return request({
    url: '/item/editclass',
    method: 'post',
    data
  })
}

export function deleteClass(data) {
  return request({
    url: '/item/deleteclass',
    method: 'post',
    data
  })
}