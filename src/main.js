import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import './permission'
import './plugins/vant'
import './plugins/element'
import "../src/assets/iconfonts/iconfont.css"

Vue.config.productionTip = false

import { Toast } from 'vant'

Vue.use(Toast)
Vue.prototype.$md5 = md5
// Vue.prototype.$Global = global_

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
