<template>
<mu-appbar title="添加工时">
  <mu-icon-button icon="chevron_left" slot="left" to="/attendance" />
  <mu-icon-button icon="check" slot="right"></mu-icon-button>
</mu-appbar>
</template>

<script>
export default {
  name: 'AddworkhoureHeader'
}
</script>

<style lang="stylus" scoped>
.mu-appbar >>> .mu-appbar-title
    text-align: center;
</style>
