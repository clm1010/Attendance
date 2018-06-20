<template>
  <mu-appbar title="审批管理">
    <mu-icon-button icon="chevron_left" slot="left" to="/" />
    <mu-icon-button slot="right"></mu-icon-button>
  </mu-appbar>
</template>

<script>
export default {
  name: 'ApprovalHeader',
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
