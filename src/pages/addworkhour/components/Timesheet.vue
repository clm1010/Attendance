<template>
<form ref="addForm" :modle="timesheetObj" class="formBody"  method="post">
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
        v-model="timesheetObj.workHours"
        v-show="isShow"
        hintText="工时"
        label="工时"
        icon="alarm_on"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.overTime"
        v-show="isShow"
        hintText="加班时间"
        label="加班时间"
        icon="alarm_add"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.workContent"
        v-show="isShow"
        hintText="工作内容"
        label="工作内容"
        multiLine
        icon="content_paste"
        labelFloat
        fullWidth
      />
      <mu-select-field
        v-model="timesheetObj.askleaveTypes"
        v-show="!isShow"
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
        v-model="timesheetObj.leaveTime"
        v-show="!isShow"
        hintText="请假工时"
        label="请假工时"
        icon="alarm_off"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.leaveReason"
        v-show="!isShow"
        hintText="请假理由"
        label="请假理由"
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
      timesheetObj: {
        technologyPlatformType: '',
        workState: '',
        workHours: '',
        overTime: '',
        workContent: '',
        askleaveTypes: '',
        leaveTime: '',
        leaveReason: ''
      }
    }
  },
  methods: {
    getTechnologyPlatform () {
      axios.get('../../static/mock/technologyplatformtype.json').then(this.handleGetTechnologyPlatformType)
    },
    // 工作状态
    getWorkStatus () {
      try {
        var postdata = '<?xml version=\'1.0\' encoding=\'utf-8\'?>'
        postdata += '<soap:Envelope  xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'>'
        postdata += '<soap:Body><m:queryWorkState xmlns:m=\'http://webservice.attence.com/\'>'
        postdata += '</m:queryWorkState></soap:Body>'
        postdata += '</soap:Envelope>'
        console.log(postdata)
        axios({
          method: 'POST',
          url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleGetWorkStatus).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
      // $.ajax({
      //   url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
      //   type: 'POST',
      //   dataType: 'text',
      //   contentType: 'application/text;charset=utf-8',
      //   data: postdata,
      //   success: function (result) {
      //     console.log(JSON.stringify(result))
      //   },
      //   error: function (XMLHttpRequest, textStatus, errorThrown) {
      //     // 状态码
      //     console.log(XMLHttpRequest.status)
      //     // 状态
      //     console.log(XMLHttpRequest.readyState)
      //     // 错误信息
      //     console.log(textStatus)
      //   }
      // })
      // axios.get('../../static/mock/workstatus.json').then(this.handleGetWorkStatus)
    },
    getLeaveType () {
      axios.get('../../static/mock/leavetype.json').then(this.handleGetLeaveType)
    },
    // 技术平台类型
    handleGetTechnologyPlatformType (res) {
      if (res.data.status === '0' && res.data) {
        this.technologyPlatformList = res.data.result
        this.timesheetObj.technologyPlatformType = '1'
      }
    },
    // 工作状态
    handleGetWorkStatus (res) {
      if (res.data.indexOf('<String>') !== -1) {
        try {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            // var bbb = sss.replace(/\\/g,"")
            let processData = eval('(' + sliceData + ')')
            this.workStatusList = processData.rows
            this.timesheetObj.workState = '1'
            console.log(JSON.stringify(this.workStatusList))
          } else {
            console.log(sliceData)
          }
        } catch (e) {
          console.log(e)
        }
      }
      // console.log(res.data)
      // if (res.data.status === '0' && res.data) {
      //   this.workStatusList = res.data.result
      //   this.timesheetObj.workState = '1'
      // }
    },
    // 请假类型
    handleGetLeaveType (res) {
      if (res.data.status === '0' && res.data) {
        this.leaveTypeList = res.data.result
        this.timesheetObj.askleaveTypes = '1'
      }
    },
    // 监听技术平台类型input事件
    handleTechnologyPlatformType () {
      console.log(this.timesheetObj.technologyPlatformType)
    },
    // 监听工作状态input事件
    handleWorkStatus () {
      if (this.timesheetObj.workState === '7') {
        this.isShow = false
        this.timesheetObj.workHours = ''
        this.timesheetObj.overTime = ''
        this.timesheetObj.workContent = ''
      } else {
        this.isShow = true
        this.timesheetObj.leaveTime = ''
        this.timesheetObj.leaveReason = ''
      }
    },
    // 监听请假类型input事件
    handleLeaveType () {
      // console.log(this.timesheetObj.askleaveTypes)
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
  }
}
</script>

<style lang="stylus" scoped>
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.4rem .2rem;
</style>
