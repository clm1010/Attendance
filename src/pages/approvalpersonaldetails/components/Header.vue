<template>
  <mu-appbar title="审批个人详细信息">
    <mu-icon-button icon="chevron_left" slot="left" @click="handleGoBack"/>
    <mu-icon-button slot="right"></mu-icon-button>
  </mu-appbar>
</template>

<script>
export default {
  name: 'ApprovalPersonalDetailsHeader',
  data () {
    return {}
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
