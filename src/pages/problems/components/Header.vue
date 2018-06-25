<template>
<mu-appbar title="常见问题">
  <mu-icon-button icon="chevron_left" slot="left" to="/" />
  <mu-icon-button slot="right"></mu-icon-button>
</mu-appbar>
</template>

<script>
export default {
  name: 'ProblemsHeader'
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
