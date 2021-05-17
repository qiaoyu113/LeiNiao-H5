export default [
    {
      path: '/creat',
      name: 'creat',
      component: resolve => require(['@/views/watchCar/creat'], resolve),
      meta: {
        title: '创建意向单'
      }
    },
    {
        path: '/carDetail',
        name: 'carDetail',
        component: resolve => require(['@/views/watchCar/carDetail'], resolve),
        meta: {
          title: '车辆详情'
        }
      }
]