<template>
  <div>
    <div class="searchBox">
      <van-search v-model="value" placeholder="请输入搜索关键词" @focus="onSearch" />
      <div v-if="showBox" class="selectItemBox">
        <!--货物类型-->
        <van-field
          readonly
          clickable
          label="货物类型"
          :value="cargoVal"
          placeholder="选择货物类型"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            value-key="code"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <!--车型-->
        <van-field
          readonly
          clickable
          label="车型"
          :value="carVal"
          placeholder="选择车型"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns2"
            value-key="code"
            @cancel="showPicker2 = false"
            @confirm="onConfirm2"
          />
        </van-popup>
        <!--线路区域-->
        <van-field
          readonly
          clickable
          label="线路区域"
          :value="lineVal"
          placeholder="选择线路区域"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns3"
            value-key="name"
            @cancel="showPicker3 = false"
            @confirm="onConfirm3"
          />
        </van-popup>
        <van-button class="searchBtn" round type="info" @click="onCancel">
          搜索
        </van-button>
        <van-button class="searchBtn2" round type="default" @click="remove">
          重置
        </van-button>
      </div>
    </div>
    <van-overlay :show="showBox" z-index="99" @click="showBox = false" />
  </div>
</template>
<script>
import { Toast, Search, Field, Popup, Picker, Button, Overlay } from 'vant'
import { dictionary, getCityAreaByCode } from '@/api/common'
export default {
  name: 'SearchItem',
  components: {
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Button.name]: Button,
    [Overlay.name]: Overlay,
    [Search.name]: Search
  },
  data() {
    return {
      columns: [],
      columns2: [],
      columns3: [],
      showBox: false,
      value: '',
      showPicker: false,
      showPicker2: false,
      showPicker3: false,
      lineVal: '',
      lineValCode: '',
      carVal: '',
      carValCode: '',
      cargoVal: '',
      cargoValCode: '',
      optionsCity: [],
      optionsCar: [],
      optionsCargo: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let that = this;
      let cityCode = localStorage.getItem('city')
      // 工作城市
      getCityAreaByCode({
        cityCode: cityCode
      }).then(res => {
        let arr = res.data.data;
        that.columns3 = arr;
      }).catch(err => {
        Toast.fail(err);
      })
      // 意向车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        that.columns2 = arr;
      }).catch(err => {
        Toast.fail(err);
      })
      // 货物类型
      dictionary({
        dictType: 'type_of_goods'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        that.columns = arr;
      }).catch(err => {
        Toast.fail(err);
      })
    },
    onCancel() {
      this.showBox = false;
      let data = {
        findVal: this.value,
        lineVal: this.lineValCode,
        carVal: this.carValCode,
        cargoVal: this.cargoValCode
      }
      let eventLevelVariables = {
        or_input: data.findVal ? data.findVal : '',
        line_type: data.lineVal ? data.lineVal : '',
        vehicle_type: data.carVal ? data.carVal : '',
        goods_type: data.cargoVal ? data.cargoVal : ''
      }
      this.$emit('searchData', data)
      this.GLOBAL.buryPointFunction('search_complete', '线路搜索完成搜索', eventLevelVariables)
    },
    remove() {
      this.value = ''
      this.lineVal = ''
      this.lineValCode = ''
      this.carVal = ''
      this.carValCode = ''
      this.cargoVal = ''
      this.cargoValCode = ''
    },
    onSearch(val) {
      this.showBox = true;
      this.GLOBAL.buryPointFunction('search_start', '线路搜索开始搜索', {
        value: '线路搜索开始搜索'
      })
    },
    onConfirm(value) {
      this.cargoVal = value.code;
      this.cargoValCode = value.codeVal;
      this.showPicker = false;
    },
    onConfirm2(value) {
      this.carVal = value.code;
      this.carValCode = value.codeVal;
      this.showPicker2 = false;
    },
    onConfirm3(value) {
      this.lineVal = value.name;
      this.lineValCode = value.code;
      this.showPicker3 = false;
    }
  }
}
</script>
<style lang="scss">
.searchBox{
    width: 100%;
    text-align: center;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    // bottom: 0;
    // right: 0;
    // transform: translate3d(0,0,0);
    // box-shadow: 0 8px 12px #666;
    z-index: 100;
    .searchBtn{
        width:88%;
        height: 1rem;
        line-height: 1rem;
        margin: 0.4rem auto;
    }
    .searchBtn2{
        width:88%;
        height: 1rem;
        line-height: 1rem;
        margin: 0 auto 0.4rem;
    }
}
</style>
