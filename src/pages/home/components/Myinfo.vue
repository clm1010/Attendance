<template>
<mu-paper class="info-paper"  :zDepth="1">
  <mu-row>
    <mu-col class="info-col" width="50" tablet="30" desktop="30">员工号:P003125736</mu-col>
    <mu-col class="info-col" width="50" tablet="30" desktop="30">员工姓名:张三</mu-col>
    <mu-col class="info-col" width="50" tablet="30" desktop="30">技术平台:测试</mu-col>
  </mu-row>
</mu-paper>
</template>

<script>
export default {
  name: 'HomeMyinfo'
}
</script>

<style lang="stylus" scoped>
  .info-paper
    width: 100%;
    .info-col
      padding: .1rem;
      font-size: .3rem;
</style>
