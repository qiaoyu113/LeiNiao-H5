<template>
  <div class="ListItem">
    <div @click="onDetails(item.runTestId)">
      <van-cell
        title-class="cell-title"
        value-class="cell-value"
        title="看车单类型："
        class="firstlist"
        :value="lineInfoEs.lineName"
      >
        <template #right-icon>
          <div
            :class="{
              'active-color': status_1 || status_235 || status_1_5,
              'line-name-left': true
            }"
          >
            {{ item.statusName }}
          </div>
        </template>
      </van-cell>
      <div class="detailBox">
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="需方："
          :value="driverInfoEs.driverName + '/' + driverInfoEs.driverPhone"
        >
          <template #right-icon>
            <a :href="'tel:' + 13333333" @click.stop="return false">
              <van-icon :name="phone" size="16" class="search-icon" />
            </a>
          </template>
        </van-cell>
        <!-- item.driverInfoEs.driverName + '/' + item.driverInfoEs.driverPhone -->
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="需方看车时间："
          :value="driverCarType"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="车辆编号："
          :value="warehouse"
        />
        <template>
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="供方："
            :value="driverInfoEs.driverName + '/' + driverInfoEs.driverPhone"
          >
            <template #right-icon>
              <a :href="'tel:' + 13333333" @click.stop="return false">
                <van-icon :name="phone" size="16" class="search-icon" />
              </a>
            </template>
          </van-cell>
        </template>
        <template>
          <van-cell
            title-class="cell-title"
            value-class="cell-value"
            title="供方看车时间："
            :value="driverInfoEs.driverName + '/' + driverInfoEs.driverPhone"
          />
        </template>
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="看车地点："
          :value="warehouse"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="车池经理："
          :value="lineInfoEs.lineSaleName + '/' + lineInfoEs.lineSalePhone"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="跟进人："
          :value="lineInfoEs.lineSaleName + '/' + lineInfoEs.lineSalePhone"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="看车结果："
          :value="warehouse"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="关闭原因："
          :value="warehouse"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="备注："
          :value="warehouse"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建人："
          :value="lineInfoEs.lineSaleName + '/' + lineInfoEs.lineSalePhone"
        />
        <van-cell
          title-class="cell-title"
          value-class="cell-value"
          title="创建时间："
          :value="item.createDate | parseTime('{y}-{m}-{d} {h}:{i}')"
        />
      </div>
    </div>
    <Operation :item="item" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import phone from '../../../assets/phone.png'
import Operation from './Operation';
import { confirmTrialRunIntention } from '@/api/visitcar';
// import { getLineDockingPeople } from '@/api/project'
export default {
  name: 'ListItem',
  components: {
    Operation
  },
  filters: {
    parseRelativeTime(val, isTomorrow) {
      const aa = dayjs(val)
      const bb = new Date(new Date().toLocaleDateString()).getTime()
      const ccc = 86400000
      const sub = (aa - bb) / ccc
      const aat = dayjs(val).format('HH:mm')
      const arr = ['', '昨天', '前天', '今天', '后天', '明天', '']
      if (Math.abs(sub) <= 3) {
        if (Number.parseInt(sub) === 0 && sub > 0) {
          return `${arr[3]} ${aat}`
        }
        if (sub < 0) {
          // 初始时间 是今天的第 1ms ,昨天需要加 1 或者 初始时间改为当天的最后一秒
          if (sub > -2) {
            return `${arr[Math.abs(Number.parseInt(sub)) + 1]} ${aat}`
          }
        } else {
          if (isTomorrow) {
            return aa.format('YYYY-MM-DD HH:mm')
          }
          const aaccc = arr.reverse()
          return `${aaccc[Math.abs(Number.parseInt(sub))]} ${aat}`
        }
      }
      return aa.format('YYYY-MM-DD HH:mm')
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      phone: phone
    }
  },
  computed: {
    lineInfoEs() {
      return this.item.lineInfoEs || {};
    },
    driverInfoEs() {
      return this.item.driverInfoEs || {};
    },
    warehouse() {
      const { lineInfoEs } = this.item;
      if (!lineInfoEs) return ''
      let str = ''
      if (lineInfoEs.warehouseProvinceName) {
        str = lineInfoEs.warehouseProvinceName
      }
      if (lineInfoEs.warehouseCityName) {
        str += lineInfoEs.warehouseCityName
      }
      if (lineInfoEs.warehouseCountyName) {
        str += lineInfoEs.warehouseCountyName
      }
      if (lineInfoEs.warehouseDistrict) {
        str += lineInfoEs.warehouseDistrict
      }
      return str
    },
    distribution() {
      const { lineInfoEs } = this.item;
      if (!lineInfoEs) return ''
      let str = ''
      if (lineInfoEs.provinceAreaName) {
        str = lineInfoEs.provinceAreaName
      }
      if (lineInfoEs.cityAreaName) {
        str += lineInfoEs.cityAreaName
      }
      if (lineInfoEs.countyAreaName) {
        str += lineInfoEs.countyAreaName
      }
      if (lineInfoEs.districtArea) {
        str += lineInfoEs.districtArea
      }
      return str
    },
    status_1_5() {
      return [50].includes(this.item.status)
    },
    status_1() {
      return [100].includes(this.item.status)
    },
    status_3() {
      return [300].includes(this.item.status)
    },
    status_235() {
      return [200, 300, 500].includes(this.item.status)
    },
    haveMsg_0() {
      return this.item.haveSendMessage === 0
    },
    driverCarType() {
      let a = this.driverInfoEs.driverCarTypeName
      let b = this.driverInfoEs.plateNo ? '/' + this.driverInfoEs.plateNo : ''
      return a + b
    }
  },
  methods: {
    // 跳转详情
    onDetails(id) {
      if (this.$permissionDetail('/v2/runtest/runDetial')) {
        if (this.$checkRouteIsNull(id)) {
          this.$router.push({
            path: '/try-detail',
            query: {
              id
            }
          })
        }
      }
    },
    // handelConfirmRunintention
    async handelConfirmRunintention() {
      // 获取司机接待人列表
      // const { data } = await getLineDockingPeople({
      //   projectId: this.lineInfoEs.projectId
      // })
      // if (data.data.length !== 0) {
      //   return this.isHaveCanReceptionist()
      // }
      this.$dialog.confirm({
        message: '\n\n该项目没有设置到仓接待人，\n请先完善接待人信息',
        confirmButtonText: '去完善'
      }).then(() => {
        if (this.lineInfoEs.projectId && this.lineInfoEs.projectName) {
          this.$router.push({
            path: '/projectAcceptPerson',
            query: {
              projectId: this.lineInfoEs.projectId,
              projectName: this.lineInfoEs.projectName,
              acceptPsInfo: JSON.stringify([])
            }
          })
        } else {
          return this.$toast('项目信息不存在')
        }
        // 调用接口
      }).catch(() => {
        return
      })
      // this.isHaveCanReceptionist()
    },
    // 确认试跑意向
    isHaveCanReceptionist() {
      this.$dialog.confirm({
        message: '\n\n是否确认该试跑意向'
      }).then(async() => {
        // 调用接口
        const { data } = await confirmTrialRunIntention({
          lineId: this.item.lineInfoEs.lineId,
          runTestId: this.item.runTestId,
          status: this.item.status
        })
        if (data.success) {
          this.$toast({ type: 'success',
            message: '操作成功'
          })
          setTimeout(() => {
            this.handleFreshPage()
          }, 1500)
        } else {
          this.$toast(data.errorMsg)
        }
      }).catch(() => {
        return
      })
    },
    // 确定试跑状态
    handleConfirmRunClick() {
      this.$refs.confirmTestRun.opShow = true
    },
    parseTime(start = '', end = '') {
      let aa = ''
      let bb = ''
      if (start) {
        aa = dayjs(start).format('YYYY-MM-DD')
      }
      if (end) {
        bb = '~' + dayjs(end).format('YYYY-MM-DD')
      }
      return `${aa} ${bb}`
    },
    // 发叮嘱短信
    handleSendMessageClick() {
      this.$router.push({
        path: '/pre-job-sms',
        query: {
          lineId: this.lineInfoEs.lineId,
          driverId: this.driverInfoEs.driverId,
          runTestId: this.item.runTestId,
          status: this.item.status
        }
      })
    },
    // 转试跑
    goTryRun(detail) {
      let query = {
        lineId: detail.lineInfoEs.lineId,
        driverId: detail.driverInfoEs.driverId,
        runTestId: detail.runTestId,
        status: detail.status
      };
      query.operateFlag = 'switchTryRun';
      this.$router.push({
        path: '/confirm-testRun',
        query
      })
    },
    // 转掉线
    goSwitchDropped(detail) {
      let query = {
        lineId: detail.lineInfoEs.lineId,
        driverId: detail.driverInfoEs.driverId,
        runTestId: detail.runTestId,
        status: detail.status
      };
      this.$router.push({
        path: '/off-try',
        query
      })
    },
    // 取消意向
    handleCancelTry() {
      this.$refs.cancelTestRun.show = true
      this.$refs.cancelTestRun.getReasons()
    },
    // 刷新列表
    handleFreshPage() {
      this.$emit('success')
    },
    // is red
    isRed(time, isToday = false, orTime) {
      if (!time) time = orTime
      if (!time) return false
      let currentTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      if (isToday) {
        currentTime -= 86400000
      }
      return currentTime > time
    },
    contactDriver(phone) {
      var a = document.createElement('a');
      a.href = 'tel:' + phone;
      a.click()
    }
    // async
  }
};
</script>

<style lang="less" scoped>
.ListItem {
  margin-bottom: 10px;
  padding: 0 15px 8px 15px;
  color: @text-color;
  background-color: @white;
  .detailBox{
    padding:10px;
    box-sizing: border-box;
  }
  .firstlist{
    border-bottom: 1px solid #EEEEEE;
    .van-cell__title, .van-cell__value{
      font-size: 14px !important;
      padding:12px 5px;
      box-sizing: border-box;
      font-size: 15px;
      font-weight: 600;
      color: #3C4353;
    }
    .active-color{
      padding:11px 5px;
      box-sizing: border-box;
      font-size: 13px;
      font-weight: 400;
      color: #FFA000;
    }
  }
  .title {
    height: 40px;
    line-height: normal;
    &.between {
      justify-content: space-between;
    }
    .flex-1 {
      display: flex;
      align-items: center;
      flex: 1;
    }
    .cancelTry {
      padding: 3px 5px;
      color: #188FF9;
      font-size: 14px;
    }
    .title-tag {
      margin-right: 10px;
      padding: 0 10px;
      height: 20px;
      font-size: @font-size-sm;
      color: #eff5fe;
      background: #7f8fbd;
      border-radius: 3px;
      white-space: nowrap;
      line-height: normal;
    }
    h3 {
      margin: 0;
      font-size: @font-size-md;
      font-weight: bold;
      font-size: 15px;
    }
    .line-name-icon {
      height: 19px;
      width: 19px;
      line-height: 23px;
    }
    .line-name-left {
      font-size: 13px;
      line-height: 17px;
    }
  }
  .list-tag-ct {
    margin-bottom: 7px;
  }
  .tag-item {
    padding: 0 8px;
    height: 20px;
    border-color: @tab-active-color;
    color: @tab-active-color;
    font-size: @font-size-xs-1;
    border-radius: 12px;
    line-height: normal;
    & + .tag-item {
      margin-left: 10px;
    }
  }
  .tag-item2 {
    padding: 0 8px;
    height: 20px;
    border-color: rgb(240, 77, 77);
    color: rgb(240, 77, 77);
    font-size: @font-size-xs-1;
    border-radius: 12px;
    line-height: normal;
    margin-left: 8px;
    & + .tag-item {
      margin-left: 10px;
    }
  }
  .van-cell {
    padding: 0;
    line-height: 25px;
    &::after {
      display: none;
    }
    .cell-title,
    .cell-value {
      font-size: @font-size-sm-1;
      color: @text-color;
      line-height: 23px;
      flex: none;
    }
    .cell-title {
      flex-shrink: 0;
    }
    .cell-value {
      flex: auto;
      text-align: left;
      overflow: hidden;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: ellipsis;
    }
  }
  .bottom-tag-ct {
    margin-top: 5px;
    padding-bottom: 5px;
    .bottom-tag {
      height: 24px;
      padding: 0 11px;
      font-size: @font-size-sm;
      color: #649cee;
      background: #eff5fe;
      border-radius: 3px;
      &::before {
        display: none;
      }
      & + .bottom-tag {
        margin-left: 10px;
      }
    }
  }
  .bottom {
    flex-wrap: wrap;
    .details {
      box-sizing: border-box;
      margin-top: 8px;
      position: relative;
      padding: 4px 10px;
      margin-left: 5px;
      color: #188FF9;
      &::after {
        border-radius: 100px;
        border: 1px solid #188FF9;
      }
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    .detailTag {
      background: #188FF9;
      border-radius: 24px;
      color: #ffffff;
    }
    .w90 {
      width: 90px;
    }
  }
  .active-color {
    color: #ffa000;
  }
  .active-info {
    color: #c3c2c3;
  }
  .active-wary {
    .van-cell__value span {
      color: #f22211;
    }
  }
}
</style>
