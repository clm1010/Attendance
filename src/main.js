// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import MuseUI from 'muse-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { VTable, VPagination } from 'vue-easytable'
import store from './store'
import 'babel-polyfill'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.min.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/styles/material-icons.css'
import 'vue-easytable/libs/themes-base/index.css'
import common from './common/common'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VTable)
Vue.use(VPagination)
Vue.prototype.$common = common
Vue.prototype.baseUrl = 'http://172.16.135.103:8080/attence/webService/AttenceService?wsdl'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
