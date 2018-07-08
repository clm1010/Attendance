<template>
<div>
  <mu-appbar :title="title">
    <mu-icon-button icon="chevron_left" slot="left" to="/attendance" />
    <mu-icon-button icon="check" slot="right" @click="handleSubmit"></mu-icon-button>
  </mu-appbar>
  <mu-paper class="current-date" :zDepth="2">
    <h2>当前日期&nbsp;&nbsp;{{currentDate}}</h2>
  </mu-paper>
  <addworkhoure-timesheet
    v-for="(item,index) in addTimesheetList"
    :current-date='currentDate'
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
  <mu-toast v-if="toast" :message="message" @close="hideToast"/>
  <!-- <button type="button" name="button" @click="handleAddTimesheet('AddworkhoureTimesheet')">添加</button> -->
</div>
</template>

<script>
import axios from 'axios'
import AddworkhoureTimesheet from './components/Timesheet'
export default {
  name: 'Addworkhour',
  components: {
    AddworkhoureTimesheet
  },
  data () {
    return {
      toast: false,
      title: '',
      message: '',
      currentDate: '',
      addTimesheetList: [],
      submitAllTimesheetList: [],
      updateData: []
    }
  },
  methods: {
    getAjaxUpdateTimesheet () {
      // axios.get('../../attendance/mock/timesheet.json').then(this.handleGetUpdateTimesheet)
    },
    handleGetUpdateTimesheet (res) {
      if (res.data.status === '0' && res.data) {
        let result = res.data.result
        for (let i = 1; i < result.length; i++) {
          this.handleAddTimesheet('AddworkhoureTimesheet')
        }
        this.updateData = result
      }
    },
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
    // 提交全部工时表单
    handleSubmit () {
      try {
        this.submitAllTimesheetList = []
        let allNormalTime = 0
        let overworkTime = 0
        let allTime = 0
        // /^[1-9]\d*$/.test(value);
        // console.log(this.addTimesheetList.length)
        for (let i = 0; i < this.addTimesheetList.length; i++) {
          if (this.$refs.addTimesheet[i].timesheetObj.normal_time.replace(/^[1-9]\d*$/g, '')) {
            this.toast = true
            this.message = '请填写正确工时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }
          console.log(this.$refs.addTimesheet[i].timesheetObj.workstate_type)
          allNormalTime += Number(this.$refs.addTimesheet[i].timesheetObj.normal_time)
          overworkTime += Number(this.$refs.addTimesheet[i].timesheetObj.overwork_time)
          allTime += Number(this.$refs.addTimesheet[i].timesheetObj.normal_time) + Number(this.$refs.addTimesheet[i].timesheetObj.overwork_time)
          if (allNormalTime > 11 || overworkTime > 11 || allTime > 11) {
            this.toast = true
            this.message = '全部工时时间或加班工时不能超过12小时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }
          if (this.$refs.addTimesheet[i].timesheetObj.workstate_type !== '7' && !allNormalTime) {
            this.toast = true
            this.message = '请填写工时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }

          if (this.$refs.addTimesheet[i].timesheetObj.workstate_type !== '7' && allNormalTime > 8) {
            this.toast = true
            this.message = '工时不能超过8小时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }

          if (this.$refs.addTimesheet[i].timesheetObj.workstate_type === '7' && !this.$refs.addTimesheet[i].timesheetObj.askleave_time) {
            this.toast = true
            this.message = '请填写请假工时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }

          if (this.$refs.addTimesheet[i].timesheetObj.workstate_type === '7' && this.$refs.addTimesheet[i].timesheetObj.askleave_time.replace(/^[1-9]\d*$/g, '')) {
            this.toast = true
            this.message = '请填写正确请假工时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }
          console.log(Number(this.$refs.addTimesheet[i].timesheetObj.askleave_time))
          if (this.$refs.addTimesheet[i].timesheetObj.workstate_type === '7' && Number(this.$refs.addTimesheet[i].timesheetObj.askleave_time) > 8) {
            this.toast = true
            this.message = '请假工时不能超过8小时！'
            if (this.toastTimer) {
              clearTimeout(this.toastTimer)
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
            return false
          }

          this.submitAllTimesheetList.push(this.$refs.addTimesheet[i].timesheetObj)
        }
        this.handlePOSTSubmit(this.submitAllTimesheetList)
        // this.$router.push('/attendance')
      } catch (e) {
        console.log(e)
      }
    },
    handlePOSTSubmit (data) {
      try {
        let userId = sessionStorage.getItem('user_id')
        if (userId && data != null) {
          console.log(JSON.stringify(data))
          let dataStr = JSON.stringify(data)
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:saveAttendance xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><date type='String'>${this.currentDate}</date><dataStr>${dataStr}</dataStr></m:saveAttendance></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: '/api',
            // url: '/attence/webService/AttenceService?wsdl',
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleGetPOSTSubmit).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('userId: ' + userId)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleGetPOSTSubmit (res) {
      console.log(res)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
  created () {
    this.addTimesheetList = []
    this.currentDate = this.$route.params.date
    this.title = this.$route.params.title
    this.currentDate = this.currentDate.replace(/\//g, '-')
    this.handleAddTimesheet('AddworkhoureTimesheet')
    this.getAjaxUpdateTimesheet()
  },
  updated () {
    if (this.updateData.length !== 0) {
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        this.$refs.addTimesheet[i].defTPT(this.updateData[i].techplatform_type)
        this.$refs.addTimesheet[i].defWorkStatus(this.updateData[i].workstate_type)
        // this.$refs.addTimesheet[j].defProject(this.updateData[j].project_id, this.updateData[j].project_name, this.updateData[j].check_id)
        // console.log(this.$refs.addTimesheet[j].timesheetObj.user_name)
        // console.log(this.$refs.addTimesheet[j].$el)
      }
      // for (let j = 0; j < this.addTimesheetList.length; j++) {
      //   console.log(this.$refs.addTimesheet[j].$el[0])
      //   this.$refs.addTimesheet[j].$el[0].style.display = 'none'
      // }
    }
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
      >>> .isBtnDelete
        display: none;
  .mu-toast
    text-align:center;
    background-color:rgba(33,150,240,.8);
    right:0;
    left:0;
    margin:auto;
    bottom:3rem;
    font-size:.35rem;
    width:95%;
</style>
