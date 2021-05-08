import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'utils/initFastClick';
import 'utils/permission'
import '@/icons' // icon
import '@/assets/style/reset.less' // 常用样式
import '@/assets/style/common.scss'
import 'vant/lib/index.less';// 全局引入Vant 样式
import * as filters from '@/filters'
import global_ from 'components/Global'
import * as directives from '@/directives'
import { permissionDetail, checkRouteIsNull } from '@/utils'
Vue.prototype.$permissionDetail = permissionDetail
Vue.prototype.$checkRouteIsNull = checkRouteIsNull
require('./initPlugins');
// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives)[key])
})

import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// var vConsole = new VConsole(option)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
