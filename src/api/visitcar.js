import request from '@/utils/request'
// let prefix = '/mock/74'
let prefix = ''
/*
  接口描述：创建试跑
  请求参数：
  arrivalTime| 到仓时间
  intentionType| 意向类型
  otherReason| 备注
  lineId| 线路Id
  lineMessage| 线路信息
  driverId| 司机Id
  driverMessage| 司机信息
 */
export function CreateLntentionRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/creatIntentionRun`,
    method: 'post',
    data
  })
}
/*
  接口描述：选择司机
  请求参数：
  page| 页码
  limit| 条数
  busiType| 专车，共享
*/
export function GetDriverList(data) {
  return request({
    url: `${prefix}/carrier_center/v2/driver/getDriverNoAndNameAndSoOnList`,
    method: 'post',
    data
  })
}
/*
  接口描述：选择到仓联系人
  请求参数：
  lineId：线路Id
*/
export function GetPersonInfo(params) {
  return request({
    url: `${prefix}/line/v2/line/findPersonInfo`,
    method: 'get',
    params
  })
}
/*
  接口描述：试跑
  请求参数：
  deliveryStartDate：配送开始时间
  deliveryEndDate：配送结束时间
  status：状态
*/
export function TryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/tryRun`,
    method: 'post',
    data
  })
}
/*
  接口描述：转试跑
  请求参数：
  deliveryStartDate：配送开始时间
  deliveryEndDate：配送结束时间
  status：状态
*/
export function ToTryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/switchTryRun`,
    method: 'post',
    data
  })
}
/*
  接口描述：跟车
  请求参数：
  deliveryStartDate：配送开始时间
  deliveryEndDate：配送结束时间
  status：状态
*/
export function FollowCar(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/followCar`,
    method: 'post',
    data
  })
}
/*
  接口描述：掉线
  droppedReason：掉线原因
  droppedTime：掉线时间
  otherReason：其它原因
  status：状态
  */
export function SwitchTryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/switchDropped`,
    method: 'post',
    data
  })
}
/*
  接口描述：试跑列表
*/
export function GetRunTestInfoList(data) {
  return request({
    url: `${prefix}/waybill_center/v2/runtest/getRunTestInfoList`,
    method: 'post',
    data
  })
}
/*
  接口描述：试跑详情
  请求参数：
  runTestId：试跑在跑Id
*/
export function GetDetails(params) {
  return request({
    url: `${prefix}/waybill/v2/runtest/runDetial`,
    method: 'get',
    params
  })
}
/*
  接口描述：线路查询
*/
export function GetLine(data) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/runTestFuzzyCheck`,
    method: 'post',
    data
  })
}
/*
  接口描述：获取线路详情
  请求参数：
  lineId；线路Id
*/
export function GetLineDetail(params) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/detail`,
    method: 'get',
    params
  })
}

/*
  接口描述：创建历史试跑
  请求参数：
  lineId：线路Id
  driverId：司机Id
  deliveryStartDate：配送开始日期
  deliveryEndDate：配送结束日期
  */
export function CreateHistoryLntentionRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest//makeUpHistoryData`,
    method: 'post',
    data,
    timeout: 16000
  })
}

/*
  接口描述：创建历史试跑-线路查询
*/
export function GetLineByCreateHistoryTryRun(data) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/historyRunTestFuzzyCheck`,
    method: 'post',
    data
  })
}

/*
  接口描述：试跑在跑导出
  请求参数：
  busiType：业务类型             endDate：创建结束时间
  carType：配送车型              gmId：加盟经理
  city：客户城市                 intentionFailureType：意向失败原因Code
  customer：客户                line：线路
  driver：司机                  lineSaleId：外线销售id
  droppedReason：掉线原因        project：项目
  dutyManagerId：上岗经理        startDate：创建开始时间
  status：状态
*/
export function tryRunExport(data) {
  return request({
    url: '/waybill_center/v2/runtest/export',
    method: 'post',
    data
  })
}
/*
  接口描述：岗前叮嘱短信
  请求参数：
  arrivalTime：到仓时间
  driverName：司机姓名
  driverPhone：司机电话
  preJobAdvice：岗前叮嘱
  receptionist：到仓接待人
  receptionistPhone：到仓接待人手机号
  runTestId：试跑Id
*/
export function jobAdviceSendMessage(data) {
  return request({
    url: '/waybill_center/v2/runtest/jobAdviceSendMessage',
    method: 'post',
    data
  })
}
// 岗前叮嘱短信（已跟车）
export function followCarSendMessage(data) {
  return request({
    url: '/waybill_center/v2/runtest/followCarSendMessage',
    // url: '/mock/32/v2/line/lineInfo/detail',
    method: 'post',
    data
  })
}
/*
  接口描述：取消试跑意向 、爽约、扭头就走
  请求参数：
  reasonCode：原因
  remark：备注
  runTestId：试跑Id
*/
export function runtestIntentionCancel(data) {
  return request({
    url: '/waybill_center/v2/runtest/intention/cancel',
    method: 'post',
    data
  })
}

// 获取到仓接待人列表

export function getReceiver(params) {
  return request({
    url: '/mock/153/v2/line/lineDockingPeople/queryLineDockingPeople',
    params
  })
}
// 确认试跑意向

export function confirmTrialRunIntention(data) {
  return request({
    method: 'post',
    url: '/waybill_center/v2/runtest/confirmRunTestIntention',
    data
  })
}
// 获取所属城市的大区
export function GetOfficeCity() {
  return request({
    method: 'get',
    url: '/base/v3/base/office/queryUserIdUnderCityOffice'
    // data
  })
}
// 获取试跑角标数量
export function getTryRunNum() {
  return request({
    url: '/waybill_center/v2/runtest/countToConfirmIntentionAndArrive',
    method: 'post'
  })
}
