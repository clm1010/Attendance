<template>
<mu-appbar title="考勤管理">
  <mu-icon-button icon="chevron_left" slot="left" to="/" />
  <!-- <mu-icon-button icon="check" slot="right"></mu-icon-button> -->
</mu-appbar>
</template>

<script>
export default {
  name: 'AttendanceHeader'
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
