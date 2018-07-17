<template>
<form ref="addForm" :modle="timesheetObj" class="formBody"  method="post">
  <mu-raised-button label="删除" class="isBtnDelete"  @click="handleDeleteTimesheetClick" primary/>
  <mu-card class="timesheet-card">
    <div class="timesheet-panel">
      <i class="material-icons">card_travel</i>
      <div class="timesheet-content">
        <label class="lbl-title">技术平台</label>
        <select
          class="timesheet-select"
          name=""
          v-model="timesheetObj.techplatform_type"
          :defTPT="defTPT"
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
          :defProject="defProject"
          id="projectType"
          @change="handleProjectInput($event)"
        >
          <option
            v-for = "(item,index) in projectObjList"
            :value="item.project_id"
            :title="item.project_name"
            :dataGroupLeaderId="item.group_leader_id"
            :key="index"
            >{{item.project_name}}</option>
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
          id="Workstate_Type"
          class="timesheet-select"
          v-model="timesheetObj.workstate_type"
          :defWorkStatus="defWorkStatus"
          @change="handleWorkStatusInput"
        >
          <option
            v-for = "(item,index) in workStatusList"
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
    <div id='TP_Normal_Time' class="timesheet-panel" v-show="isShow">
      <i class="material-icons">alarm_on</i>
      <div class="timesheet-content">
        <label class="lbl-title">工时</label>
        <input id="Normal_Time"
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
    <div id='TP_Overwork_Time' class="timesheet-panel" v-show="isShow">
      <i class="material-icons">alarm_add</i>
      <div class="timesheet-content">
        <label class="lbl-title">加班工时</label>
        <input
          type="text"
          maxlength="3"
          id="Overwork_Time"
          class="timesheet-input"
          v-model="timesheetObj.overwork_time"
        />
        <div>
          <hr class="mu-text-field-line">
        </div>
      </div>
    </div>
    <div id="TP_Job_Content" class="timesheet-panel" v-show="isShow">
      <i class="material-icons">content_paste</i>
      <div class="timesheet-content">
        <label class="lbl-title">工作内容</label>
        <textarea
          name="name"
          rows="2"
          id="Job_Content"
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
    <div id="TP_Askleave_Type" class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">developer_board</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假类型</label>
        <select
          id="Askleave_Type"
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
    <div id="TP_Askleave_Time" class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">alarm_off</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假工时</label>
        <input
          id="Askleave_Time"
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
    <div id="TP_Askleave_Reason" class="timesheet-panel" v-show="!isShow">
      <i class="material-icons">content_paste</i>
      <div class="timesheet-content">
        <label class="lbl-title">请假理由</label>
        <textarea
          id="Askleave_Reason"
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
    <div class="timesheet-panel" style="display:none;">
      <input
        type="text"
        class="timesheet-input"
        v-model="timesheetObj.check_status"
        :defCheckStatus="defCheckStatus"
      />
    </div>
  </mu-card>
</form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  props: {
    'currentDate': String
  },
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
        user_id: '',
        user_name: '',
        project_id: '',
        project_name: '',
        techplatform_type: '1',
        workstate_type: '1',
        date: '',
        normal_time: '8',
        overwork_time: '',
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
      // axios.get('../../attendance/mock/technologyplatformtype.json').then(this.handleGetTechnologyPlatformType)
      try {
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryDicList xmlns:m='http://webservice.attence.com/'><type_id type='String'>jishupingtai</type_id></m:queryDicList></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: this.baseUrl,
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleGetTechnologyPlatformType).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 自定义处理技术平台
    defTPT (e) {
      this.timesheetObj.techplatform_type = e
    },
    // 自定义处理项目
    defProject (pId, pName, checkId) {
      console.log(pId, pName, checkId)
      this.projectType = pId
      this.timesheetObj.project_id = pId
      this.timesheetObj.project_name = pName
      this.timesheetObj.check_id = checkId
    },
    defWorkStatus (workstateType, askleaveType, askleaveTime, askleaveReason, normalTime, overworkTime, jobContent) {
      if (workstateType === '7') {
        this.isShow = false
        this.timesheetObj.normal_time = ''
        this.timesheetObj.overwork_time = ''
        this.timesheetObj.job_content = ''
        this.timesheetObj.askleave_type = askleaveType
        this.timesheetObj.askleave_time = askleaveTime
        this.timesheetObj.askleave_reason = askleaveReason
        this.timesheetObj.workstate_type = workstateType
      } else {
        this.isShow = true
        this.timesheetObj.askleave_time = ''
        this.timesheetObj.askleave_reason = ''
        this.timesheetObj.askleave_type = ''
        this.timesheetObj.workstate_type = workstateType
        this.timesheetObj.normal_time = normalTime
        this.timesheetObj.overwork_time = overworkTime
        this.timesheetObj.job_content = jobContent
      }
    },
    defCheckStatus (checkStatus) {
      if (checkStatus === '3') {
        checkStatus = '1'
      }
      this.timesheetObj.check_status = checkStatus
    },
    // 获取项目名称
    getProject () {
      try {
        let userId = sessionStorage.getItem('user_id')
        if (userId) {
          let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserProjectList xmlns:m='http://webservice.attence.com/'><empId type='String'>${userId}</empId></m:queryUserProjectList></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
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
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryDicList xmlns:m='http://webservice.attence.com/'><type_id type='String'>workstate</type_id></m:queryDicList></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: this.baseUrl,
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleGetWorkStatus).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 获取请假类型
    getLeaveType () {
      // axios.get('../../attendance/mock/leavetype.json').then(this.handleGetLeaveType)
      try {
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryDicList xmlns:m='http://webservice.attence.com/'><type_id type='String'>qingjialeixing</type_id></m:queryDicList></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: this.baseUrl,
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleGetLeaveType).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 处理技术平台类型
    handleGetTechnologyPlatformType (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let processData = (new Function('return' + sliceData))()
            this.technologyPlatformList = processData.rows
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
      // if (res.data.status === '0' && res.data) {
      //   this.technologyPlatformList = res.data.result
      //   // this.timesheetObj.techplatform_type = '1'
      // }
    },
    // 处理项目名称
    handleGetProjectType (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let processData = (new Function('return' + sliceData))()
            this.projectObjList = processData.rows
            if (this.timesheetTitle === '添加工时') {
              this.projectType = this.projectObjList[0].project_id
              this.timesheetObj.project_id = this.projectObjList[0].project_id
              this.timesheetObj.project_name = this.projectObjList[0].project_name
              this.timesheetObj.check_id = this.projectObjList[0].group_leader_id
            }
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
            // this.timesheetObj.workstate_type = '1'
            // this.timesheetObj.askleave_type = ''
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
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let processData = (new Function('return' + sliceData))()
            this.leaveTypeList = processData.rows
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
      // if (res.data.status === '0' && res.data) {
      //   this.leaveTypeList = res.data.result
      //   // this.timesheetObj.askleave_type = '1'
      // }
    },
    // 监听技术平台类型input事件
    handleTechnologyPlatformTypeInput () {
      console.log(this.timesheetObj.techplatform_type)
    },
    // 监听项目名称input事件
    handleProjectInput (e) {
      let _this = e.target
      let projectId = _this.options[_this.selectedIndex].value
      let projectName = _this.options[_this.selectedIndex].title
      let groupLeaderId = _this.options[_this.selectedIndex].getAttribute('dataGroupLeaderId')
      this.timesheetObj.project_id = projectId
      this.timesheetObj.project_name = projectName
      this.timesheetObj.check_id = groupLeaderId
    },
    // 监听工作状态input事件
    handleWorkStatusInput () {
      // console.log(this.timesheetObj.workstate_type)
      if (this.timesheetObj.workstate_type === '7') {
        this.isShow = false
        this.timesheetObj.normal_time = ''
        this.timesheetObj.overwork_time = ''
        this.timesheetObj.job_content = ''
        this.timesheetObj.askleave_type = '1'
      } else {
        this.isShow = true
        this.timesheetObj.askleave_time = ''
        this.timesheetObj.askleave_reason = ''
        this.timesheetObj.askleave_type = ''
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
  created () {
    this.getTechnologyPlatform()
    this.getProject()
    this.getWorkStatus()
    this.getLeaveType()
    this.timesheetObj.date = this.currentDate
    this.timesheetObj.user_id = sessionStorage.getItem('user_id')
    this.timesheetObj.user_name = sessionStorage.getItem('user_name')
    console.log('被创建')
  },
  computed: {
    ...mapState(['timesheetTitle', 'timesheetDate', 'timesheetIsWorkday'])
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
