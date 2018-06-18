<template>
<mu-card class="timesheet-card">
    <mu-text-field
      hintText="项目名称"
      label="项目名称"
      icon="card_travel"
      labelFloat
      fullWidth
      ref="xiangmu"
    />
    <mu-select-field
      v-model="workState"
      hintText="工作状态"
      label="工作状态"
      icon="developer_board"
      labelFloat
      fullWidth
      @input="handleWorkStatus"
    >
      <mu-menu-item v-for = "(item,index) in workStatusList" :value="item.value" :title="item.name" :key="index" />
    </mu-select-field>
    <mu-select-field
      v-model="askleaveTypes"
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
      hintText="工时"
      label="工时"
      :required="true"
      icon="alarm_on"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="加班时间"
      label="加班时间"
      :required="true"
      icon="alarm_add"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      icon="content_paste"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="请假工时"
      label="请假工时"
      :required="true"
      icon="alarm_off"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      icon="content_paste"
      labelFloat
      fullWidth
    />
</mu-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddworkhoureTimesheet',
  data () {
    return {
      workStatusList: [],
      leaveTypeList: [],
      workState: '',
      askleaveTypes: ''
    }
  },
  methods: {
    getWorkStatus () {
      axios.get('../../static/mock/workstatus.json').then(this.handleGetWorkStatus)
    },
    getLeaveType () {
      axios.get('../../static/mock/leavetype.json').then(this.handleGetLeaveType)
    },
    // 工作状态
    handleGetWorkStatus (res) {
      if (res.data.status === '0' && res.data) {
        this.workStatusList = res.data.result
        console.log(JSON.stringify(this.workStatusList))
      }
    },
    // 请假类型
    handleGetLeaveType (res) {
      if (res.data.status === '0' && res.data) {
        this.leaveTypeList = res.data.result
        console.log(JSON.stringify(this.leaveTypeList))
      }
    },
    handleWorkStatus () {
      console.log(this.workState)
    },
    handleLeaveType () {
      console.log(this.askleaveTypes)
    }
  },
  mounted () {
    this.getWorkStatus()
    this.getLeaveType()
    console.log('被创建')
  }
}
</script>

<style lang="stylus" scoped>
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.2rem;
</style>
