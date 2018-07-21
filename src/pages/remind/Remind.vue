<template>
  <div class="remind-main">
    <remind-header></remind-header>
    <mu-list class="remind-list">
      <mu-radio
      label="邮件提醒"
      name="group"
      nativeValue="1"
      v-model="remind"
      class="demo-radio"
      @change="handleRemind"
      />
      <mu-radio
      label="微信提醒"
      name="group"
      nativeValue="2"
      v-model="remind"
      class="demo-radio"
      @change="handleRemind"
      />
    </mu-list>
    <mu-toast v-if="toast" message="设置成功！" @close="hideToast"/>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import RemindHeader from './components/Header'
export default {
  name: 'Remind',
  components: {
    RemindHeader
  },
  data () {
    return {
      toast: false,
      remind: ''
    }
  },
  methods: {
    // 初始设置提醒类型
    initPostSettingRemind () {
      try {
        let pid = sessionStorage.getItem('pid')
        if (pid) {
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserInfoForWx xmlns:m='http://webservice.attence.com/'><empId type='String'>${pid}</empId></m:queryUserInfoForWx></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
            url: this.baseUrl,
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handleInitPostSettingRemindRes).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('pid:' + pid)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 处理初始设置提醒类型响应设置
    handleInitPostSettingRemindRes (res) {
      // console.log(res)
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            // console.log(!this.$common.isEmptyObject(handleData.push_type))
            // console.log(typeof handleData.push_type)
            if (handleData.push_type == 'null') {
              this.remind = '1'
            }
            if (handleData.push_type === '1') {
              this.remind = '1'
            }
            if (handleData.push_type === '2') {
              this.remind = '2'
            }
            // console.log(handleData.push_type)
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {}
    },
    // 请求设置提醒类型
    postSettingRemind () {
      try {
        let userId = sessionStorage.getItem('user_id')
        let userName = sessionStorage.getItem('user_name')
        if (userId && userName && this.remind) {
          // console.log(this.remind)
          let postdata =
            `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:updateRemindType xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><user_name type='String'>${userName}</user_name><push_type>${this.remind}</push_type></m:updateRemindType></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            // url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
            url: this.baseUrl,
            headers: {
              'content-type': 'application/text; charset=utf-8'
            },
            data: postdata
          }).then(this.handlePostSettingRemindRes).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('userId: ' + userId, 'userName: ' + userName)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 处理请求设置提醒类型响应
    handlePostSettingRemindRes (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            if (handleData.success) {
              this.toast = true
              if (this.toastTimer) {
                clearTimeout(this.toastTimer)
              }
              this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
              return false
            }
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {}
    },
    handleRemind (value) {
      this.remind = value
      this.postSettingRemind()
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
  mounted () {
    this.initPostSettingRemind()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
.remind-main >>> .remind-list
  text-align:center;
  padding: 2rem 0;
  font-size: .4rem;
.remind-main >>> .mu-toast
  text-align:center;
  background-color:$bgColor;
  right:0;
  left:0;
  margin:auto;
  bottom:2rem;
  width:4rem;
</style>
