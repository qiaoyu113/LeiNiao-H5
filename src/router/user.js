export default [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/user/Login'], resolve),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: resolve => require(['@/views/demo'], resolve),
    meta: {
      title: '雷鸟综合业务支撑平台'
    }
  },
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/views/layout/Index'], resolve),
    meta: {
      title: '雷鸟综合业务支撑平台'
    }
  },
  {
    path: '/myCenter',
    name: 'MyCenter',
    component: resolve => require(['@/views/user/MyCenter'], resolve),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/resetPwd',
    name: 'ResetPwd',
    component: resolve => require(['@/views/user/ResetPwd'], resolve),
    meta: {
      title: '修改密码'
    }
  }
]
