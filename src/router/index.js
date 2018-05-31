import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Attendance from '@/pages/attendance/Attendance'
import Approval from '@/pages/approval/Approval'
import Problems from '@/pages/problems/Problems'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/approval',
      name: 'Approval',
      component: Approval
    },
    {
      path: '/problems',
      name: 'Problems',
      component: Problems
    }
  ]
})
