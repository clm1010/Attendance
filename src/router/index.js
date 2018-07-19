import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Attendance from '@/pages/attendance/Attendance'
import Addworkhour from '@/pages/addworkhour/Addworkhour'
import Approval from '@/pages/approval/Approval'
import ApprovalPersonalInfoList from '@/pages/approvalpersonal/ApprovalPersonalInfoList'
import ApprovalPersonalDetails from '@/pages/approvalpersonaldetails/ApprovalPersonalDetails'
import Problems from '@/pages/problems/Problems'
import Remind from '@/pages/remind/Remind'
import Errormsg from '@/pages/errormsg/Errormsg'

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
      path: '/approvalpersonalinfolist',
      name: 'ApprovalPersonalInfoList',
      component: ApprovalPersonalInfoList
    },
    {
      path: '/approvalpersonaldetails/:pdid',
      name: 'ApprovalPersonalDetails',
      component: ApprovalPersonalDetails
    },
    {
      path: '/problems',
      name: 'Problems',
      component: Problems
    },
    {
      path: '/remind',
      name: 'Remind',
      component: Remind
    },
    {
      path: '/addworkhour',
      name: 'Addworkhour',
      component: Addworkhour
    },
    {
      path: '/errormsg',
      name: 'Errormsg',
      component: Errormsg
    }
  ]
})
