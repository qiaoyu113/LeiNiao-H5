import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/v1/jwt/crop/getCorpWechatToken',
    method: 'post',
    data
  })
}

export function getAgentSignature(data) {
  return request({
    url: '/wechat/v1/wechat/ticket/getAgentSignature',
    method: 'get',
    params: data
  })
}

export function getCorpSignature(data) {
  return request({
    url: '/wechat/v1/wechat/ticket/getCorpSignature',
    method: 'get',
    params: data
  })
}

export function externalUserId(data) {
  return request({
    url: '/driver/driver/match/driver/externalUserId',
    method: 'get',
    params: data
  })
}

export function marchPhone(data) {
  return request({
    url: '/driver/driver/match/driver/phone',
    method: 'post',
    data
  })
}

export function matchConfirm(data) {
  return request({
    url: '/driver/driver/match/driver/phone/confirm',
    method: 'post',
    data
  })
}

export function releaseConfirm(data) {
  return request({
    url: '/driver/driver/match/driver/id/release',
    method: 'post',
    data
  })
}

export function driverDetail(data) {
  return request({
    url: '/driver/driver/detail',
    method: 'get',
    params: data
  })
}

export function clueDetail(data) {
  return request({
    url: '/driver/driver/clue/bss/clueInfo',
    method: 'get',
    params: data
  })
}

export function clueLog(data) {
  return request({
    url: '/driver/driver/clue/log/list',
    method: 'get',
    params: data
  })
}

export function queryOrdersByDriverId(data) {
  return request({
    url: '/driver/driver/queryOrdersByDriverId',
    method: 'get',
    params: data
  })
}

export function relatedLineInformation(data) {
  return request({
    url: '/driver/driver/relatedLineInformation',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function customerDetail(token) {
  return request({
    url: '/line/line/customer/customerPool/detail',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getActivationStatus(data) {
  return request({
    url: '/driver/v1/wechat/corp/sys/getActivationStatus',
    method: 'get',
    params: data
  })
}

export function getMediaIdOfActivationQrCode(data) {
  return request({
    url: '/driver/v1/wechat/corp/getMediaIdOfActivationQrCode',
    method: 'get',
    params: data
  })
}
// -------------------------szjw 2.1-----------------------
// http://szjw-domain-base.m1.yunniao.cn/v2/base/user/updateUserPwd
// let prefix = '/mock/25'
let prefix = '/auth'
// 账号登录
export function loginByAccount(data) {
  return request({
    url: `${prefix}/v1/auth/bss/getToken`,
    method: 'post',
    data
  })
}

// 修改密码
export function updateUserPwd(data) {
  return request({
    url: '/base/v2/base/user/updateUserPwd',
    method: 'post',
    data
  })
}
