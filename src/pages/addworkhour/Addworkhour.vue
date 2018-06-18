<template>
<div>
  <addworkhoure-header></addworkhoure-header>
  <addworkhoure-timesheet
    v-for="(item,index) in addTimesheetList"
    :key="index"
    ref="addTimes"
  ></addworkhoure-timesheet>
  <button type="button" name="button" @click="handleAddTimesheet('AddworkhoureTimesheet')">添加</button>
  <button type="button" name="button" @click="handleSub">提交</button>
</div>
</template>

<script>
import AddworkhoureHeader from './components/Header'
import AddworkhoureTimesheet from './components/Timesheet'
export default {
  name: 'Addworkhour',
  components: {
    AddworkhoureHeader,
    AddworkhoureTimesheet
  },
  data () {
    return {
      addTimesheetList: []
    }
  },
  methods: {
    handleAddTimesheet (addworkhoureTimesheet) {
      this.addTimesheetList.push({
        addworkhoureTimesheet
      })
    },
    handleSub () {
      // console.log(this.addTimesheetList)
      // for (let i = 0; i < this.addTimesheetList.length; i++) {
      //   console.log(JSON.stringify(this.addTimesheetList[i]))
      // }
      console.log(this.$refs.addTimes[0].$refs.xiangmu.$refs.input.value)
      console.log(this.$refs.addTimes[1].$refs.xiangmu.$refs.input.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
