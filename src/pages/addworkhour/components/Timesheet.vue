<template>
<form ref="addForm" :modle="timesheetObj" class="formBody"  method="post">
  <mu-raised-button label="删除" class="demo-raised-button"  @click="handleDeleteTimesheetClick" primary/>
  <mu-card class="timesheet-card">
    <div class="timesheet-panel">
      <i class="material-icons">card_travel</i>
      <div class="timesheet-content">
        <label class="lbl-title">技术平台</label>
        <select
          class="timesheet-select"
          name=""
          v-model="timesheetObj.techplatform_type"
          @change="handleTechnologyPlatformTypeInput"
        >
          <option
            v-for = "(item,index) in technologyPlatformList"
            :value="item.value"
            :title="item.name"
            :key="index"
            >{{item.name}}</option>
        </select>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel">
      <i class="material-icons">card_travel</i>
      <div class="timesheet-content">
        <label class="lbl-title">项目名称</label>
        <select
          class="timesheet-select"
          name=""
          v-model="projectType"
          id="projectType"
          @change="handleProjectInput($event)"
        >
          <option
            v-for = "(item,index) in projectObjList"
            :value="item.project_id"
            :title="item.project_name"
            :dataGroupLeaderId="item.group_leader_id"
            :key="index"
            >{{item.project_id}}</option>
        </select>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel">
      <i class="material-icons">developer_board</i>
      <div class="timesheet-content">
        <label class="lbl-title">工作状态</label>
        <select
          class="timesheet-select"
          v-model="timesheetObj.workstate_type"
          @change="handleWorkStatusInput"
        >
          <option
            v-for = "(item,index) in workStatusList"
            :value="item.value"
            :title="item.name"
            :dataGroupLeaderId="item.group_leader_id"
            :key="index"
            >{{item.name}}</option>
        </select>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="isShow">
      <i class="material-icons">alarm_on</i>
      <div class="timesheet-content">
        <label class="lbl-title">工时</label>
        <input
          type="text"
          maxlength="3"
          class="timesheet-input"
          v-model="timesheetObj.normal_time"
        />
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="isShow">
      <i class="material-icons">alarm_add</i>
      <div class="timesheet-content">
        <label class="lbl-title">加班工时</label>
        <input
          type="text"
          maxlength="3"
          class="timesheet-input"
          v-model="timesheetObj.overwork_time"
        />
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="isShow">
      <i class="material-icons">content_paste</i>
      <div class="timesheet-content">
        <label class="lbl-title">工作内容</label>
        <textarea
          name="name"
          rows="2"
          class="timesheet-input"
          maxlength="300"
          v-model="timesheetObj.job_content"
        >
        </textarea>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">developer_board</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假类型</label>
        <select
          class="timesheet-select"
          name=""
          v-model="timesheetObj.askleave_type"
          @change="handleAskleaveTypeInput"
        >
          <option
            v-for = "(item,index) in leaveTypeList"
            :value="item.value"
            :title="item.name"
            :key="index"
            >{{item.name}}</option>
        </select>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">alarm_off</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假工时</label>
        <input
          type="text"
          maxlength="3"
          class="timesheet-input"
          v-model="timesheetObj.askleave_time"
        />
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">content_paste</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假理由</label>
        <textarea
          name="name"
          rows="2"
          class="timesheet-input"
          maxlength="300"
          v-model="timesheetObj.askleave_reason"
        >
        </textarea>
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
      <!-- <mu-select-field
        v-model="timesheetObj.techplatform_type"
        ref="dataTechnologyPlatform"
        hintText="技术平台"
        label="技术平台"
        icon="card_travel"
        labelFloat
        fullWidth
        @input="handleTechnologyPlatformTypeInput"
      >
      <mu-menu-item v-for = "(item,index) in technologyPlatformList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-select-field
        v-model="timesheetObj.project_id"
        ref="dataProjectType"
        hintText="项目名称"
        label="项目名称"
        icon="card_travel"
        labelFloat
        fullWidth
        @input="handleProjectInput"
        @open="handleProject"
        id="mm_project"
      >
      <mu-menu-item style="border:1px solid red;"
        v-for = "(item,index) in projectObjList"
        :label ="item.group_leader_id"
        :value="item.project_id"
        :title="item.project_id"
        :key="index"/>
      </mu-select-field>
      <mu-select-field
        v-model="timesheetObj.workstate_type"
        hintText="工作状态"
        label="工作状态"
        icon="developer_board"
        labelFloat
        fullWidth
        @input="handleWorkStatusInput"
      >
      <mu-menu-item v-for = "(item,index) in workStatusList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-text-field
        v-model="timesheetObj.normal_time"
        v-show="isShow"
        hintText="工时"
        label="工时"
        icon="alarm_on"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.overwork_time"
        v-show="isShow"
        hintText="加班时间"
        label="加班时间"
        icon="alarm_add"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.job_content"
        v-show="isShow"
        hintText="工作内容"
        label="工作内容"
        multiLine
        icon="content_paste"
        labelFloat
        fullWidth
      />
      <mu-select-field
        v-model="timesheetObj.askleave_type"
        v-show="!isShow"
        hintText="请假类型"
        label="请假类型"
        icon="developer_board"
        labelFloat
        fullWidth
        @input="handleLeaveTypeInput"
      >
        <mu-menu-item v-for = "(item,index) in leaveTypeList" :value="item.value" :title="item.name" :key="index" />
      </mu-select-field>
      <mu-text-field
        v-model="timesheetObj.askleave_time"
        v-show="!isShow"
        hintText="请假工时"
        label="请假工时"
        icon="alarm_off"
        labelFloat
        fullWidth
      />
      <mu-text-field
        v-model="timesheetObj.askleave_reason"
        v-show="!isShow"
        hintText="请假理由"
        label="请假理由"
        multiLine
        icon="content_paste"
        labelFloat
        fullWidth
      /> -->
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
      projectObjList: [],
      workStatusList: [],
      leaveTypeList: [],
      projectType: '',
      timesheetObj: {
        project_id: '',
        project_name: '',
        techplatform_type: '',
        workstate_type: '',
        date: '',
        normal_time: '',
        overTime: '',
        job_content: '',
        askleave_type: '',
        askleave_time: '',
        askleave_reason: '',
        check_status: '1',
        check_id: ''
      }
    }
  },
  methods: {
    // 获取技术平台
    getTechnologyPlatform () {
      axios.get('../../attendance/mock/technologyplatformtype.json').then(this.handleGetTechnologyPlatformType)
    },
    // 获取项目名称
    getProject () {
      try {
        let userId = sessionStorage.getItem('user_id')
        if (userId) {
          let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserProjectList xmlns:m='http://webservice.attence.com/'><empId type='String'>${userId}</empId></m:queryUserProjectList></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: '/api',
            // url: '/attence/webService/AttenceService?wsdl',
            headers: { 'content-type': 'application/text; charset=utf-8' },
            data: postdata
          }).then(this.handleGetProjectType).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('user_id:' + userId)
        }
      } catch (e) {
        console.log(e)
      }
      // axios.get('../../attendance/mock/technologyplatformtype.json').then(this.handleGetTechnologyPlatformType)
    },
    // 工作状态
    getWorkStatus () {
      try {
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryWorkState xmlns:m='http://webservice.attence.com/'></m:queryWorkState></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: '/api',
          // url: '/attence/webService/AttenceService?wsdl',
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleGetWorkStatus).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
    },
    getLeaveType () {
      axios.get('../../attendance/mock/leavetype.json').then(this.handleGetLeaveType)
    },
    // 处理技术平台类型
    handleGetTechnologyPlatformType (res) {
      if (res.data.status === '0' && res.data) {
        this.technologyPlatformList = res.data.result
        this.timesheetObj.techplatform_type = '1'
      }
    },
    // 处理项目名称
    handleGetProjectType (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let processData = (new Function('return' + sliceData))()
            this.projectObjList = processData.rows
            this.projectType = this.projectObjList[0].project_id
            this.timesheetObj.project_id = this.projectObjList[0].project_id
            this.timesheetObj.project_name = this.projectObjList[0].project_name
            this.timesheetObj.check_id = this.projectObjList[0].group_leader_id
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 处理工作状态
    handleGetWorkStatus (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let processData = (new Function('return' + sliceData))()
            this.workStatusList = processData.rows
            this.timesheetObj.workstate_type = '1'
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 请假类型
    handleGetLeaveType (res) {
      if (res.data.status === '0' && res.data) {
        this.leaveTypeList = res.data.result
        this.timesheetObj.askleave_type = '1'
      }
    },
    // 监听技术平台类型input事件
    handleTechnologyPlatformTypeInput () {
      console.log(this.timesheetObj.techplatform_type)
    },
    // 监听项目名称input事件
    handleProjectInput (e) {
      let _this = e.target
      let projectId = _this.options[_this.selectedIndex].text
      let projectName = _this.options[_this.selectedIndex].title
      let groupLeaderId = _this.options[_this.selectedIndex].getAttribute('dataGroupLeaderId')
      this.timesheetObj.project_id = projectId
      this.timesheetObj.project_name = projectName
      this.timesheetObj.check_id = groupLeaderId
    },
    // 监听工作状态input事件
    handleWorkStatusInput () {
      if (this.timesheetObj.workstate_type === '7') {
        this.isShow = false
        this.timesheetObj.normal_time = ''
        this.timesheetObj.overwork_time = ''
        this.timesheetObj.job_content = ''
      } else {
        this.isShow = true
        this.timesheetObj.askleave_time = ''
        this.timesheetObj.askleave_reason = ''
      }
    },
    // 监听请假类型input事件
    handleAskleaveTypeInput () {
      console.log(this.timesheetObj.askleave_type)
    },
    handleDeleteTimesheetClick (event) {
      this.$emit('deleteTimesheet', event.target.offsetParent.parentNode)
    }
  },
  mounted () {
    this.getTechnologyPlatform()
    this.getProject()
    this.getWorkStatus()
    this.getLeaveType()
    console.log('被创建')
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.4rem .2rem;
  .timesheet-panel
    width: 100%;
    padding: .1rem 0;
    i
      width: 10%;
      display: inline-block;
      text-align: center;
      color: $my-color3;
    .timesheet-content
      width: 85%;
      display: inline-block;
      .lbl-title
        color: $my-color3;
      .timesheet-select
        width: 100%;
        outline: none;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        padding: .1rem 0;
        background: url("~@/assets/img/arrow.png") no-repeat scroll right center transparent;
      .timesheet-input
        width: 100%;
        padding: .1rem 0;
</style>
