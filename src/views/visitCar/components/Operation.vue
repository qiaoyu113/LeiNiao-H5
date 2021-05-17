<template>
  <div class="Operation">
    <!-- 试跑意向 -->
    <div
      class="bottom van-hairline--top flex align-center justify-end"
    >
      <template>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details van-hairline--surround"
          @click.stop="goDispatch"
        >
          分配
        </div>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details detailTag"
          @click.stop="handleCancelVisit(item)"
        >
          需方取消看车
        </div>
      </template>
      <template>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details van-hairline--surround"
          @click.stop="goDispatch"
        >
          分配
        </div>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details detailTag"
          @click.stop="handleCancelVisit(item)"
        >
          需方取消看车
        </div>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details detailTag"
          @click.stop="goCheck"
        >
          需方确认看车
        </div>
      </template>
      <template>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details van-hairline--surround"
          @click.stop="goDispatch"
        >
          分配
        </div>
        <div
          v-permission="['/v2/line/lineDockingPeople/queryLineDockingPeople']"
          class="details detailTag"
          @click.stop="goDetail(item)"
        >
          调整看车信息
        </div>
        <van-popover
          v-model="showPopover2"
          placement="top"
          theme="dark"
          trigger="click"
          :actions="actions2"
          @select="onSelect2"
        >
          <template #reference>
            <van-button type="primary" class="details detailTag">
              看车完成
            </van-button>
          </template>
        </van-popover>
        <van-popover
          v-model="showPopover"
          placement="top"
          theme="dark"
          trigger="click"
          :offset="[-20,0]"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-button type="primary" class="details detailTag">
              爽约
            </van-button>
          </template>
        </van-popover>
      </template>
    </div>
    <!-- 爽约 -->
    <Dispatch :show="showPicker" @hidden="hiddenDispathch" />
    <!-- 需方取消看车 -->
    <Cancel
      ref="cancelVisited"
      :item="item"
      :cancel-type="cancelType"
      @success="handleFreshPage"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Cancel from './dialog/cancel'
// import { confirmTrialRunIntention } from '@/api/visitcar';
import Dispatch from './dialog/dispatch'
export default {
  name: 'Operation',
  components: {
    Cancel,
    Dispatch
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
      showPicker: false,
      showPopover: false,
      actions: [{ text: '需方爽约', value: 1 }, { text: '供方爽约', value: 0 }],
      showPopover2: false,
      actions2: [{ text: '已看中', value: 1 }, { text: '未看中', value: 0 }],
      cancelType: ''
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
    // 分配
    goDispatch() {
      this.showPicker = true
      console.log(this.item)
    },
    // 分配picker关闭
    hiddenDispathch(res) {
      this.showPicker = res
    },
    // 看车完成
    onSelect2(action) {
      if (action.value) {
        this.$dialog.confirm({
          title: '提示',
          message: '确定本次看车结果为已看中吗？',
          confirmButtonText: '确定'
        }).then(() => {
        // 跳转路由
          if (this.item.projectId && this.item.projectName) {
            this.$router.push({
              path: '/projectAcceptPerson',
              query: {
                projectId: this.item.projectId,
                projectName: this.item.projectName,
                acceptPsInfo: JSON.stringify([])
              }
            })
          } else {
            return this.$toast('项目信息不存在')
          }
        }).catch(() => {
          return false
        })
      } else {
        this.cancelType = '1'
        this.$refs.cancelVisited.show = true
      }
    },
    // 爽约
    onSelect(action) {
      if (action.value) {
        // 需方
        this.cancelType = '2'
        this.$refs.cancelVisited.show = true
      } else {
        // 供方
        this.cancelType = '3'
        this.$refs.cancelVisited.show = true
      }
    },
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
    // 取消意向
    handleCancelVisit() {
      console.log(this.$refs.cancelVisited)
      this.cancelType = ''
      this.$refs.cancelVisited.show = true
      // this.$refs.cancelVisited.getReasons()
    },
    // 刷新列表
    handleFreshPage() {
      this.$emit('success')
    },
    // 确认看车
    goCheck() {
      // this.$router.push({
      //   path: '/off-try',
      //   query
      // })
    },
    // 查看看车信息
    goDetail() {
      // this.$router.push({
      //   path: '/off-try',
      //   query
      // })
    }
  }
};
</script>

<style lang="less" scoped>
  .Operation{
    .van-button{
      height: 23px;
      line-height: 23px;
      border: none;
      font-size: 14px;
      margin: 8px 0 0 5px !important;
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
      padding: 2px 16px;
      margin-left: 5px;
      color: #188FF9;
      background: #E6F3FF;
      border-radius: 100px;
      font-size: 14px;
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
</style>
