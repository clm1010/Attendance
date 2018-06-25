<template>
<mu-appbar title="提醒">
  <mu-icon-button icon="chevron_left" slot="left" to="/" />
  <mu-icon-button slot="right"></mu-icon-button>
</mu-appbar>
</template>

<script>
export default {
  name: 'RemindHeader'
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
