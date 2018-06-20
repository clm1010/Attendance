<template>
  <mu-appbar title="审批个人详情">
    <mu-icon-button icon="chevron_left" slot="left" to="/approval" />
    <mu-icon-button slot="right"></mu-icon-button>
  </mu-appbar>
</template>

<script>
export default {
  name: 'ApprovalPersonalHeader',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
