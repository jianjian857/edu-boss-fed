import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 Element 组件库
import ElementUI from 'element-ui'
// 引入 Element 主题文件
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局样式
import './styles/index.scss'

// 注册为 Vue 插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
