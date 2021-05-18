<template>
  <div class="wrapper">
    <van-nav-bar :title="title" left-arrow class="nav-title"></van-nav-bar>
    <van-tabs scrollspy sticky>
      <van-tab title="基础信息">
        <h2 class="title">
          基础信息
        </h2>
        <van-form class="formWarp">
          <van-field v-model="data.number" :border="false" readonly label="车辆编号：" />
          <van-field v-model="data.payType" :border="false" readonly label="租售类型：" />
          <van-field v-model="data.brand" :border="false" readonly label="品牌：" />
          <van-field v-model="data.carType" :border="false" readonly label="4.2米厢货" />
          <van-field v-model="data.carType2" :border="false" readonly label="车辆类型：" />
          <van-field v-model="data.width" :border="false" readonly label="箱体宽度(米)：" />
          <van-field v-model="data.horsepower" :border="false" readonly label="马力(匹)：" />
          <van-field v-model="data.engine" :border="false" readonly label="发动机型号：" />
          <van-field v-model="data.carBrand" :border="false" readonly label="车牌号：" />
          <van-field v-model="data.registerCity" :border="false" readonly label="注册城市：" />
          <van-field v-model="data.registerTime" :border="false" readonly label="首次登记日期：" />
          <van-field v-model="data.mileage" :border="false" readonly label="里程(公里）：" />
        </van-form>
      </van-tab>
      <van-tab title="销售信息">
        <h2 class="title">
          销售信息
        </h2>
        <van-form class="formWarp">
          <van-field v-model="data.sellingPrice" :border="false" readonly label="车主意向售价(万)：" />
          <van-field v-model="data.shortRent" :border="false" readonly label="可接受最短租期(月)：" />
          <van-field v-model="data.intentionMoney" :border="false" readonly label="车主意向租金(元/月):" />
          <van-field v-model="data.quarterPrice" :border="false" readonly label="季租租金(元/月)：" />
          <van-field v-model="data.halfYearPrice" :border="false" readonly label="半年租租金(元/月)：" />
          <van-field v-model="data.yearPrice" :border="false" readonly label="年租租金(元/月):" />
        </van-form>
      </van-tab>
      <van-tab title="拓展信息">
        <h2 class="title">
          拓展信息
        </h2>
        <van-form class="formWarp">
          <van-field v-model="data.carNature" :border="false" readonly label="车辆性质：" />
          <van-field v-model="data.insurance" :border="false" readonly label="商业险三者保额(万)：" />
          <van-field v-model="data.loanCity" :border="false" readonly label="贷款：" />
          <van-field v-model="data.affiliation" :border="false" readonly label="挂靠：" />
          <van-field v-model="data.tailboard" :border="false" readonly label="尾板：" />
          <van-field v-model="data.intentionStasus" :border="false" readonly label="缴纳意向金：" />
          <van-field v-model="data.poolManager" :border="false" readonly label="车池经理：" />
          <van-field v-model="data.urgentRent" :border="false" readonly label="急租：" />
          <van-field v-model="data.urgentSale" :border="false" readonly label="急售：" />
        </van-form>
      </van-tab>
      <van-tab title="图文描述">
        <h2 class="title">
          图文描述
        </h2>
        <div class="formWarp">
          <h3 class="subTitle">
            车辆图片
          </h3>
          <div class="lists">
            <van-image
              v-for="(item,index) in data.carPic"
              :key="index"
              class="item"
              :src="item"
              @click="showImagePreview(item)"
            />
          </div>
          <h3 class="subTitle">
            车辆视频
          </h3>
          <div class="lists">
            <div v-for="(item,index) in data.carVideo" :key="index" class="item">
              <Xgplayer :config="{ id:`item${index}`,url:item,poster:require('../../assets/images/default.png'),fitVideoSize: 'auto','x5-video-player-type': 'h5',}" />
            </div>
          </div>
          <h3 class="subTitle">
            行驶证
          </h3>
          <div class="lists">
            <van-image
              v-for="(item,index) in data.drivingLicense"
              :key="index"
              class="item"
              :src="item"
              @click="showImagePreview(item)"
            />
          </div>
          <van-field
            v-model="data.describe"
            readonly
            autosize
            class="describe"
            label="车况描述："
            type="textarea"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import Xgplayer from 'xgplayer-vue';
export default {
  components: {
    Xgplayer
  },
  props: {},
  data() {
    return {
      title: '车辆详情',
      data: {
        number: '1231231231212312312',
        payType: '出租出售',
        brand: '福田',
        carType: '4.2米厢货',
        carType2: '油车',
        width: '2.3',
        horsepower: '300',
        engine: '康思明',
        carBrand: '京A66666',
        registerCity: '北京市',
        registerTime: '2020-12-12',
        mileage: 6800,
        sellingPrice: 13.5,
        shortRent: 6,
        intentionMoney: 4000,
        quarterPrice: 4000,
        halfYearPrice: 4000,
        yearPrice: 4000,
        carNature: '运营',
        insurance: 100,
        loanCity: '北京市',
        affiliation: '有',
        tailboard: '无',
        intentionStasus: '未缴纳',
        poolManager: '老王/13140113883',
        urgentRent: '否',
        urgentSale: '否',
        carPic: ['https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933625919799681738%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210421100616.jpg', 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933625919799681738%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210421100616.jpg', 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933625919799681738%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210421100616.jpg', 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933625919799681738%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210421100616.jpg'],
        carVideo: ['https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/161933628870026996489normal%20video.mp4', 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/161933628870026996489normal%20video.mp4'],
        drivingLicense: ['https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933627657399413210%E6%A2%A7%E6%A1%90%E7%BA%BF%E8%B7%AF%E6%89%A7%E8%A1%8C.png', 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/161933627657399413210%E6%A2%A7%E6%A1%90%E7%BA%BF%E8%B7%AF%E6%89%A7%E8%A1%8C.png'],
        describe: '不喝酒的就是点击接口就是大家圣诞节金卡圣诞节的计算机家世界撒娇加上九三那只能难'
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {

  },
  methods: {
    showImagePreview(url) {
      ImagePreview([url]);
    }
  }
};
</script>
<style lang="scss" scoped>
.title{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4A4A4A;
    padding-left: 15px;
    border-bottom:3px solid #F9F9F9;
    padding-bottom: 10px;
    padding-top: 10px;
    margin: 0;
}
::v-deep .van-tabs__wrap{
    padding-top: 10px;
    height: 32px;
    background: #F9F9F9;
    padding-bottom: 8px;
    .van-tabs__nav{
        background: #F9F9F9;
    }
    .van-tab{
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #838383;
        padding: 5px 0;
    }
    .van-tab--active{
        color: #188FF9;
    }
    .van-tabs__line{
        width:60px;
        height:3px;
        background-color: #C1E2FF;
    }
}
::v-deep .formWarp{
    padding: 5px 15px 30px;
    .subTitle{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9B9B9B;
    }
    .lists{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .item{
        width: 157px;
        height: 96px;
        margin-bottom: 15px;
        div{
            width:100% !important;
            height: 100% !important;
        }
    }
    .van-cell{
        padding: 5px 15px;
        .van-cell__title{
            width:3.7rem
        }
    }
    .van-field__label{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9B9B9B;
    }
    .van-field__control{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4A4A4A;
    }
    .xgplayer-start{
        opacity: 0;
    }
    .xgplayer-enter{
        opacity: 0;
    }
    .describe{
        padding-left: 0;
        .van-cell__title{
            width:80px !important;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #9B9B9B;
        }
    }
}
</style>
