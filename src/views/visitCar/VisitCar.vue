<template>
  <div class="VisitCar">
    <div class="top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <div
            v-permission="['/v2/runtest/export']"
            class="checkStyle navBarTit"
            @click="onAdd"
          >
            新建
          </div>
        </template>
      </van-nav-bar>
      <van-search
        v-permission="['/v2/runtest/getRunTestInfoList']"
        readonly
        show-action
        shape="round"
        placeholder="请输入看车单编号"
        @click="onSearch"
      >
        <template #action>
          <div class="search" @click="showPopup = true">
            筛选
          </div>
        </template>
      </van-search>
      <van-tabs v-model="form.status" line-width="20px" title-inactive-color="#838383" title-active-color="#188FF9" color="#188FF9" @click="handleTabChange">
        <van-tab
          v-for="(item, index) in tabArrs"
          :key="index"
          :name="item.name"
        >
          <template #title>
            {{ item.title }}
            <div v-if="item.total" class="van-info">
              {{ item.total }}
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="list trylist">
      <!-- 下拉刷新  上拉加载 -->
      <van-pull-refresh v-model="refreshing" @refresh="onLoad(true)">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <ListItem
            v-for="(item, index) in lists"
            :key="index"
            :item="item"
            @success="onLoad(true)"
          />
        </van-list>
      </van-pull-refresh>
    </div>
    <SelfPopup
      :show.sync="showPopup"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="车辆编号"
        placeholder="请输入"
      />
      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="需方"
        placeholder="请输入姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />
      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="供方"
        placeholder="请输入公司名称/姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />
      <van-cell-group class="typeStyle">
        <van-cell title="类型">
          <template #title>
            <span class="custom-title">类型</span>
            <span class="typeBox">
              <van-tag :plain="true" type="primary" size="large">租赁</van-tag>
              <van-tag :plain="true" type="primary" size="large">售车</van-tag>
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="创建人"
        placeholder="请输入姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />
      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="车池经理"
        placeholder="请输入姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />

      <van-field
        v-model.trim="form.customer"
        colon
        name="customer"
        label-width="7em"
        label="跟进人"
        placeholder="请输入姓名/手机号"
        :rules="[
          { validator: validatorValue, message: '请输入6位及以上数字或2位及以上非纯数字' }
        ]"
      />
      <van-field
        readonly
        clickable
        colon
        label-width="7em"
        is-link
        label="车池归属城市"
        name="city"
        :value="pickerNames.city"
        placeholder="请选择"
        @click="showPickerFn('city')"
      />
      <van-field
        readonly
        colon
        clickable
        label="创建时间"
        label-width="7em"
        is-link
        name="date"
        :value="pickerNames.date"
        placeholder="请选择"
        @click="showCalendar = true"
      />
    </SelfPopup>
    <!-- 日历 -->
    <van-calendar
      v-model="showCalendar"
      type="range"
      color="#188FF9"
      :min-date="minDate"
      :max-data="maxDate"
      :allow-same-day="true"
      @confirm="onConfirm"
    />

    <!-- picker -->
    <Suggest
      v-model="showModal"
      :options="options"
      :type="modalKey"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />

    <!-- picker -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :value-key="pickerKey === 'city' ? 'name' : 'dictLabel'"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmPicker"
      />
    </van-popup>
    <!-- picker -->
    <van-popup v-model="showPickerCity" round position="bottom">
      <van-picker
        show-toolbar
        :value-key="'name'"
        :columns="cityList"
        @cancel="showPickerCity = false"
        @confirm="onConfirmPickerCity"
      />
    </van-popup>

    <van-action-sheet
      v-model="showOp"
      :actions="actionsOp | isPermission"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
  </div>
</template>

<script>
import { GetDictionaryList, getOpenCitys, GetSpecifiedRoleList } from '@/api/common';
import { GetRunTestInfoList, tryRunExport } from '@/api/visitcar';
import SelfPopup from '@/components/SelfPopup';
import ListItem from './components/ListItem';
import Suggest from '@/components/SuggestSearch'

import { parseTime, HandlePages } from '@/utils';
import { validatorValue } from '@/utils/validate';
export default {
  name: 'VisitCar',
  components: {
    SelfPopup,
    ListItem,
    Suggest
  },
  data() {
    return {
      showModal: false, // 筛选项的picker
      options: [],
      modalKey: '',

      showOp: false,
      scrollTop: 0,
      showSuggest: true,
      tabArrs: [
        {
          title: '全部',
          total: 0,
          name: ''
        },
        {
          title: '待供方确认',
          total: 0,
          name: 50 // 待补充接口
        },
        {
          title: '待需方确认',
          total: 0,
          name: 100
        },
        {
          title: '待到场看车',
          total: 0,
          name: 300
        },
        {
          title: '看车完成',
          total: 0,
          name: 200
        },
        {
          title: '已关闭',
          total: 0,
          name: 500
        }
      ],
      actionsOp: [
        {
          name: '创建历史试跑',
          value: 1,
          pUrl: ['/v2/runtest/makeUpHistoryData']
        },
        {
          name: '创建试跑意向',
          value: 2,
          pUrl: ['/v2/runtest/creatIntentionRun']
        }
      ],
      // lists
      lists: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      // search
      form: {
        city: '', // 客户城市
        customer: '', // 客户
        project: '', // 项目
        line: '', // 线路
        carType: '', // 配送车型
        driver: '', // 司机
        droppedReason: '', // 掉线原因
        startDate: '', // 创建开始时间
        endDate: '', // 创建结束时间
        status: '', // 状态
        gmId: '', // 加盟经理
        dutyManagerId: '', // 客户维护经理
        lineSaleId: '', // 外线销售id
        busiType: '', // 业务类型
        intentionFailureType: '' // 意向失败原因Code
      },
      page: {
        current: 0,
        limit: 20,
        total: 0
      },
      pickerNames: {
        city: '',
        carType: '',
        droppedReason: '',
        date: '',
        gmId: '',
        dutyManagerId: '',
        lineSaleId: '',
        busiType: '',
        intentionFailureType: ''
      },
      // picker
      minDate: new Date(+new Date() - 86400000 * 365),
      maxDate: new Date(+new Date() + 86400000 * 365),
      showPopup: false,
      showPicker: false,
      showPickerCity: false,
      showCalendar: false,
      pickerKey: '',
      columns: [],
      carList: [], // 配送车型
      whyList: [], // 掉线原因
      cityList: [], // 掉线原因

      gmIdList: [], // 加盟经理
      dutyManagerIdList: [], // 客户维护经理
      lineSaleIdList: [], // 外线销售id
      busiTypeList: [
        { dictLabel: '专车', dictValue: 0 },
        { dictLabel: '共享', dictValue: 1 }
      ], // 业务类型
      intentionFailureTypeList: [], // 意向失败原因Code

      isShowExport: false,
      allTotal: 0

    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  activated() {
    this.$bus.$once('update', (msg) => {
      console.log('undata')
      if (msg) {
        this.lists = [];
        this.scrollTop = 0;
        this.onLoad(true)
      }
    });
    // this.$bus.$emit('update', 1)
  },
  mounted() {
    // 请求字典
    this.fetchData();
  },
  // 回来后还原
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('.trylist').scrollTop = vm.scrollTop
    })
  },
  // 离开前保存高度
  beforeRouteLeave(to, from, next) {
    this.scrollTop = document.querySelector('.trylist').scrollTop
    // console.log('undata')
    next()
  },
  methods: {
    // 正则验证
    validatorValue,
    handleShowModal(key) {
      this.modalKey = key
      this.options = []
      if (this.modalKey === 'gmId') {
        this.getGmIdList()
      } else if (this.modalKey === 'dutyManagerId') {
        this.getDutyManagerIdList()
      } else if (this.modalKey === 'lineSaleId') {
        this.getLineSaleIdList()
      }
      this.showModal = true
    },
    // 模糊搜索
    handleSearchChange(value) {
      if (this.modalKey === 'gmId') {
        this.getGmIdList(value)
      } else if (this.modalKey === 'dutyManagerId') {
        this.getDutyManagerIdList(value)
      } else if (this.modalKey === 'lineSaleId') {
        this.getLineSaleIdList(value)
      }
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      this.form[obj.type] = obj.code
      this.pickerNames[obj.type] = obj.name
    },
    /**
     * 获取加盟经理
     */
    getGmIdList(keyword) {
      let params = {
        keyword,
        'roleTypes': [1],
        'uri': '/v2/runtest/queryGm'
      }
      GetSpecifiedRoleList(params)
        .then(({ data }) => {
          if (data.success) {
            this.options = data.data.map(ele => {
              return { name: ele.name, code: ele.id, label: ele.name + ' ' + ele.mobile, value: ele.id }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取客户维护经理
     */
    getDutyManagerIdList(keyword) {
      let params = {
        keyword,
        'roleTypes': [3],
        'uri': '/v2/runtest/queryDuty'
      }
      GetSpecifiedRoleList(params)
        .then(({ data }) => {
          if (data.success) {
            this.options = data.data.map(ele => {
              return { name: ele.name, code: ele.id, label: ele.name + ' ' + ele.mobile, value: ele.id }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取外销销售
     */
    getLineSaleIdList(keyword) {
      let params = {
        keyword,
        'roleTypes': [2],
        'uri': '/v2/runtest/queryLineSale'
      }
      GetSpecifiedRoleList(params)
        .then(({ data }) => {
          if (data.success) {
            this.options = data.data.map(ele => {
              return { name: ele.name, code: ele.id, label: ele.name + ' ' + ele.mobile, value: ele.id }
            })
          } else {
            this.$toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 请求字典接口
     */
    fetchData() {
      GetDictionaryList(['Intentional_compartment', 'dropped_reason', 'intention_failure_reason'])
        .then(({ data }) => {
          if (data.success) {
            data.data.dropped_reason.push({
              dictLabel: '数据迁移掉线',
              dictValue: '6'
            })
            data.data.dropped_reason.push({
              dictLabel: '创建历史试跑',
              dictValue: '7'
            })
            this.carList = data.data.Intentional_compartment;
            this.whyList = data.data.dropped_reason.filter(item => item.id !== 857)
            this.intentionFailureTypeList = data.data.intention_failure_reason
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getOpenCitys({})
        .then(({ data }) => {
          if (data.success) {
            this.cityList = data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 初始化数据
     */
    async onLoad(isInit = false) {
      if (isInit === true) {
        // 下拉刷新
        this.page.current = 1;
        this.lists = [];
      } else {
        // 上拉加载更多
        this.page.current++;
      }
      this.loading = true;
      setTimeout(async() => {
        let result = await this.getLists(isInit);
        if (result) {
          this.lists = result.lists;
        }
        if (isInit === true) {
        // 下拉刷新
          this.refreshing = false;
          this.finished = false;
        } else {
        // 上拉加载更多
          this.loading = false;
          if (result) {
            if (!result.hasMore) {
              this.finished = true;
            }
          }
        }
      })
    },
    /**
     * 处理参数
     */
    delForm(form) {
      let obj = {};
      Object.keys(form).forEach((key) => {
        if (form[key] !== '') {
          obj[key] = form[key];
        }
      });
      return obj;
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      this.onLoad(true);
    },
    /**
     * 日期选择
     */
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      let startDate = parseTime(start, '{y}-{m}-{d}');
      let endDate = parseTime(end, '{y}-{m}-{d}');
      this.pickerNames.date = `${startDate} - ${endDate}`;
      this.form.startDate = +new Date(start.setHours(0, 0, 0, 0))
      this.form.endDate = +new Date(end.setHours(23, 59, 59, 999))
    },
    /**
     * 提交查询
     */
    async onSubmit(value) {
      // if (!validatorValue(value.driver)) {
      //   this.$notify('错误文案');
      //   return
      // }
      this.lists = [];
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
      this.showPopup = false
    },
    // 是否更多数据
    isModeData() {
      if (this.lists.length === 0) {
        this.finished = true
      } else {
        this.finished = false
      }
    },
    /**
     * 重置form
     */
    onReset(form) {
      this.form = this.$options.data().form;
      this.pickerNames = this.$options.data().pickerNames;
      form.resetValidation();
    },
    /**
     * picker 选择
     */
    onConfirmPicker(value) {
      this.pickerNames[this.pickerKey] = value.dictLabel;
      this.form[this.pickerKey] = value.dictValue;
      this.showPicker = false;
    },
    /**
     * picker city 选择
     */
    onConfirmPickerCity(value) {
      this.pickerNames[this.pickerKey] = value.name;
      this.form[this.pickerKey] = value.code;
      this.showPickerCity = false;
    },
    onSelect(item) {
      let activeIndex = item.value;
      this.showOp = false
      //  创建历史试跑
      setTimeout(() => {
        if (activeIndex === 1) {
          this.$router.push('/create-history-run');
        } else if (activeIndex === 2) { // 创建试跑
          this.$router.push('/create-run');
        }
      }, 350)
    },
    /**
     * 显示picker
     */
    showPickerFn(key) {
      this.pickerKey = key;
      switch (key) {
        case 'carType':
          this.columns = this.carList;
          break;
        case 'droppedReason':
          this.columns = this.whyList;
          break;
        case 'busiType':
          this.columns = this.busiTypeList;
          break;
        case 'intentionFailureType':
          this.columns = this.intentionFailureTypeList;
          break;
        case 'city':
          this.showPickerCity = true;
          break;
        default:
          break;
      }
      if (key === 'city') return;
      this.showPicker = true;
    },
    /**
     * 跳转查询页面
     */
    onSearch() {
      this.$router.push('/try-search');
    },
    /**
     *返回按钮
     */
    onClickLeft() {
      this.$router.go(-1);
    },

    // 状态切换
    async handleTabChange(tab) {
      this.lists = [];
      this.page.current = 1
      let result = await this.getLists(true)
      this.lists = result.lists
      this.isModeData()
    },
    // 获取列表
    async getLists(isInit) {
      try {
        this.error = false
        const params = this.delForm(this.form);
        params.page = this.page.current;
        params.limit = this.page.limit;

        let { data: res } = await GetRunTestInfoList(params);
        if (res.success) {
          HandlePages(res.page)
          !res.data && (res.data = [])
          let newLists = res.data;
          if (!isInit) {
            newLists = this.lists.concat(newLists);
          }
          let result = {
            lists: newLists,
            // hasMore: res.page.total > newLists.length
            hasMore: res.data.length === this.page.limit
          };
          this.tabArrs.forEach((item) => {
            if (item.name === this.form.status) {
              item.total = res.page.total;
            } else {
              item.total = 0;
            }
          });
          this.allTotal = res.page.total
          return result;
        } else {
          this.page.current--;
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.finished = true;
          this.$toast.fail(res.errorMsg);
        }
      } catch (err) {
        this.page.current--;
        this.loading = false;
        this.error = true;
        this.refreshing = false;
        this.finished = true;
        console.log(`get list fail:${err}`);
      }
    },
    // 新建
    onAdd() {
      this.$router.push({
        path: '/try-detail'
      })
    },
    // 试跑导出
    async tryRunExportSure() {
      try {
        this.$loading(true)
        const { data } = await tryRunExport(this.form)
        if (data.success) {
          this.$toast.success('导出成功')
        } else {
          this.$toast.fail('导出失败')
        }
      } catch (error) {
        return error
      } finally {
        this.$loading(false)
      }
    }
  }
};
</script>
<style lang="less" scoped>
.VisitCar {
  display: flex;
  flex-direction: column;
  background: @body-bg;
  .van-search{
    background: #fff;
    padding: 5px 5px 5px 15px;
  }
  .van-search__content{
    border-radius: 25px;
    box-shadow: none;
    background: #F3F3F3;
  }
  .rWith {
    width: auto;
    white-space: nowrap;
  }
  .right-btn {
      position: relative;
      padding-right: 5px;
      &.open {
        &::after {
          margin-top: -1px;
          transform: rotate(135deg);
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4px;
        margin-top: -5px;
        border: 3px solid;
        border-color: transparent transparent @white @white;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  .top {
    margin-bottom: 5px;
    background-color: @body-bg;
  }
  .list {
    flex: 1;
    overflow: auto;
  }
  .navBarTit {
    color: @white;
  }
  .mR5 {
    margin-right: 5px;
  }
  .search {
    position: relative;
    padding-right: 20px;
    &::after {
      position: absolute;
      top: 50%;
      right: 5px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent @text-color @text-color;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 1;
      content: '';
    }
  }
  .noData {
    margin-top: 41.5px;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height: 74px;
    }
  }
  .export-dialog {
    font-size: 16px;
    padding: 25px 30px 0 30px;
    width: 70%;
  }
}
.blue {
  color: #6e9ee8;
}
.checkStyle:active {
  opacity: 0.7 !important;
}
.typeStyle::after{
  border-top: none;
}
.typeBox{
  padding-left:70px;
  span{
    color: #ffffff;
    margin-right: 10px;
  }
  .van-tag--plain{
    color: #4A4A4A;
  }
}
</style>
<style lang="less" scoped>
/deep/.van-dialog__footer {
  padding-left: 20px !important;
  padding-right: 20px !important;
}

/deep/ .van-nav-bar__right:active {
  opacity: 1;
}

/deep/ .van-tabs__wrap{
  height: 35px;
}
</style>

