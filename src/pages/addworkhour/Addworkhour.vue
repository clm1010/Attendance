<template>
<div>
  <mu-appbar title="添加工时">
    <mu-icon-button icon="chevron_left" slot="left" to="/attendance" />
    <mu-icon-button icon="check" slot="right" @click="handleSubmit"></mu-icon-button>
  </mu-appbar>
  <addworkhoure-timesheet
    v-for="(item,index) in addTimesheetList"
    :key="index"
    ref="addTimesheet"
    @deleteTimesheet="handleDeleteTimesheet"
  ></addworkhoure-timesheet>
  <div class="addtimes-button">
    <mu-float-button
      icon="add"
      @click="handleAddTimesheet('AddworkhoureTimesheet')"
      backgroundColor="true"
      ref = "dataAddTimes"
    />
  </div>
  <!-- <button type="button" name="button" @click="handleAddTimesheet('AddworkhoureTimesheet')">添加</button> -->
</div>
</template>

<script>
import AddworkhoureTimesheet from './components/Timesheet'
export default {
  name: 'Addworkhour',
  components: {
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
      // this.$refs.addTimesheet[0].$refs.addForm[0].style.display = 'none'
      console.log(this.addTimesheetList)
    },
    // 监听删除当前工时表单事件
    handleDeleteTimesheet (thisForm) {
      console.log(thisForm)
      // console.log(this.addTimesheetList.splice)
      // for (let i = 0; i < this.addTimesheetList.length; i++) {
      //   console.log(this.$refs.addTimesheet[i]._uid)
      //   if(thisForm._uid === this.$refs.addTimesheet[i]._uid) {
      //     this.addTimesheetList.splice(this.addTimesheetList[i],i)
      //     console.log(this.addTimesheetList.splice(thisForm,this.addTimesheetList[i]))
      //   }
      // }
      if (this.addTimesheetList.length > 1) {
        this.addTimesheetList.splice(thisForm,1)
        console.log(this.addTimesheetList.length)
      }
      //
      // console.log(this.$refs.addTimesheet[0].$refs.addForm[0].style.display = 'none')
    },
    handleSubmit () {
      console.log(this.addTimesheetList)
      // for (let i = 0; i < this.addTimesheetList.length; i++) {
      //   console.log(JSON.stringify(this.addTimesheetList[i]))
      // }
      console.log(this.$refs.addTimesheet[0].$refs.addForm[0].value)
      console.log(this.$refs.addTimesheet[0].$refs.addForm[1].value)
      console.log(this.$refs.addTimesheet[0].$refs.addForm[2].value)
      console.log(this.$refs.addTimesheet[0].$refs.addForm[3].value)
    }
  },
  activated () {
    console.log(1)
    this.addTimesheetList = []
    this.handleAddTimesheet('AddworkhoureTimesheet')
  }
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
.addtimes-button
  text-align: center;
  .mu-float-button
    width: 2rem;
    height: 2rem;
</style>
