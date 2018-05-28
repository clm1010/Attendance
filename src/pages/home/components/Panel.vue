<template>
<mu-row class="panel-row">
  <mu-col class="panel-col" width="50" tablet="50" desktop="50" v-for="(tile,index) in list" :key="index">
    <mu-flat-button class="demo-flat-button">
      <img :src="tile.image" :alt="tile.title" />
      <p>{{tile.title}}</p>
    </mu-flat-button>
  </mu-col>
</mu-row>
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

<style lang="css" scoped>
.panel-row > .panel-col{
  padding: .2rem .4rem;
}
.mu-flat-button-wrapper > img {
  display: block;
  width: 100%;
  text-align: center;
}
.panel-row > .panel-col > p {
  width: 100%;
  text-align: center;
}
.demo-flat-button {
  -webkit-box-shadow: 0 1px 5px rgba(0,0,0,.156863), 0 1px 5px rgba(0,0,0,.227451);
  box-shadow: 0 1px 5px rgba(0,0,0,.156863), 0 1px 5px rgba(0,0,0,.227451);
}
.demo-flat-button{
  width: 100%;
  height: 100%;
  padding: .6rem;
}
.mu-flat-button-wrapper >  p{
  position: absolute;
  bottom: 0;
}
</style>
