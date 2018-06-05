<template>
<mu-row class="panel-row">
  <mu-col class="panel-col" width="50" tablet="50" desktop="50" v-for="(item,index) in list" :key="index">
    <router-link tag="mu-flat-button" class="panel-flat-button" :to="item.path">
      <img class="panel-img" :src="item.image" :alt="item.title" />
      <p class="panel-title">{{item.title}}</p>
    </router-link>
  </mu-col>
</mu-row>
</template>

<script>
export default {
  name: 'HomePanel',
  data () {
    return {
      list: [{
        id: '001',
        image: require('@/assets/img/kj.png'),
        title: '考勤管理',
        path: '/attendance'
      }, {
        id: '002',
        image: require('@/assets/img/sp.png'),
        title: '审批管理',
        path: '/approval'
      }, {
        id: '003',
        image: require('@/assets/img/cj.png'),
        title: '常见问题',
        path: '/problems'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .panel-col
    padding: 0;
    border-right: .01rem solid $my-color2;
    border-bottom: .01rem solid $my-color2;
    .panel-flat-button
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      .panel-img
        display: block;
        width: 100%;
        height: 100%;
        padding: 1rem;
      .panel-title
        position: absolute;
        right:0;
        bottom: .2rem;
        left: 0;
</style>
