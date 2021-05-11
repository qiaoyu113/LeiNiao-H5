<template>
  <div class="mycenter">
    <van-nav-bar title="个人中心" />
    <div class="userInfo">
        <span class="avatar"></span>
        <h2 class="name">{{userData.bssLoginName?userData.bssLoginName:'暂无'}}</h2>
        <p class="phone">手机号：{{userData.mobile?userData.mobile:'暂无'}}</p>
        <p class="role">角色：{{userData.roleName?userData.roleName:"暂无"}}</p>
    </div>
    <div class="cell-top">
      <van-cell title="修改密码" is-link @click="toResetPwd" />
    </div>
    <div style="padding: 0 38px; box-sizing: border-box">
      <van-button
        style="margin-top: 50px"
        plain type="info"
        block
        @click="removeLocal"
      >
        退出登录
      </van-button>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs } from 'vant'
import FooterTabbar from '@/components/FooterTabbar'
import { mapGetters } from 'vuex'
export default {
  name: 'MyCenter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FooterTabbar
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  mounted() {
  },
  methods: {
    removeLocal() {
      this.$store.commit('user/SETRESETPWD', false)
      localStorage.clear();
      this.$router.replace({
        name: 'login'
      })
    },
    toResetPwd() {
      this.$router.replace({
        name: 'ResetPwd'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .van-button--plain.van-button--info{
    border-color: #188FF9;
    .van-button__text{
        color:#188FF9
    }
}
::v-deep .van-cell{
    padding-left: 25px;
    padding-right:25px;
    span{
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
    }
}
::v-deep .van-tabbar-item__icon{
    margin-bottom: 2px;
}
.mycenter {
  width: 100%;
    background: #FBFBFB;
  .userInfo{
    padding: 10px 30px 0;
    text-align: center;
    background: #fff;
  }
  .avatar{
      display: block;
      width:41px;
      height: 41px;
      background: url("./imgs/userIcon.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto 10px;
  }
  .name{
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4A4A4A;
        margin: 0;
  }
  .phone{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
        margin: 0;
  }
  .role{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #656565;
        padding: 19px 0;
        margin: 0;
  }
}
.cell-top{
  margin-top: 9px;
  color: #333;
  height: 50px;
  line-height: 50px;
  font-weight: 600;
  font-size: 22px;
}
</style>
