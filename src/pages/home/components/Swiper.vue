<template>
<div class="wrapper">
  <swiper :options="swiperOption">
    <swiper-slide v-for="item of swiperList" :key="item.id">
      <img class="swiper-img" :src="item.imgUrl" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000
      },
      swiperList: [{
        id: '01',
        imgUrl: require('@/assets/img/1.jpg')
      }, {
        id: '02',
        imgUrl: require('@/assets/img/2.jpg')
      }, {
        id: '03',
        imgUrl: require('@/assets/img/1.jpg')
      }, {
        id: '04',
        imgUrl: require('@/assets/img/2.jpg')
      }]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.wrapper >>> .swiper-pagination-bullet-active
  background-color: $my-color1
.swiper-container-horizontal > .swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction
  bottom:0.2rem;
.wrapper
  overflow:hidden;
  width:100%;
  // // height: 0;
  // padding-bottom: 26.666667%;
  min-height: 3rem;
  background-color: #EEEEEE;
  .swiper-img
    display: block;
    width: 100%;
    min-height: 3rem;
</style>
