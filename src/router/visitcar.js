export default [
  {
    path: '/visit-car',
    name: 'VisitCar',
    component: resolve => require(['@/views/visitCar/VisitCar'], resolve),
    meta: {
      title: '看车单管理',
      keepAlive: true
    }
  }
]
