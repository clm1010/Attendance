<template>
<mu-paper class="info-paper" :zDepth="1">
  <mu-row class="info-row">
    <mu-col class="info-col" width="50" tablet="50" desktop="50"><span>员工号:</span><p>{{userNum}}</p></mu-col>
    <mu-col class="info-col" width="50" tablet="50" desktop="50"><span>员工姓名:</span><p>{{userName}}</p></mu-col>
    <mu-col class="info-col" width="100" tablet="100" desktop="100"><span>项目名称:</span><p>{{userProject}}</p></mu-col>
  </mu-row>
</mu-paper>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeMyinfo',
  data () {
    return {
      userId: '',
      userName: '',
      userNum: '',
      userProject: ''
    }
  },
  methods: {
    // 获取员工信息
    getQueryUserInfoFor () {
      try {
        let pid = 'P0121142'
        if (pid) {
          sessionStorage.setItem('pid', pid)
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserInfoForWx xmlns:m='http://webservice.attence.com/'><empId type='String'>${pid}</empId></m:queryUserInfoForWx></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: '/api',
            // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleQueryUserInfoFor).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('pid:' + pid)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 处理查询用户信息
    handleQueryUserInfoFor (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            console.log(handleData)
            this.userId = handleData.user_id
            this.userName = handleData.user_name
            this.userNum = handleData.user_num
            this.userProject = handleData.user_project
            sessionStorage.setItem('user_id', handleData.user_id)
            sessionStorage.setItem('user_name', handleData.user_name)
            sessionStorage.setItem('user_num', handleData.user_num)
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.getQueryUserInfoFor()
  }
}
</script>

<style lang="stylus" scoped>
  .info-paper
    width: 100%;
    .info-row
      padding:.1rem .2rem;
      .info-col
        padding: .1rem;
        font-size: .3rem;
        span,
        p
          display:inline-block;
  .info-paper
    .info-row
      span
        margin-right:.1rem;
  .info-paper
    .info-row
      .info-col:last-child
        span
          vertical-align: top;
        p
          width: 75%;
</style>
