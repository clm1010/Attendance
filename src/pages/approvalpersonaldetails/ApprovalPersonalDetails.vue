<template>
  <div>
    <approval-personal-details-header></approval-personal-details-header>
    <!-- <form ref="personalDetailsForm" :modle="personalDetailsObj" class="formBody"> -->
      <mu-card class="personal-details-card">
          <mu-text-field
            v-model="personalDetailsObj.techplatformType"
            hintText="技术平台"
            label="技术平台"
            icon="access_time"
            labelFloat
            fullWidth
            disabled
          style="display:none"/>
          <mu-text-field
            v-model="personalDetailsObj.userName"
            hintText="姓名"
            label="姓名"
            icon="access_time"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.dateStr"
            hintText="日期"
            label="日期"
            icon="access_time"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.projectName"
            hintText="项目名称"
            label="项目名称"
            icon="card_travel"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.workstateType"
            hintText="工作状态"
            label="工作状态"
            icon="card_travel"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.normalTime"
            hintText="工时"
            label="工时"
            icon="alarm_on"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.overworkTime"
            hintText="加班工时"
            label="加班工时"
            icon="alarm_add"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.jobContent"
            hintText="工作内容"
            label="工作内容"
            multiLine
            icon="content_paste"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.askleaveType"
            hintText="请假类型"
            label="请假类型"
            multiLine
            icon="developer_board"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.askleaveTime"
            hintText="请假工时"
            label="请假工时"
            multiLine
            icon="alarm_off"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.askleaveReason"
            hintText="请假理由"
            label="请假理由"
            multiLine
            icon="content_paste"
            labelFloat
            fullWidth
            disabled
          />
          <template v-if="this.personalDetailsObj.checkStatus === '1'">
            <div class="checkstatus-panel">
              <mu-flat-button label="待审批工时" class="demo-flat-button" icon="mail" color='#3f3fff'/>
            </div>
          </template>
          <template v-if="this.personalDetailsObj.checkStatus === '2'">
            <div class="checkstatus-panel">
              <mu-flat-button label="已批准工时" class="demo-flat-button" icon="check" color='#51db51'/>
            </div>
          </template>
          <template v-if="this.personalDetailsObj.checkStatus === '3'">
            <div class="checkstatus-panel">
              <mu-flat-button label="被拒绝工时" class="demo-flat-button" icon="close" color='#ff0400'/>
            </div>
          </template>
          <mu-card-actions class="personal-details-footer" v-show='isShow'>
            <mu-raised-button  type="button" label="通过" @click="handleSubmitApprovalPD('2')" class="demo-raised-button" primary/>
            <mu-raised-button type="button" label="拒绝" @click="handleSubmitApprovalPD('3')" class="demo-raised-button" secondary/>
          </mu-card-actions>
      </mu-card>
    <!-- </form> -->
  </div>
</template>

<script>
import ApprovalPersonalDetailsHeader from './components/Header'
import axios from 'axios'
export default {
  name: 'ApprovalPersonalDetails',
  components: {
    ApprovalPersonalDetailsHeader
  },
  data () {
    return {
      isShow: true,
      personalDetailsObj: []
    }
  },
  methods: {
    getApprovalPersonalDetails () {
      try {
        let pdId = this.$route.params.pdid
        if (pdId !== '') {
          let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryAttendanceDetail xmlns:m='http://webservice.attence.com/'><id type='String'>${pdId}</id></m:queryAttendanceDetail></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
            headers: { 'content-type': 'application/text; charset=utf-8' },
            data: postdata
          }).then(this.handleGetApprovalPersonalDetails).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('pdId: ' + pdId)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleGetApprovalPersonalDetails (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            this.personalDetailsObj = handleData
            console.log(JSON.stringify(this.personalDetailsObj))
            if (this.personalDetailsObj.checkStatus !== '1') {
              this.isShow = false
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
    handleSubmitApprovalPD (pas) {
      try {
        let id = this.personalDetailsObj.id
        console.log(JSON.stringify(this.personalDetailsObj))
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:updateAttendByIds xmlns:m='http://webservice.attence.com/'><ids type='String'>${id}</ids><status>${pas}</status></m:updateAttendByIds></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: this.baseUrl,
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleSubmitAPDRes).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
      // console.log(e.target)
      this.$router.go(-1)
    }
  },
  handleSubmitAPDRes (res) {
    console.log(res)
  },
  mounted () {
    this.getApprovalPersonalDetails()
  }
}
</script>

<style lang="stylus" scoped>
  .personal-details-card
    margin:.2rem;
    .personal-details-footer
      text-align: center;
  .checkstatus-panel
    text-align: center;
</style>
