import Vue from 'vue'
import Vant from 'vant';
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'utils/initFastClick';
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/assets/style/reset.less' // 常用样式
import '@/assets/style/common.scss'
import 'vant/lib/index.less';// 全局引入Vant 样式
import * as filters from '@/filters'
import global_ from 'components/Global'
import { Toast } from 'vant'
import * as directives from '@/directives'
import { Lazyload } from 'vant';
import { permissionDetail, checkRouteIsNull } from '@/utils'

Vue.prototype.$permissionDetail = permissionDetail
Vue.prototype.$checkRouteIsNull = checkRouteIsNull
import '@vant/touch-emulator';
Vue.use(Lazyload);
const EventBus = new Vue()

Vue.prototype.$toast = Toast
let loading = null
Vue.prototype.$loading = (status) => {
  Toast.allowMultiple();
  if (status) {
    loading = Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
  } else {
    if (loading) {
      loading.clear()
      loading = null
    }
  }
}
Vue.prototype.$fail = (message) => {
  Toast.fail(message)
}

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives)[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// options 为可选参数，无则不传
Vue.use(Vant)

Vue.component('svg-icon', SvgIcon)

// var vConsole = new VConsole(option)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus
    }
  }
})

new Vue({
  router,
  store,
  EventBus,
  render: h => h(App)
}).$mount('#app')
