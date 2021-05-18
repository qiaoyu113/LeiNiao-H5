import Vue from 'vue';
import Vant from 'vant';
import { Toast } from 'vant'
import '@vant/touch-emulator';
Vue.use(Vant)
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
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import SvgIcon from 'components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus
    }
  }
})
