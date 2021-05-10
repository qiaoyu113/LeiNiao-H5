<template>
  <div :id="version ? 'app-m1' : 'app'">
    <transition :name="transitionName">
      <keep-alive :include="cachedViews">
        <!-- <keep-alive> -->
        <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
    </transition>
    <div v-if="version" class="version">
      {{ version }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import defaultSetting from './config'
export default {
  name: 'App',
  data() {
    return {
      version: ''
    }
  },
  computed: {
    ...mapState({
      cachedViews: (state) => state['cached-views'].cachedViews
    }),
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  watch: {
    $route(to, from) {
      const { name } = this.$route
      if (name === 'index') {
        this.$store.dispatch('cached-views/delAllViews')
        return false
      }
      if (name) {
        this.$store.dispatch('cached-views/addView', this.$route)
      }
      if (from.name !== 'index' && from.name !== 'Freight' && from.name !== 'Joinsearch' && from.name !== 'OutSidefreightlist' && from.name !== 'OutSidefreight' && to.meta.keepAlive && !to.meta.isCach && (!from.meta.search && !to.meta.search)) {
        this.$store.dispatch('cached-views/delView', this.$route)
        to.meta.isCach = false
      }
    }
  },
  mounted() {
    if (window.location.host !== 'szjw-bss-h5.yunniao.cn') {
      this.version = this.GLOBAL.version
    }
  },
  methods: {
    wxLogin() {
      // const wx = window.wx;
      // wx.config({
      //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
      //   appId: '', // 必填，公众号的唯一标识
      //   timestamp: '', // 必填，生成签名的时间戳
      //   nonceStr: '', // 必填，生成签名的随机串
      //   signature: '', // 必填，签名
      //   jsApiList: [], // 必填，需要使用的JS接口列表
      //   openTagList: [] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
      // });
    }
  }
}
</script>

<style lang="scss">
html,body{ margin:0px; height:100%;}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

.version{
  font-size: 12px;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  z-index:100;
  height: 100px;
  color: #fff;
  // 允许点击穿透（防止遮盖点击按钮）
  pointer-events: none;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: #fff;
}
#app-m1{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  .van-nav-bar{
    background: linear-gradient(270deg, #0064F3 0%, #188FF9 100%) !important;
  }
}
</style>
