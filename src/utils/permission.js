import router from '@/router'
// import { Notify } from 'vant'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// const qs = require('qs')

const whiteList = ['/login', '/register', '/demo'] // 白名单列表

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中，无需验证
      next()
    } else {
      localStorage.setItem('loginUrl', to.path)
      // 无论拒绝还是授权都设置成1
      next(`/login?redirect=${to.path}`)
      next()
    }
  }
})
