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
import axios from 'axios'
export default {
  name: 'HomeMyinfo',
  data () {
    return {

    }
  },
  methods: {
    // 获取员工信息
    getQueryUserInfoFor () {
      try {
        let pid = 'P0005338'
        let postdata=`<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryUserInfoForWx xmlns:m='http://webservice.attence.com/'><empId type='String'>${pid}</empId></m:queryUserInfoForWx></soap:Body></soap:Envelope>`
        console.log(postdata)
        axios({
          method: 'POST',
          url: 'http://localhost:82/attence/webService/AttenceService?wsdl',
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleQueryUserInfoFor).catch(function (error) {
          console.log(error)
        })

      } catch (e) {
        console.log(e)
      }
    },
    handleQueryUserInfoFor (res) {
      console.log(res)
      // $.ajax({
      // 	url : "http://localhost:82/attence/webService/AttenceService?wsdl",
      // 	type : "post",
      // 	dataType : "text",
      // 	contentType : "application/text;charset=utf-8",
      // 	data : postdata,
      // 	success : function(result) {
      // 		alert(result)
      // 	},
      // 	error : function(err) {
      // 		alert(err.responseText)
      // 	}
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
    .info-col
      padding: .1rem;
      font-size: .3rem;
</style>
