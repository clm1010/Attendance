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
        <i class="mdui-icon material-icons">event_available</i><span>已批准工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">event_note</i><span>审批中工时</span>
      </mu-flexbox-item>
      <mu-flexbox-item class="hours-desc-flex-item">
        <i class="mdui-icon material-icons">event_busy</i><span>被拒绝工时</span>
      </mu-flexbox-item>
    </mu-flexbox>
  </section>
</div>
</template>

<script>
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
    }
  },
  created () {
    function format (date, index) {
      date = new Date(date)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${index}`
    }
    this.arr = [{
      date: format(new Date(), 1),
      className: 'mark1'
    }, {
      date: format(new Date(), 2),
      className: 'mark1'
    }, {
      date: format(new Date(), 13),
      className: 'mark2'
    }, {
      date: format(new Date(), 15),
      className: 'mark2'
    }, {
      date: format(new Date(), 30),
      className: 'mark3'
    }]
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
      &:after
        content: ' ';
        width: .15rem;
        height: .15rem;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        border-radius: 2rem;
    .mark1
      &:after
          background-color: #51db51;
    .mark2
      &:after
        background-color: #3f3fff;
    .mark3
      &:after
        background-color: #ff0400;
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
