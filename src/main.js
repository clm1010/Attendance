// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import MuseUI from 'muse-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { VTable, VPagination } from 'vue-easytable'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.min.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/styles/material-icons.css'
import 'vue-easytable/libs/themes-base/index.css'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VTable)
Vue.use(VPagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
