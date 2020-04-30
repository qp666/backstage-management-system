import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import api from "@/utils/request.js";

// import user from '@/views/index/user/'
// import enterprise from '@/views/index/enterprise/'
// import data from '@/views/index/data/'
// import subject from '@/views/index/subject/'
// import question from '@/views/index/question/'


import {
  removeToken
} from "@/utils/token.js";
//导入vuex
import store from '@/store/index.js'
import {
  Message
} from 'element-ui';
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
    component: () => import( /* webpackChunkName: "about" */ '@/views/index/index.vue'),
    children: [{
        path: 'chart',
        component: () => import( /* webpackChunkName: "about" */ '@/views/index/chart/index.vue')
      },
      {
        path: 'user',
        component: () => import( /* webpackChunkName: "about" */ '@/views/index/user/index.vue')
      }, {
        path: 'question',
        component: () => import( /* webpackChunkName: "about" */ '@/views/index/question/index.vue')
      }, {
        path: 'enterprise',
        component: () => import( /* webpackChunkName: "about" */ '@/views/index/enterprise/index.vue')
      }, {
        path: 'subject',
        component: () => import( /* webpackChunkName: "about" */ '@/views/index/subject/index.vue')
      },
    ]
  }
]

// const whiteList = ['/login', '/authredirect']// 免登录白名单


const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(to.path.includes('/index'));
  if (to.path.includes('/index')) {
    api.getUser().then((res) => {
      if (res.data.code == 200) {

        store.commit('changeName', res.data.data.username);
        store.commit('changeImg', process.env.VUE_APP_URL + "/" + res.data.data.avatar);
        store.commit('changeRole', res.data.data.role);

        next()
      } else {
        Message.error('请重新登录')
        removeToken();
        next({
          path: '/'
        })
        // this.$router.push("/");
      }
    });
  } else {
    next()
  }

})
export default router