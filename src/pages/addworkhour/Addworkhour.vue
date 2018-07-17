<template>
<div>
  <mu-appbar>{{this.timesheetTitle}}
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
import { mapState } from 'vuex'
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
      message: '',
      currentDate: '',
      addTimesheetList: [],
      submitAllTimesheetList: [],
      updateData: []
    }
  },
  methods: {
    getAjaxUpdateTimesheet () {
      try {
        let userId = sessionStorage.getItem('user_id')
        if (userId) {
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserAttendanceList xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><date type='String'>${this.currentDate}</date></m:queryUserAttendanceList></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleGetUpdateTimesheet).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('userId: ' + userId)
        }
      } catch (e) {
        console.log(e)
      }
      // axios.get('../../attendance/mock/timesheet.json').then(this.handleGetUpdateTimesheet)
    },
    handleGetUpdateTimesheet (res) {
      console.log(res)
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            let result = handleData.rows
            for (let i = 0; i < result.length; i++) {
              console.log(result)
              this.handleAddTimesheet('AddworkhoureTimesheet')
              this.updateData = result
              console.log(this.updateData)
              this.$nextTick(function () {
                this.updateForm()
              })
            }
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {}
      // if (res.data.status === '0' && res.data) {
      //   let result = res.data.result
      //   for (let i = 0; i < result.length; i++) {
      //     this.handleAddTimesheet('AddworkhoureTimesheet')
      //   }
      //   this.updateData = result
      //   this.$nextTick(function () {
      //     this.updateForm()
      //   })
      //
      // }
    },
    handleAddTimesheet (addworkhoureTimesheet) {
      this.addTimesheetList.push({
        addworkhoureTimesheet
      })
    },
    // 同一个项目、同一个工作状态不能重复
    verifyProjectWorkStatus () {
      let verifyFalg = true
      if (this.addTimesheetList.length > 1) {
        let temporary = []
        let tempworkstate = []
        for (let i = 0; i < this.addTimesheetList.length; i++) {
          temporary.push(this.$refs.addTimesheet[i].timesheetObj.project_id)
          tempworkstate.push(this.$refs.addTimesheet[i].timesheetObj.workstate_type)
        }
        // if((new Set(temporary)).size != temporary.length){
        //     alert("数组有重复值")
        // }
        if (temporary.length !== 0) {
          let hashTemporary = {}
          let hashTempworkstate = {}
          for (let i in temporary) {
            if (temporary[i] !== '') {
              if (hashTemporary[temporary[i]] || hashTempworkstate[tempworkstate[i]]) {
                verifyFalg = false
                this.toast = true
                this.message = '同一个项目、同一个工作状态不能重复！'
                if (this.toastTimer) {
                  clearTimeout(this.toastTimer)
                }
                this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
                return false
              }
            }
            hashTemporary[temporary[i]] = true
            hashTempworkstate[tempworkstate[i]] = true
          }
        }
      }
      return verifyFalg
    },
    // 正常工时、和请假工时合计不得超过8小时
    verifyNormalAskleave () {
      let verifyFalg = true
      let allNormalAskleaveTime = 0
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        allNormalAskleaveTime += Number(this.$refs.addTimesheet[i].timesheetObj.normal_time) + Number(this.$refs.addTimesheet[i].timesheetObj.askleave_time)
      }
      if (Boolean(this.timesheetIsWorkday) && allNormalAskleaveTime !== 8) {
        this.toast = true
        this.message = '正常工时和请假工时合计不得超过8小时！'
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
        verifyFalg = false
        return false
      }
      console.log(verifyFalg)
      return verifyFalg
    },
    // 加班工时合计 不能超过3小时
    verifyOvertime () {
      let verifyFalg = true
      let allOverwork = 0
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        allOverwork += this.$refs.addTimesheet[i].timesheetObj.overwork_time
      }
      if (Boolean(this.timesheetIsWorkday) && allOverwork > 3) {
        this.toast = true
        this.message = '加班工时合计 不能超过3小时！'
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
        verifyFalg = false
        return false
      }
      return verifyFalg
    },
    verifyIsKoNormalTime () {
      let verifyFalg = true
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        if (Boolean(this.timesheetIsWorkday) && this.$refs.addTimesheet[i].timesheetObj.workstate_type !== '7' && this.$refs.addTimesheet[i].timesheetObj.normal_time.replace(/^[1-9]\d*$/g, '')) {
          this.toast = true
          this.message = '请填写正确工时！'
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
          verifyFalg = false
          return false
        }
      }
      return verifyFalg
    },
    verifyIsKoOverworkTime () {
      let verifyFalg = true
      for (let i = 0; i < this.addTimesheetList.length; i++) {
        if (this.$refs.addTimesheet[i].timesheetObj.workstate_type !== '7' && this.$refs.addTimesheet[i].timesheetObj.overwork_time.replace(/^[1-9]\d*$/g, '')) {
          this.toast = true
          this.message = '请填写正确加班工时！'
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
          verifyFalg = false
          return false
        }
      }
      return verifyFalg
    },
    // 节假日
    // 节假日只能填写加班工时
    verifyHolidayOvertime () {
      let verifyFalg = true
      for (var i = 0; i < this.addTimesheetList.length; i++) {
        if ((Boolean(!this.timesheetIsWorkday) && this.$refs.addTimesheet[i].timesheetObj.normal_time !== '') || (Boolean(!this.timesheetIsWorkday) && this.$refs.addTimesheet[i].timesheetObj.workstate_type === '7')) {
          this.toast = true
          this.message = '节假日只能填写加班工时！'
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
          verifyFalg = false
          return false
        }
      }
      return verifyFalg
    },
    // 节假日工时不能超过11小时！
    verifyHolidayOvertimeExceed11 () {
      let verifyFalg = true
      let allOverwork = 0
      for (var i = 0; i < this.addTimesheetList.length; i++) {
        allOverwork += this.$refs.addTimesheet[i].timesheetObj.overwork_time
      }
      if (Boolean(!this.timesheetIsWorkday) && allOverwork > 11) {
        this.toast = true
        this.message = '节假日工时不能超过11小时！'
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
        verifyFalg = false
        return false
      }
      return verifyFalg
    },
    verifyIsEmpty () {
      let verifyFalg = true
      let isProject = false
      let msg = ''
      for (var i = 0; i < this.addTimesheetList.length; i++) {
        if (this.$refs.addTimesheet[i].timesheetObj.project_id === '') {
          msg = '请选择项目名称！'
          isProject = true
        }
      }
      if (isProject) {
        this.toast = true
        this.message = msg
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
        verifyFalg = false
        return false
      }
      return verifyFalg
    },
    // 监听删除当前工时表单事件
    handleDeleteTimesheet (thisForm) {
      if (this.addTimesheetList.length > 1) {
        this.addTimesheetList.splice(thisForm, 1)
      }
    },
    // 提交全部工时表单
    handleSubmit () {
      console.log('提交全部工时表单')
      console.log(this.addTimesheetList.length)
      try {
        this.submitAllTimesheetList = []
        if (this.verifyProjectWorkStatus() && this.verifyNormalAskleave() && this.verifyIsKoNormalTime() && this.verifyOvertime() && this.verifyIsKoOverworkTime() && this.verifyHolidayOvertime() && this.verifyHolidayOvertimeExceed11() && this.verifyIsEmpty()) {
          for (let i = 0; i < this.addTimesheetList.length; i++) {
            this.submitAllTimesheetList.push(this.$refs.addTimesheet[i].timesheetObj)
          }
          this.handlePOSTSubmit(this.submitAllTimesheetList)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handlePOSTSubmit (data) {
      console.log(JSON.stringify(data))
      try {
        let userId = sessionStorage.getItem('user_id')
        if (userId && data != null) {
          console.log(JSON.stringify(data))
          let dataStr = JSON.stringify(data)
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:saveAttendance xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><date type='String'>${this.currentDate}</date><dataStr>${dataStr}</dataStr></m:saveAttendance></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleGetPOSTSubmitInfo).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('userId: ' + userId)
        }
      } catch (e) {
        console.log(e)
      }
      this.$router.push('/attendance')
    },
    handleGetPOSTSubmitInfo (res) {
      console.log(res)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    updateForm () {
      console.log('更新')
      if (this.updateData.length !== 0) {
        try {
          // console.log(JSON.stringify(this.updateData))
          for (let i = 0; i < this.addTimesheetList.length; i++) {
            this.$refs.addTimesheet[i].defTPT(this.updateData[i].techplatform_type)
            this.$refs.addTimesheet[i].defProject(this.updateData[i].project_id, this.updateData[i].project_name, this.updateData[i].check_id)
            this.$refs.addTimesheet[i].defWorkStatus(this.updateData[i].workstate_type, this.updateData[i].askleave_type, this.updateData[i].askleave_time, this.updateData[i].askleave_reason, this.updateData[i].normal_time, this.updateData[i].overwork_time, this.updateData[i].job_content)
            this.$refs.addTimesheet[i].defCheckStatus(this.updateData[i].check_status)
          }
          for (let j = 0; j < this.addTimesheetList.length; j++) {
            // this.$refs.addTimesheet[j].$el.className += ' updateForm'
            this.$refs.addTimesheet[j].$el[0].style.display = 'none'
            console.log(this.updateData[j].check_status)
            if (this.updateData[j].check_status === '1' || this.updateData[j].check_status === '2') {
              this.$refs.addTimesheet[j].$el[1].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[2].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[3].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[4].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[5].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[6].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[7].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[8].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[9].disabled = 'disabled'
              this.$refs.addTimesheet[j].$el[10].disabled = 'disabled'
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  mounted () {
    this.addTimesheetList = []
    this.currentDate = this.timesheetDate
    if (this.timesheetTitle === '添加工时') {
      this.handleAddTimesheet('AddworkhoureTimesheet')
      console.log(1)
    }
    if (this.timesheetTitle === '修改工时') {
      this.getAjaxUpdateTimesheet()
    }
    // this.title = this.$route.params.title
    // this.title =
    // this.currentDate = this.currentDate.replace(/\//g, '-')
  },
  computed: {
    ...mapState(['timesheetTitle', 'timesheetDate', 'timesheetIsWorkday'])
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
