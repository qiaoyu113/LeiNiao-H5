<template>
  <van-tabbar
    class="FooterTabbar"
    route
    :safe-area-inset-bottom="true"
    :active-color="deepBlue"
    inactive-color="#DDE2EE"
  >
    <van-tabbar-item
      icon="wap-home"
      replace
      to="/"
    >
      首页
      <template #icon="props">
        <svg-icon class="icon" :icon-class="props.active?'home':'home-d'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/mycenter"
    >
      <span>个人中心</span>
      <template #icon="props">
        <svg-icon class="icon" :icon-class="props.active?'users':'user-d'" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import variablesLess from '@/assets/style'; // 引入less 变量
const { vantLess } = variablesLess;
export default {
  name: 'FooterTabbar',
  data() {
    return {
      deepBlue: vantLess.deepBlue
    }
  }
}
</script>
<style lang="less" scoped>
.FooterTabbar{
  ::v-deep{
    .van-tabbar-item{
      .van-icon{
        font-size: 25px;
      }
    }
  }
  .icon{
    font-size: 25px;
  }
  &::after{
    border-bottom: none;
  }
}
</style>
