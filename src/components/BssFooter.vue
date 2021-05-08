<template>
  <van-tabbar
    route
    :safe-area-inset-bottom="true"
  >
    <van-tabbar-item
      icon="wap-home"
      replace
      to="/bss/index"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      icon="manager"
      replace
      to="/bss/my"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'BssFooter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
<style scoped>
.van-tabbar-item.van-tabbar-item--active{
  color: #4F7CFF;
}
.van-tabbar-item{
  color: #CFD5EF;
}
.van-tabbar-item >>> .van-tabbar-item__icon{
  font-size: 25px;
}
</style>
