export default [
    {
      path: '/creat',
      name: 'creat',
      component: resolve => require(['@/views/creat/creat'], resolve),
      meta: {
        title: '创建意向单'
      }
    }
]