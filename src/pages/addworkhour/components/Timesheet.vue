<template>
<form ref="addForm" :modle="timesheetObj" class="formCls"  method="post">
  <mu-raised-button label="删除" class="demo-raised-button"  @click="handleDeleteTimesheetClick" primary/>
  <mu-card class="timesheet-card">
      <mu-select-field
        v-model="timesheetObj.technologyPlatformType"
        ref="dataTechnologyPlatform"
        hintText="项目名称"
        label="项目名称"
        icon="card_travel"
        labelFloat
        fullWidth
        @input="handleTechnologyPlatformType"
      >
        <mu-menu-item v-for = "(item,index) in technologyPlatformList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-select-field
        v-model="timesheetObj.workState"
        hintText="工作状态"
        label="工作状态"
        icon="developer_board"
        labelFloat
        fullWidth
        @input="handleWorkStatus"
      >
        <mu-menu-item v-for = "(item,index) in workStatusList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-text-field
        v-show="isShow"
        hintText="工时"
        label="工时"
        :required="true"
        icon="alarm_on"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-show="isShow"
        hintText="加班时间"
        label="加班时间"
        :required="true"
        icon="alarm_add"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-show="isShow"
        hintText="工作内容"
        label="工作内容"
        :required="true"
        multiLine
        icon="content_paste"
        labelFloat
        fullWidth
      />
      <mu-select-field
        v-show="!isShow"
        v-model="timesheetObj.askleaveTypes"
        hintText="请假类型"
        label="请假类型"
        icon="developer_board"
        labelFloat
        fullWidth
        @input="handleLeaveType"
      >
        <mu-menu-item v-for = "(item,index) in leaveTypeList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-text-field
        v-show="!isShow"
        hintText="请假工时"
        label="请假工时"
        :required="true"
        icon="alarm_off"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-show="!isShow"
        hintText="请假理由"
        label="请假理由"
        :required="true"
        multiLine
        icon="content_paste"
        labelFloat
        fullWidth
      />
  </mu-card>
</form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddworkhoureTimesheet',
  data () {
    return {
      isShow: true,
      technologyPlatformList: [],
      workStatusList: [],
      leaveTypeList: [],
      // workState: '',
      // askleaveTypes: '',
      timesheetObj: {}
    }
  },
  methods: {
    getTechnologyPlatform () {
      axios.get('../../static/mock/technologyplatformtype.json').then(this.handleGetTechnologyPlatformType)
    },
    getWorkStatus () {
      axios.get('../../static/mock/workstatus.json').then(this.handleGetWorkStatus)
    },
    getLeaveType () {
      axios.get('../../static/mock/leavetype.json').then(this.handleGetLeaveType)
    },
    // 技术平台类型
    handleGetTechnologyPlatformType (res) {
      if (res.data.status === '0' && res.data) {
        this.technologyPlatformList = res.data.result
        console.log(JSON.stringify(this.technologyPlatformList))
        this.timesheetObj.technologyPlatformType = '1'
      }
    },
    // 工作状态
    handleGetWorkStatus (res) {
      if (res.data.status === '0' && res.data) {
        this.workStatusList = res.data.result
        console.log(JSON.stringify(this.workStatusList))
        this.timesheetObj.workState = '1'
      }
    },
    // 请假类型
    handleGetLeaveType (res) {
      if (res.data.status === '0' && res.data) {
        this.leaveTypeList = res.data.result
        console.log(JSON.stringify(this.leaveTypeList))
        this.timesheetObj.askleaveTypes = '1'
      }
    },
    // 监听技术平台类型input事件
    handleTechnologyPlatformType () {
      console.log(this.timesheetObj.technologyPlatformType)
    },
    // 监听工作状态input事件
    handleWorkStatus () {
      this.timesheetObj.workState === '7' ? this.isShow = false : this.isShow = true
      console.log(this.timesheetObj.workState)
    },
    // 监听请假类型input事件
    handleLeaveType () {
      console.log(this.timesheetObj.askleaveTypes)
    },
    handleDeleteTimesheetClick (event) {
        this.$emit('deleteTimesheet', event.target.offsetParent.parentNode)
    }
  },
  mounted () {
    this.getTechnologyPlatform()
    this.getWorkStatus()
    this.getLeaveType()
    console.log('被创建')
  },
  activated () {
    this.getTechnologyPlatform()
    this.getWorkStatus()
    this.getLeaveType()
  }
}
</script>

<style lang="stylus" scoped>
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.2rem;
</style>
