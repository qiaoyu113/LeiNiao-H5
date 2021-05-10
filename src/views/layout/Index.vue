<template>
  <div class="index">
    <van-nav-bar :title="title" class="nav-title">
    </van-nav-bar>
    <div class="list-wrap">
      <div v-for="one in action_com" :key="one.value" class="list-title">
        <div class="list-title-lebel">
          {{ one.name }}
        </div>
        <div class="list-content">
          <van-grid column-num="3" :border="false">
            <template v-for="(item, index) in list[one.value]">
              <van-grid-item
                v-if="setPermissions(item.pUrl)"
                :key="index"
                :to="item.url"
              >
                <div class="grid-ct flex-sub">
                  <div class="list-badge">
                    <van-image width="80" height="80" :src="require(`../../assets/images/${item.icon}`)"/>
                    <div class="badge-info">
                      <template>
                          {{ getTotal(item.total) }}
                        </template>
                    </div>
                  </div>
                  <div class="grid-text">
                    <span v-if="!item.isWrap">
                      {{ item.title }}
                    </span>
                    <template v-else>
                      <p v-for="(tt,inx) in item.title" :key="inx">
                        {{ tt }}
                      </p>
                    </template>
                  </div>
                </div>
              </van-grid-item>
            </template>
          </van-grid>
        </div>
      </div>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Badge } from 'vant';
import { isPermission } from 'filters/index';
import { mapGetters } from 'vuex'
import FooterTabbar from '@/components/FooterTabbar';
import { getLineShelfAllStatusAndTotalNum } from '@/api/backlog'
export default {
  name: 'Index',
  components: {
    FooterTabbar,
    [Badge.name]: Badge
  },
  data() {
    return {
      totalNum: 10, // 我的待办总数
      actions: [
        {
          name: '看车单管理',
          value: 0,
          pUrl: ['/v1/score/assess/h5']
        }
      ],
      activeIndex: 0,
      list: [
        // 看车单管理
        [
          {
            title: '看车单管理',
            url: '/carManage',
            icon: 'cardList.png',
            pUrl: '/v1/score/assess/h5',
            style: {
              width: '0.9333rem',
              height: '1.0933rem'
            },
            total: 'totalNum'
          },
        ]
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    ...mapGetters(['userData']),
    action_com() {
      return this.actions.filter(item => this.setPermissions(item.pUrl))
    }
  },
  mounted() {
    const actionsList = isPermission(this.actions)
    if (actionsList.length > 0) {
      this.activeIndex = localStorage.getItem('HOME_ACTIVE') || actionsList[0].value;
    } else {
      this.showHeader = false;
    }
    this.getLineShelfAllStatusAndTotalNum()
  },
  activated() {
    this.$bus.$off();
  },
  methods: {
    setPermissions(value) {
      if (typeof value === 'string') {
        value = [value]
      }
      const permission = this.userData.stringPermissions
      return permission.some(item => value.includes(item))
    },
    async getLineShelfAllStatusAndTotalNum() {
      let { data: res } = await getLineShelfAllStatusAndTotalNum()
      if (res.success) {
        this.totalNum = res.data.totalNum
      }
    },
    getTotal(str) {
      return this[str] > 999 ? '999+' : this[str]
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  .nav-title {
    width: 100%;
    position: fixed;
  }
  .list-wrap {
    margin-top: 50px;
    margin-bottom: 50px;
    height: calc(100% - 100px);
    overflow-y: auto;
  }
  .list-title:nth-child(1) {
    border: none;
  }
  .list-title {
    border-top: 5px solid  #EFF2F5;
    font-size: @font-size-md-1;
    color: @gray-9;
  }
  .list-title-lebel {
    font-size: 17px;
    font-weight: 600;
    padding-bottom: 15px;
    padding-top: 20px;
    padding-left: 25px;
  }
  .list-content {
    .grid-ct {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-size: 47px;
      svg{
        width: 30px;
        height: 24px !important;
      }
    }
    .grid-pic {
      display: block;
      margin: 0 auto;
    }
    .grid-text {
      width: 100%;
      display: flex;
      margin-top: 10px;
      margin-bottom: 25px;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      font-size: @font-size-xs-1;
      // font-size: 10px;
      color: #838A9D;
      p{
        margin: 0;
        padding: 0;
      }
      p:nth-last-child(1){
        margin-top: 3px;
      }
      span{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #4A4A4A;
      }
    }
    ::v-deep {
      .van-grid-item__content--center {
        padding: 0;
        border-radius: 3px;
      }
    }
  }
  .list-badge{
    position: relative;
    display: flex;
  }
  .badge-info{
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    min-width: 0.42667rem;
    padding: 0 0.08rem;
    color: #fff;
    font-weight: 500;
    font-size: 0.32rem;
    line-height: 1.2;
    text-align: center;
    background-color: #ee0a24;
    border: 1px solid #fff;
    border-radius: 0.42667rem;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
}
</style>
