<template>
  <div>
    <approval-personal-details-header></approval-personal-details-header>
    <form ref="personalDetailsForm" :modle="personalDetailsObj" class="formBody" @submit.prevent="handleSubmit">
      <mu-card class="personal-details-card">
          <mu-text-field
            v-model="personalDetailsObj.attenDate"
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
            v-model="personalDetailsObj.askleaveType"
            hintText="请假工时"
            label="请假工时"
            multiLine
            icon="alarm_off"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.askleaveType"
            hintText="请假理由"
            label="请假理由"
            multiLine
            icon="content_paste"
            labelFloat
            fullWidth
            disabled
          />
          <mu-card-actions class="personal-details-footer">
            <mu-raised-button type="submit" label="通过" class="demo-raised-button" primary/>
            <mu-raised-button type="submit" label="拒绝" class="demo-raised-button" secondary/>
          </mu-card-actions>
      </mu-card>
    </form>
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
            url: '/api',
            // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
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
    handleSubmit (e) {
      console.log(e.target)
      console.log(JSON.stringify(this.personalDetailsObj))
      this.$router.go(-1)
    }
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
</style>
