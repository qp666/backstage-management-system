import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式
import '@/style/base.css'

//导入饿了吗ui
import '@/plugins/element.js'
import '@/plugins/baidu.js'
Vue.config.productionTip = false
Vue.config.silent = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')