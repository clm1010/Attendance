<template>
<div>
  <attendance-header></attendance-header>
  <!-- agoDayHide='1517483961'
  futureDayHide='1536054400' -->
  <attendance-calendar
    ref="AttendanceCalendar"
    :markDateMore="arr"
    v-on:choseDay="clickDay"
    v-on:changeMonth="changeDate"
  ></attendance-calendar>
  <div class="working-hours-desc">
    <h3>工时状态说明</h3>
    <mu-flexbox>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">check</i><span>已批准工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">mail_outline</i><span>审批中工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">clear</i><span>被拒绝工时</span>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
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
      // arr: [{
      //   date: '2018/4/1',
      //   className: 'mark1'
      // }, {
      //   date: '2018/4/2',
      //   className: 'mark1'
      // }, {
      //   date: '2018/4/13',
      //   className: 'mark2'
      // }]
      arr: []
    }
  },
  methods: {
    clickDay (dateparams,e) {
      let isCurrent = e.currentTarget.querySelector('li').className
      if (isCurrent.indexOf('mark1') !== -1 || isCurrent.indexOf('mark2') !== -1 || isCurrent.indexOf('wh_nextDayShow') !== -1) {
        console.log(isCurrent);
        return false
      }
      console.log('选中了', dateparams) // 选中某天
      // console.log(this);

      // this.$router.push({name: 'Addworkhour', params: { date: dateparams }})
      // this.$toast('选中了' + dateparams)
    },
    clickToday (dateparams) {
      console.log('跳到了本月', dateparams) // 跳到了本月
    },
    changeDate (dateparams) {
      // this.$toast('切换到的月份为' + dateparams)
      console.log(123)
      return false
      console.log('左右点击切换月份', dateparams) // 左右点击切换月份
    },
    demo () {
      // this.$refs.Calendar.ChoseMonth('2017-12-12',false); // 跳到12月12日 但是不选中12月12日
      this.$refs.Calendar.ChoseMonth('2017-12-12') // 跳到12月12日
    },
    getAttenDate () {
      axios.get('./attendance/mock/attendatelist.json').then(this.handleCalendar)
      // try {
      //   let userId = sessionStorage.getItem('user_id')
      //   let myDate = new Date()
      //   let month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      //   let yearMonth = myDate.getFullYear() + '-' + month
      //   console.log(yearMonth)
      //   if (userId) {
      //     let postdata =
      //       `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserCalendar xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><year_month type='String'>${yearMonth}</year_month></m:queryUserCalendar></soap:Body></soap:Envelope>`
      //     axios({
      //       method: 'POST',
      //       url: '/api',
      //       // url: '/attence/webService/AttenceService?wsdl',
      //       headers: {
      //         'content-type': 'application/text; charset=utf-8'
      //       },
      //       data: postdata
      //     }).then(this.handleCalendar).catch(function (error) {
      //       console.log(error)
      //     })
      //   } else {
      //     console.log('user_id' + userId)
      //   }
      // } catch (e) {
      //   console.log(e)
      // }
    },
    handelDate (arry) {
      function format (date) {
        date = new Date(date)
        let index = date.getDate()
        return `${date.getFullYear()}/${date.getMonth() + 1}/${index}`
      }
      for (let i = 0; i < arry.length; i++) {
        arry[i].date = format(arry[i].date)
        if (arry[i].checkstatus === '1') {
          arry[i].className = 'mark1'
        }
        if (arry[i].checkstatus === '2') {
          arry[i].className = 'mark2'
        }
        if (arry[i].checkstatus === '3') {
          arry[i].className = 'mark3'
        }
      }
      return arry
    },
    handleCalendar (res) {
      console.log(res)
      if (res.data.status === '0' && res.data) {
        this.arr = this.handelDate(res.data.result)
        console.log(JSON.stringify(this.arr))
      }
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
          top: .4rem;
          right: 0;
          bottom: 0;
          left: .1rem;
          background-image: url('~@/assets/img/check.png');
          background-size: 100% 100%;
    .mark2
      &:before
        top: .55rem;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url('~@/assets/img/mail.png');
        background-size: 90% 90%;
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
</style>
