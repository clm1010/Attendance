<template>
  <div>
    <addworkhoure-header></addworkhoure-header>
    <addworkhoure-timesheet :leaveTypeList="leaveTypeList"></addworkhoure-timesheet>
  </div>
</template>

<script>
import AddworkhoureHeader from './components/Header'
import AddworkhoureTimesheet from './components/Timesheet'
import axios from 'axios'
export default {
  name: 'Addworkhour',
  components: {
    AddworkhoureHeader,
    AddworkhoureTimesheet
  },
  data () {
    return {
      leaveTypeList: []
    }
  },
  methods: {
    getWorkState () {
      axios.get('./static/mock/leavetype.json').then(this.handleWorkState)
    },
    handleWorkState (res) {
      if (res.data.status === '0' && res.data) {
        this.leaveTypeList = res.data.result
        console.log(JSON.stringify(this.leaveTypeList))
      }
    }
  },
  mounted () {
    this.getWorkState()
  }
}
</script>

<style lang="stylus" scoped>
</style>
