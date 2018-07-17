<template>
<div class="error-contaner">
  <errormsg-header></errormsg-header>
  <mu-card>
    <mu-card-header>
      <mu-icon value="error"/>
    </mu-card-header>
    <mu-card-title title="认证失败！请及时联系管理员！"/>
  </mu-card>
</div>
</template>

<script>
import ErrormsgHeader from './components/Header'
export default {
  name: 'Errormsg',
  components: {
    ErrormsgHeader
  }
}
</script>

<style lang="stylus" scoped>
.error-contaner >>>
  text-align: center;
  .mu-card-header
    padding:.2rem 0;
    .mu-icon
      color:#f44336;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
  .mu-card-title-container
    padding: 0;
    .mu-card-title
      font-size: .4rem;
      line-height: .4rem;
</style>
