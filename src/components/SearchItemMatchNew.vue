<template>
  <div>
    <div class="searchBoxNew">
      <!-- <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" @close="dropClick" />
      </van-dropdown-menu> -->
      <div class="menuBox" @click="showBox = true">
        {{ optionsVal }} <van-icon name="arrow-down" color="#C7C7CC" size="12" />
      </div>
      <div v-if="showBox">
        <div v-if="searchBox_type == 2">
          <van-search v-model="value" placeholder="请输入线路关键词" input-align="center" @blur="onCancel" />
          <div class="searchText">
            过滤条件
          </div>
          <div v-if="showBox" class="selectItemBox">
            <!--车型-->
            <!-- <van-field
            readonly
            clickable
            label="车型"
            :value="carVal"
            placeholder="所需车型"
            @click="showPicker2 = true"
          /> -->
            <van-popup v-model="showPicker2" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns2"
                value-key="code"
                @cancel="showPicker2 = false"
                @confirm="onConfirm2"
              />
            </van-popup>
            <van-cell-group>
              <van-cell title="车型" is-link :value="carVal" @click="showPicker2 = true" />
            </van-cell-group>
            <!--货物类型-->
            <!-- <van-field
            readonly
            clickable
            label="货物类型"
            :value="cargoVal"
            placeholder="货物类型"
            @click="showPicker = true"
          /> -->
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                value-key="code"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
            <van-cell-group>
              <van-cell title="货物类型" is-link :value="cargoVal" @click="showPicker = true" />
            </van-cell-group>
            <!--到仓区域-->
            <!-- <van-field
            readonly
            clickable
            label="到仓区域"
            :value="lineVal"
            placeholder="到仓区域"
            @click="showPicker3 = true"
          /> -->
            <van-popup v-model="showPicker3" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns3"
                value-key="name"
                @cancel="showPicker3 = false"
                @confirm="onConfirm3"
              />
            </van-popup>
            <van-cell-group>
              <van-cell title="到仓区域" is-link :value="lineVal" @click="showPicker3 = true" />
            </van-cell-group>
            <!--配送区域-->
            <!-- <van-field
            readonly
            clickable
            label="配送区域"
            :value="diliverVal"
            placeholder="配送区域"
            @click="showPicker6 = true"
          /> -->
            <van-popup v-model="showPicker6" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns3"
                value-key="name"
                @cancel="showPicker6 = false"
                @confirm="onConfirm6"
              />
            </van-popup>
            <van-cell-group>
              <van-cell title="配送区域" is-link :value="diliverVal" @click="showPicker6 = true" />
            </van-cell-group>
            <!--装卸难度-->
            <!-- <van-field
            readonly
            clickable
            label="装卸难度"
            :value="difficultyVal"
            placeholder="装卸难度"
            @click="showPicker4 = true"
          /> -->
            <van-popup v-model="showPicker4" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns4"
                value-key="code"
                @cancel="showPicker4 = false"
                @confirm="onConfirm4"
              />
            </van-popup>
            <van-cell-group>
              <van-cell title="装卸难度" is-link :value="difficultyVal" @click="showPicker4 = true" />
            </van-cell-group>
          <!--出车时段-->
          <!-- <van-field
            readonly
            clickable
            label="出车时段"
            :value="timeVal"
            placeholder="出车时段"
            @click="showPicker5 = true"
          />
          <van-popup v-model="showPicker5" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns5"
              value-key="code"
              @cancel="showPicker5 = false"
              @confirm="onConfirm5"
            />
          </van-popup> -->
          <!-- <van-button class="searchBtn" round type="info" @click="onCancel">
            搜索
          </van-button>
          <van-button class="searchBtn2" round type="default" @click="remove">
            重置
          </van-button> -->
          </div>
        </div>
        <div class="searchBox-bottom">
          <div :class="searchBox_type === 1 ? 'searchBox_btn checkBtn' : 'searchBox_btn'" @click="changeSearch(1, '智能匹配', true)">
            智能匹配
          </div>
          <div :class="searchBox_type === 2 ? 'searchBox_btn checkBtn' : 'searchBox_btn'" @click="changeSearch(2, '条件搜索', false)">
            条件搜索
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="showBox" z-index="99" @click="showBox = false;" />
  </div>
</template>
<script>
import { Toast, Search, Field, Popup, Picker, Button, Overlay, DropdownMenu, DropdownItem, Icon, Cell, CellGroup } from 'vant'
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
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Search.name]: Search
  },
  data() {
    return {
      columns: [],
      columns2: [],
      columns3: [],
      columns4: [],
      columns5: [],
      showBox: false,
      value: '',
      optionsVal: '状态筛选',
      showPicker: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      showPicker6: false,
      lineVal: '请选择到仓区域',
      lineValCode: '',
      diliverVal: '请选择配送区域',
      diliverValCode: '',
      carVal: '请选择线路车型',
      carValCode: '',
      cargoVal: '请选择货物类型',
      cargoValCode: '',
      difficultyVal: '请选择装卸难度',
      difficultyValCode: '',
      timeVal: '',
      timeValCode: '',
      optionsCity: [],
      optionsCar: [],
      optionsCargo: [],
      value1: 0,
      option1: [
        { text: '智能匹配', value: 0 },
        { text: '条件搜索', value: 1 }
      ],
      searchBox_type: 1
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
      // 装卸难度
      dictionary({
        dictType: 'handling_difficulty_degree'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        that.columns4 = arr;
      }).catch(err => {
        Toast.fail(err);
      })
      // 出车时段
      dictionary({
        dictType: 'departure_time_interval'
      }).then(res => {
        let arr = res.data.data;
        arr.unshift({
          code: '全部',
          codeVal: ''
        })
        that.columns5 = arr;
      }).catch(err => {
        Toast.fail(err);
      })
    },
    dropClick(type) {
      if (type) {
        this.onCancel()
      } else {
        // this.showBox = false;
        let data = {
          findVal: '',
          lineVal: '',
          diliverVal: '',
          carVal: '',
          cargoVal: '',
          difficultyVal: '',
          timeVal: '',
          type: 0
        }
        this.$emit('searchData', data)
      }
    },
    onCancel() {
      // this.showBox = false;
      let data = {
        findVal: this.value,
        lineVal: this.lineValCode,
        diliverVal: this.diliverValCode,
        carVal: this.carValCode,
        cargoVal: this.cargoValCode,
        difficultyVal: this.difficultyValCode,
        timeVal: this.timeValCode,
        type: 1
      }
      this.$emit('searchData', data)
    },
    changeSearch(type, name, boole) {
      this.searchBox_type = type;
      this.optionsVal = name;
      if (boole) {
        this.dropClick(!boole)
      }
    },
    remove() {
      this.value = ''
      this.lineVal = ''
      this.lineValCode = ''
      this.carVal = ''
      this.carValCode = ''
      this.cargoVal = ''
      this.cargoValCode = ''
      this.difficultyVal = ''
      this.difficultyValCode = ''
      this.timeVal = ''
      this.timeValCode = ''
    },
    onConfirm(value) {
      this.cargoVal = value.code;
      this.cargoValCode = value.codeVal;
      this.showPicker = false;
      this.onCancel();
    },
    onConfirm2(value) {
      this.carVal = value.code;
      this.carValCode = value.codeVal;
      this.showPicker2 = false;
      this.onCancel();
    },
    onConfirm3(value) {
      this.lineVal = value.name;
      this.lineValCode = value.code;
      this.showPicker3 = false;
      this.onCancel();
    },
    onConfirm6(value) {
      this.diliverVal = value.name;
      this.diliverValCode = value.code;
      this.showPicker6 = false;
      this.onCancel();
    },
    onConfirm4(value) {
      this.difficultyVal = value.code;
      this.difficultyValCode = value.codeVal;
      this.showPicker4 = false;
      this.onCancel();
    },
    onConfirm5(value) {
      this.timeVal = value.code;
      this.timeValCode = value.codeVal;
      this.showPicker5 = false;
      this.onCancel();
    }
  }
}
</script>
<style lang="scss" scoped>
.searchText{
  width: 100%;
  height: 46px;
  line-height: 46px;
  padding:0 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: #9B9B9B;
  background: #F5F5F5;
  text-align: left;
  border-top: 1px solid #D7DADE;
  border-bottom: 1px solid #D7DADE;
}
.searchBoxNew{
    width: 100%;
    text-align: center;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    box-shadow: 0 0 0 0 #D4D4D4;
    // bottom: 0;
    // right: 0;
    // transform: translate3d(0,0,0);
    // box-shadow: 0 8px 12px #666;
    z-index: 100;
    .van-search{
  height: 44px;
  background: #F5F5F5;
  padding:8px 10px;
  box-sizing: border-box;
  .van-field__value{
    margin-top: -2px;
  }
}
.van-cell__title{
  text-align: left;
  font-size: 17px;
  color: #000000;
}
.van-search__content{
  background: #FFFFFF;
  border: 1px solid #D7DADE;
  border-radius: 2px;
  border-radius: 2px;
  height: 28px;
  line-height: 28px;
  font-size: 14px !important;
  color: #9B9B9B;
}
.van-field__left-icon{
  display: none;
}
    .menuBox{
      width: 100%;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: #000000;
      background: #FAFAFA;
      box-shadow: 0 0 0 0 #D4D4D4;
      border-bottom: 1px solid #D4D4D4;
    }
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
    .searchBox-bottom{
      width:100%;
      height:46px;
      line-height: 46px;
      display: flex;
      .searchBox_btn{
        flex: 1;
        background: #4F77AA;
        text-align: center;
        font-size: 18px;
        color: #fff;
      }
      .checkBtn{
        background: #2F7DCD;
      }
    }
}
</style>
