<template>
<!-- <mu-grid-list >
  <mu-sub-header>图片展示</mu-sub-header>
  <mu-raised-button label="Default">
    <mu-grid-tile v-for="(tile,index) in list" :key="index">
      <img :src="tile.image" :alt="tile.title" />
    </mu-grid-tile>
  </mu-raised-button>
</mu-grid-list> -->
<div>
  <mu-flexbox>
    <mu-flexbox-item class="flex-demo" v-for="(tile,index) in list" :key="index">
      <mu-flat-button  class="demo-flat-button">
        <img :src="tile.image" :alt="tile.title"/>
        <p>1</p>
      </mu-flat-button>
    </mu-flexbox-item>
  </mu-flexbox>
  <!-- <mu-row gutter>
    <mu-col style="text-align:center" width="50" tablet="50" v-for="(tile,index) in list" :key="index">
        <mu-flat-button class="demo-flat-button">
          <img :src="tile.image" :alt="tile.title" style="display:block"/>
        </mu-flat-button>
    </mu-col>
  </mu-row> -->
</div>
</template>

<script>
export default {
  name: 'HomePanel',
  data () {
    return {
      list: [{
        image: require('@/assets/img/kj.png'),
        title: '考勤管理'
      }, {
        image: require('@/assets/img/sp.png'),
        title: '审批管理'
      }, {
        image: require('@/assets/img/cj.png'),
        title: '常见问题'
      }]
    }
  }
}
</script>

<style lang="css">
/* .gridlist-demo{
display: flex;
flex-wrap: wrap;
justify-content: space-around;
} */
.mt8 {
  margin-top: 8px;
}
.flex-demo {
  text-align: center;
}
.demo-flat-button{
  width: 3rem;
  height:3rem;
}
.demo-flat-button img{
  width: 100%;
  height: 100%;
}
.mu-flat-button-wrapper{

}
</style>
