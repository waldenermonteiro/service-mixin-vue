
export default [
  {
    path: '/',
    component: () => import('@/pages/post/HelloWorld.vue')
    // children: [
    //   { path: '', name: 'Dashboard', component: () => import('pages/index') }
    // ],
  }
]
