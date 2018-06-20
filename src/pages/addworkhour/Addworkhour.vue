<template>
<div>
  <mu-appbar title="添加工时">
    <mu-icon-button icon="chevron_left" slot="left" to="/attendance" />
    <mu-icon-button icon="check" slot="right" @click="handleSubmit"></mu-icon-button>
  </mu-appbar>
  <mu-paper class="current-date" :zDepth="2">
    <h2>当前日期&nbsp;&nbsp;{{currentDate}}</h2>
  </mu-paper>
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
      currentDate: '',
      addTimesheetList: [],
      submitAllTimesheetList: []
    }
  },
  methods: {
    handleAddTimesheet (addworkhoureTimesheet) {
      this.addTimesheetList.push({
        addworkhoureTimesheet
      })
    },
    // 监听删除当前工时表单事件
    handleDeleteTimesheet (thisForm) {
      if (this.addTimesheetList.length > 1) {
        this.addTimesheetList.splice(thisForm, 1)
        console.log(this.addTimesheetList.length)
      }
    },
    handleSubmit () {
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        this.submitAllTimesheetList.push(this.$refs.addTimesheet[i].timesheetObj)
      }
      console.log(JSON.stringify(this.submitAllTimesheetList))
      this.submitAllTimesheetList = []
      this.$router.push('/attendance')
    }
  },
  mounted () {
    this.currentDate = this.$route.params.date
    this.currentDate = this.currentDate.replace(/\//g, '-')
    console.log(this.currentDate)
    this.addTimesheetList = []
    this.handleAddTimesheet('AddworkhoureTimesheet')
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .mu-appbar >>> .mu-appbar-title
      text-align: center;
  .addtimes-button
    text-align: center;
    .mu-float-button
      width: 2rem;
      height: 2rem;
  .current-date
    display:block;
    width: 80%;
    margin: .1rem auto;
    text-align: center;
    font-size:.4rem;
    background-color: $bgColor;
    color: #FFF;
  .formBody
    &:first-of-type
      >>> .demo-raised-button
        display: none;
</style>
