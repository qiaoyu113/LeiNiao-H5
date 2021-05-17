<template>
  <div class="wrapper">
      <van-nav-bar :title="title" left-arrow class="nav-title"></van-nav-bar>
      <van-form @submit="onSubmit" :show-error="false">
        <van-field :border='false' label="看车单类型" required :value="type" readonly />
        <van-field
            v-model="phoneNum"
            name="需方手机号"
            :border='false'
            required
            clearable
            label="需方手机号"
            placeholder="请输入"
            :rules="[{required: true, message: phoneErrorMsg,validator: validator }]"
        />
        <van-field
            v-model="name"
            name="需方姓名"
            label="需方姓名"
            :border='false'
            required
            clearable
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入需方姓名' }]"
        />
        <van-field
            class="mergeInput"
            v-model="carNum"
            clearable
            label="车辆"
            required
            :rules="[ {required: true, message: '请选择车辆' } ]"
            placeholder="请输入车辆编号点击查询"
            style="margin-bottom:0"
            >
            <template #button>
                <span class="addBtn" @click="addCarNum">添加</span>
            </template>
        </van-field>
        <van-cell class="details" :border='false' is-link value="详情" v-if="showDetail">
            <template #title>
                <span class="tags">品牌：福田</span>
                <span class="tags">车型：4.2米厢货</span>
                <span class="tags">首次登记日期：2021-03-15</span>
                <span class="tags">车辆类型：油车</span>
                <span class="tags">马力（匹）：3000</span>
            </template>
        </van-cell>

        <template v-for="(item,index) in watchTime">
            <van-field
                class="mergeInput"
                v-model="item.time"
                :label="index==0?'看车时间':''"
                :required="index==0"
                :key="index"
                :rules="[ {required: true, message: '请选择时间' } ]"
                style="margin-bottom:0"
                placeholder="请选择"
                @click="actionHandle(index)"
            >
            <template #label><span :style="{'opacity': index==0?1:0}">看车时间</span> </template>
            <template #right-icon>
                <div class="actionBtns">
                    <svg-icon class="icon" icon-class="reduce" @click.stop="reduceHandle(index)" v-if="index>0"/>
                    <svg-icon class="icon" icon-class="add" @click.stop="addHandle(index)" v-if="index<2 && item.show"/>
                </div>
            </template>
        </van-field>
        </template>
        <div class="footer">
            <van-button block type="info" native-type="submit" color="#188FF9">提交</van-button>
        </div>
        </van-form>
        <van-action-sheet v-model="showAction">
            <van-picker ref="timePicker" show-toolbar :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"/>
        </van-action-sheet>
  </div>
</template>

<script>
var dayjs = require('dayjs')
export default {
  components: {},
  props: {},
  data() {
    return {
        title:'新建看车单',
        type:'租赁',
        phoneNum:'',
        name:'',
        carNum:'',
        time1:"",
        time2:"",
        time3:"",
        dayLists:[],
        timeLists:[] ,
        columns:[
            {
                values: [],
                defaultIndex: 0,
            },
            {
               values: [],
                defaultIndex: 0,
            },
            {
                values: [],
                defaultIndex: 0,
            },
        ],
        showAction:false,
        curHour:'',
        curDay:'',
        watchTime:[
            {
                time:'',
                show:true
            }
        ],
        setIndex:-1,
        showDetail:false,
        phoneErrorMsg: '请输入需方手机号'
    };
  },
  watch: {
      showAction(val){
          if(val){
            this.$nextTick(()=>{
                this.initCurTime()
            })
          }
      }
  },
  computed: {},
  methods: {
       validator(value) {
        if(!(value.length === 11 && (/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)))){
            this.phoneErrorMsg='电话号码格式不正确'
        }
        return value.length === 11 && (/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))
      },
      // 初始化当前日期
      initCurTime(){
        this.curHour=dayjs().hour();
        this.curDay=dayjs().format('YYYY.MM.DD')
        this.dayLists=[this.curDay,dayjs().add(1, 'day').format('YYYY.MM.DD'),dayjs().add(2, 'day').format('YYYY.MM.DD')]
        this.$refs.timePicker.setColumnValues(0,this.dayLists)
        this.timeLists.forEach(item=>{
            if(this.curHour>=item.text.split(":")[0]){
                item.disabled=true
            }else{
                item.disabled=false
            }
        })
        this.$refs.timePicker.setColumnValues(1,this.timeLists)
        this.$refs.timePicker.setColumnValues(2,this.timeLists)
      },
      // 生成时间
      getHourTime(){
          for (let i = 0; i < 24; i++) {
            let count = i <= 9 ? `0${i}:00` : `${i}:00`
            this.timeLists.push({
                text: count,
                disabled: false
            })
          }
      },
      // 添加
      addHandle(i){
          if(this.watchTime[i].time){
                let obj={ time:"",show:true}
                this.watchTime[i].show=false;
                this.watchTime.push(obj)
          }else{
               this.$toast.fail('请选择时间')
          }

      },
      // 删除日期
      reduceHandle(i){
          this.watchTime[i-1].show=true;
          this.watchTime.splice(i,1)
      },
      // 显示时间选择器
      actionHandle(i){
          this.setIndex=i;
          this.showAction=true
      },
      // 查询车辆编号
      addCarNum(){
          if(this.carNum){
              this.showDetail=true
          }
      },
      // 提交
      onSubmit(values) {
        console.log('submit', values);
      },
      onConfirm(value){
          this.watchTime[this.setIndex].time=value[0]+'  '+value[1].text+'~'+value[2].text
          this.showAction=false
          this.setIndex=-1
      },
      onCancel(){
           this.showAction=false
           this.setIndex=-1
      },
      onChange(picker, value,index){
        if(this.curDay==value[0]){
            //选当天时
            this.timeLists.forEach(item=>{
                if(this.curHour>=item.text.split(":")[0]){
                    item.disabled=true
                }else{
                    item.disabled=false
                }
            })
            picker.setColumnValues(1,this.timeLists)
            picker.setColumnValues(2,this.timeLists)
        }else if(index==0){
            // 日期变化时
            this.timeLists.forEach(item=>{
               item.disabled=false
            })
            picker.setColumnValues(1,this.timeLists)
            picker.setColumnValues(2,this.timeLists)
        }else if(index==1){
             // 开始时间变化时
            let startTime=value[1].text;
            this.timeLists.forEach(item=>{
                if(startTime.split(":")[0]>=item.text.split(":")[0]){
                    item.disabled=true
                }else{
                    item.disabled=false
                }
            })
            picker.setColumnValues(2,this.timeLists)
        }

      }
  },
  created() {
      this.getHourTime()
  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
::v-deep .van-picker{
    .van-picker__cancel{
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9B9B9B;
    }
    .van-picker__confirm{
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #188FF9;
    }
}
::v-deep  .van-picker__frame {
    display: flex;
    justify-content: center;
    align-items: center;
    &::before{
        display: inline-block;
        content: '至';
        position: absolute;
        right:21%;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9B9B9B;
    }
}
::v-deep .van-picker__columns{
    padding: 0 20px;
    .van-picker-column{
        &:nth-of-type(1){
            flex-basis: 35%;
        }
        &:nth-of-type(1){
            flex-basis: 25%;
        }
        &:nth-of-type(2){
            flex-basis: 25%;
        }
    }
}
::v-deep .van-form{
    padding: 0 10px;
    margin-top: 5px;
    .van-cell{
        margin-bottom: 5px;
        .van-field__right-icon{
            padding: 0;
        }
        .van-cell__value{
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #188FF9;
        }
        .van-icon-arrow{
            font-size:0.35rem;
            color: #C1E2FF;
        }
    }
    .van-field__label{
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
    }
    .van-field__control{
        &::-webkit-input-placeholder{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #D8D8D8;
        }
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
    }
}
.wrapper{
    background: #FBFBFB;
    .addBtn{
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color:#188FF9
    }
    .mergeInput{
        &::after{
            width: 95%;
            left: 50% !important;
            transform: translateX(-50%);
            border-color: #F1F3F7;
            border-width: 2px;
        }
    }
    .details{
        .tags{
            display: block;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #656565;
            line-height: 23px;
        }
        .van-cell__value{
            flex: initial;
        }
    }
    .actionBtns{
        width:100%;
        display: flex;
        justify-content: flex-end;
        .svg-icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 10px;
        }
    }
    .footer{
        width: 100%;
        position: fixed;
        bottom:0;
        ::v-deep .van-button{
            height: 49px;
            .van-button__text{
                font-size: 15px;
            }
        }
    }
}
</style>