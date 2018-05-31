<template>
<div>
  <attendance-header></attendance-header>
  <attendance-calendar></attendance-calendar>
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
  }
}
</script>

<style lang="stylus" scoped></style>
