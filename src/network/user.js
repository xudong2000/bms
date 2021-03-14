import { request } from './axios'

// 增加用户
export function addUsers(user) {
  return request({
    method: 'post',
    url: '/register',
    data: user,
  })
}

// 查询用户
export function findUsers() {
  return request({
    method: 'get',
    url: '/user',
  })
}

// 根据参数查询用户
export function findUsersByParams(key, value) {
  return request({
    method: 'get',
    url: `/findUser?${key}=${value}`,
  })
}
