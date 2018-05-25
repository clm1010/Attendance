<template>
<div>
  <home-swiper></home-swiper>
  <home-myinfo></home-myinfo>
  <home-panel></home-panel>
</div>
</template>

<script>
import HomeSwiper from './components/Swiper'
import HomeMyinfo from './components/Myinfo'
import HomePanel from './components/Panel'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeMyinfo,
    HomePanel
  }
}
</script>

<style lang="stylus" scoped>
  .my-info
    background-color:#CCC
</style>
