<template>
<div>
  <attendance-header></attendance-header>
  <!-- agoDayHide='1517483961'
  futureDayHide='1536054400' -->
  <attendance-calendar ref="AttendanceCalendar" :markDateMore="arr" v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></attendance-calendar>
  <div class="working-hours-desc">
    <h3>工时状态说明</h3>
    <mu-flexbox>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">check</i><span>已批准工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">mail_outline</i><span>待审批工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">clear</i><span>被拒绝工时</span>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
  <mu-toast v-if="toast" :message="message" @close="hideToast"/>
</div>
</template>

<script>
import axios from 'axios'
import AttendanceHeader from './components/Header'
import AttendanceCalendar from './components/Calendar'
export default {
  name: 'Attendance',
  components: {
    AttendanceHeader,
    AttendanceCalendar
  },
  data () {
    return {
      toast: false,
      arr: []
    }
  },
  methods: {
    clickDay (dateparams, e) {
      let isCurrent = e.currentTarget.querySelector('li').className
      if (isCurrent.indexOf('mark1') !== -1 || isCurrent.indexOf('mark2') !== -1 || isCurrent.indexOf('wh_nextDayShow') !== -1) {
        if (isCurrent.indexOf('mark1') !== -1) {
          console.log(isCurrent)
          this.toast = true
          this.message = '工时审批中'
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
          return false
        }
        if (isCurrent.indexOf('mark2') !== -1) {
          this.toast = true
          this.message = '工时已提交'
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 4000)
          return false
        }
        return false
      }
      if (isCurrent.indexOf('mark3') !== -1) {
        this.$store.dispatch('changeTimesheetTitle', '修改工时')
      } else {
        this.$store.dispatch('changeTimesheetTitle', '添加工时')
      }
      if (isCurrent.indexOf('workday-yes') !== -1) {
        this.$store.dispatch('changeTimesheetIsWorkday', true)
      }
      if (isCurrent.indexOf('workday-no') !== -1) {
        this.$store.dispatch('changeTimesheetIsWorkday', false)
      }
      console.log('选中了', dateparams) // 选中某天
      this.$store.dispatch('changeTimesheetDate', dateparams.replace(/\//g, '-'))
      this.$router.push('/addworkhour')
      // this.$router.push({name: 'Addworkhour'})
    },
    clickToday (dateparams) {
      console.log('跳到了本月', dateparams) // 跳到了本月
    },
    changeDate (dateparams) {
      // console.log(this.arr)
      // this.$toast('切换到的月份为' + dateparams)
      console.log(123)
      // return false
      console.log('左右点击切换月份', dateparams) // 左右点击切换月份
    },
    demo () {
      // this.$refs.Calendar.ChoseMonth('2017-12-12',false); // 跳到12月12日 但是不选中12月12日
      this.$refs.Calendar.ChoseMonth('2017-12-12') // 跳到12月12日
    },
    getAttenDate () {
      // axios.get('./attendance/mock/attendatelist.json').then(this.handleCalendar)
      try {
        let userId = sessionStorage.getItem('user_id')
        let myDate = new Date()
        let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
        let yearMonth = myDate.getFullYear() + '-' + month
        console.log(yearMonth)
        if (userId) {
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserCalendar xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><year_month type='String'>${yearMonth}</year_month></m:queryUserCalendar></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: '/api',
            // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleCalendar).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('user_id' + userId)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handelDate (arry) {
      function format (date) {
        date = new Date(date)
        let index = date.getDate()
        return `${date.getFullYear()}/${date.getMonth() + 1}/${index}`
      }
      for (let i = 0; i < arry.length; i++) {
        arry[i].date = format(arry[i].date)
        if (arry[i].check_status === '1') {
          // console.log(arry[i].check_status)
          // arry[i].setAttribute('className', 'mark1')
          arry[i].className = 'mark1'
        }
        if (arry[i].check_status === '2') {
          // arry[i].setAttribute('className', 'mark2')
          arry[i].className = 'mark2'
        }
        if (arry[i].check_status === '3') {
          // arry[i].setAttribute('className', 'mark3')
          arry[i].className = 'mark3'
        }
        if (arry[i].isworkday === 'true') {
          // arry[i].setAttribute('className', 'workday-yes')
          arry[i].className += ' workday-yes'
        }
        if (arry[i].isworkday === 'false') {
          // arry[i].setAttribute('className', 'workday-no')
          arry[i].className += ' workday-no'
        }
      }
      return arry
    },
    handleCalendar (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            // console.log(JSON.stringify(handleData.rows))
            this.arr = this.handelDate(handleData.rows)
            console.log(JSON.stringify(this.arr))
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }

      if (res.data.status === '0' && res.data) {
        this.arr = this.handelDate(res.data.result)
        console.log(JSON.stringify(this.arr))
      }
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
  mounted () {
    this.getAttenDate()
  }
  // ,
  // activated () {
  //   this.getAttenDate()
  // }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/varibles.styl'
  .wh_container >>>
    .mark1
    .mark2
    .mark3
      position: relative;
      &:before
        width: .5rem;
        height: .5rem;
        position: absolute;
        margin: auto;
        background-position: center center;
        background-repeat: no-repeat;
        content: ' ';
    .mark1
      &:before
          top: .6rem;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url('~@/assets/img/mail.png');
          background-size: 90% 90%;
    .mark2
      &:before
          top: .4rem;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url('~@/assets/img/check.png');
          background-size: 100% 100%;
    .mark3
      &:before
        top: .55rem;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url('~@/assets/img/reject.png');
        background-size: 80% 80%;
  .working-hours-desc
    border-top: 1px solid $my-color2;
    padding: 0 .1rem;
    h3
      font-size: .32rem;
      text-align: left;
      padding: .4rem 0;
    .hours-desc-flex-item
      text-align: center;
      color:#FFF;
      padding: .1rem;
      span
        display:inline-block;
        vertical-align: middle;
      i
        vertical-align: middle;
  .working-hours-desc
    .hours-desc-flex-item
      &:first-child
        background-color: #51db51
      &:nth-child(2)
        background-color: #3f3fff
      &:last-child
        background-color: #ff0400
  .mu-toast
    text-align:center;
    background-color:$bgColor;
    right:0;
    left:0;
    margin:auto;
    bottom:2rem;
    font-size:.35rem;
    width:80%;
</style>
