<template>
  <div>
    <addworkhoure-header></addworkhoure-header>
    <addworkhoure-timesheet></addworkhoure-timesheet>
  </div>
</template>

<script>
import AddworkhoureHeader from './components/Header'
import AddworkhoureTimesheet from './components/Timesheet'
export default {
  name: 'Addworkhour',
  components: {
    AddworkhoureHeader,
    AddworkhoureTimesheet
  }
}
</script>

<style lang="stylus" scoped>
</style>
