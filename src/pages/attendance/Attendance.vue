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
  <section class="working-hours-desc">
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
  </section>
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
    clickDay (data) {
      console.log('选中了', data) // 选中某天
      // this.$toast('选中了' + data)
    },
    clickToday (data) {
      console.log('跳到了本月', data) // 跳到了本月
    },
    changeDate (data) {
      // this.$toast('切换到的月份为' + data)
      console.log('左右点击切换月份', data) // 左右点击切换月份
    },
    demo () {
      // this.$refs.Calendar.ChoseMonth('2017-12-12',false); // 跳到12月12日 但是不选中12月12日
      this.$refs.Calendar.ChoseMonth('2017-12-12') // 跳到12月12日
    },
    getAttenDate () {
      console.log(123)
      axios.get('./static/mock/attendatelist.json').then(this.handleDate)
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
    handleDate (res) {
      if (res.data.status === '0' && res.data) {
        this.arr = this.handelDate(res.data.result)
        console.log(JSON.stringify(this.arr))
      }
    }
  },
  mounted () {
    this.getAttenDate()
  }
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
        width: .1rem;
        height: 0.02rem;
        position: absolute;
        margin: auto;
        border-radius: 2rem;
    .mark1
      &:before
          content: '\2714';
          top:-0.25rem;
          right: 0;
          bottom: 0;
          left: 0;
          color: #51db51;
    .mark2
      &:before
        content: '\2709';
        top:-0.2rem;
        right: 0;
        bottom: 0;
        left: -0.18rem;
        color: #3f3fff;
    .mark3
      &:before
        content: '\2716';
        top:-0.2rem;
        right: 0;
        bottom: 0;
        left: -0.15rem;
        color: #ff0400;
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
