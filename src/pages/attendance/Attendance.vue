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
      //   date: '2018-4-1',
      //   className: 'mark1'
      // }, {
      //   date: '2018-4-2',
      //   className: 'mark1'
      // }, {
      //   date: '2018-4-13',
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
      console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${index}`)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`
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
      date: format(new Date(), 30),
      className: 'mark2'
    }]
  }
}
</script>

<style lang="stylus" scoped>
.wh_container >>>
  .mark1
    background-color: red;
    color: #FFF;
  .mark2
    background-color: blue;
    color: #FFF;
</style>
