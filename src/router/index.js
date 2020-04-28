import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
// import index from '@/views/index'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/views/index/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router