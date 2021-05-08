import request from '@/utils/request'

let prefix = '/line_center'

/* 查询各种状态及所有待办总条数-H5 */
export function getLineShelfAllStatusAndTotalNum(params) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/queryLineShelfAllStatusAndTotalNum`,
    method: 'get',
    params
  })
}

/* 查询待办列表-H5 */
export function getLineShelfInfo(data) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/queryLineShelfInfo`,
    method: 'post',
    data
  })
}

/* 批量忽略待办 */
export function getBatchIgnoreToDo(params, data) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/batchIgnoreToDo`,
    method: 'post',
    params,
    data
  })
}

/* 批量下架待办  */
export function getBatchShelfToDo(params, data) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/batchShelfToDo`,
    method: 'post',
    params,
    data
  })
}

/* 线路货架查询线路基本信息快照 */
export function getLineShelfSnapshot(data) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/getLineShelfSnapshot`,
    method: 'get',
    params: data
  })
}

/* 是否弹出项目策展编辑页面  */
export function popUpProjectCurationEdit(params) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/popUpProjectCurationEdit`,
    method: 'get',
    params: params
  })
}

/* 获取线路运营手机号  */
export function getLineOperationPhone(params) {
  return request({
    url: `${prefix}/v3/line/shelf/maintenance/getLineOperationPhone`,
    method: 'get',
    params
  })
}
