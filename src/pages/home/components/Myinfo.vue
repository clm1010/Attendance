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
/* eslint-disable */
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
    // 获取微信Code验证
    getWeChatCodeVerify () {
      try {
        let userNum = sessionStorage.getItem('user_num')
        // window.alert(userNum)
        if (userNum == null) {
          let code = this.$common.getQueryString('code')
          if (code) {
            // window.alert(this.baseUrl)
            let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:getUserNumForWX xmlns:m='http://webservice.attence.com/'><code type='String'>${code}</code></m:getUserNumForWX></soap:Body></soap:Envelope>`
            axios({
              method: 'POST',
              // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
              url: this.baseUrl,
              headers: {
                'content-type': 'application/text; charset=utf-8'
              },
              data: postdata
            }).then(this.handleGetWeChatCodeVerifyRes).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('code:' + code)
            this.$router.push('/errormsg')
          }
        } else {
          // window.alert('存在user_num:' + userNum)
          this.userId = sessionStorage.getItem('user_id')
          this.userName = sessionStorage.getItem('user_name')
          this.userNum = sessionStorage.getItem('user_num')
          this.userProject = sessionStorage.getItem('user_project')
          this.userProject = this.userProject == 'null' ? '' : this.userProject
        }
      } catch (e) {
        // window.alert(e)
        console.log(e)
      }
    },
    // 处理响应的验证结果
    handleGetWeChatCodeVerifyRes (res) {
      // window.alert(JSON.stringify(res.data))
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            // let handleData = {
            //   'errcode': 0,
            //   'errmsg': 'ok',
            //   'UserId': 'P9026557',
            //   'DeviceId': 'DEVICEID',
            //   'user_ticket': 'USER_TICKET',
            //   'expires_in': 7200
            // }
            // this.getQueryUserInfoFor()
            // window.alert(JSON.stringify(handleData))
            if (handleData.UserId === '') {
              this.$router.push('/errormsg')
            } else {
              this.getQueryUserInfoFor(handleData)
            }
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 获取员工信息
    getQueryUserInfoFor (resData) {
      // console.log(resData)
      try {
        let pid = resData.UserId
        if (pid) {
          sessionStorage.setItem('pid', pid)
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserInfoForWx xmlns:m='http://webservice.attence.com/'><empId type='String'>${pid}</empId></m:queryUserInfoForWx></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
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
            // console.log(handleData.user_project)
            this.userId = handleData.user_id
            this.userName = handleData.user_name
            this.userNum = handleData.user_num
            this.userProject = handleData.user_project == 'null' ? '' : handleData.user_project
            sessionStorage.setItem('user_id', handleData.user_id)
            sessionStorage.setItem('user_name', handleData.user_name)
            sessionStorage.setItem('user_num', handleData.user_num)
            sessionStorage.setItem('user_project', handleData.user_project)
            // console.log(this.userProject)
            // console.log(sessionStorage.getItem('user_project'))
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
  // created () {
  //   this.getWeChatCodeVerify()
  // },
  mounted () {
    this.getWeChatCodeVerify()
    // this.getQueryUserInfoFor()
    // let project = sessionStorage.getItem('user_project')
    // window.alert(project)
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
