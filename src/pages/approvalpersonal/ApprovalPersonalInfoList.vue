<template>
<div class="approvalpersonal-main">
  <approval-personal-header></approval-personal-header>
  <v-table
    is-horizontal-resize style="width:100%"
    :is-loading="isLoading"
    :columns="tableConfig.columns"
    :table-data="tableConfig.tableData"
    :column-cell-class-name="columnCellClass"
    :select-all="handleTableSelectAll"
    :select-change="handleTableSelectChange"
    :show-vertical-border="false"
    @on-custom-comp="handleClickEventDetails"
    :paging-index="(pageIndex-1)*pageSize"
  ></v-table>
  <v-pagination
    @page-change="pageChange"
    @page-size-change="pageSizeChange"
    :total="total"
    :page-size="pageSize"
    :layout="['total', 'prev', 'pager', 'next', 'sizer']"
  ></v-pagination>
  <mu-flexbox class="flexbox-btn-approval" orient="vertical">
    <mu-flexbox-item>
      <mu-raised-button label="审批通过" icon="check" class="btn-approval" @click="handleApprovalPassed('2')" primary />
      <mu-raised-button label="审批拒绝" icon="close" class="btn-approval" @click="handleApprovalPassed('3')" secondary />
    </mu-flexbox-item>
  </mu-flexbox>
  <mu-toast v-if="toast" message="请选择一行数据" @close="hideToast"/>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ApprovalPersonalHeader from './components/Header'
export default {
  name: 'ApprovalPersonalInfoList',
  components: {
    ApprovalPersonalHeader
  },
  data () {
    return {
      toast: false,
      isLoading: true,
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      approvalStr: '',
      approvalPersonalInfoTableList: [],
      tableConfig: {
        tableData: [],
        columns: [{
          width: 1,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'selection',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'date',
          title: '日期',
          width: 10,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'user_name',
          title: '姓名',
          width: 15,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'project_name',
          title: '项目',
          width: 15,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'normal_time',
          title: '工时',
          width: 10,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'overwork_time',
          title: '加班工时',
          width: 15,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'operating',
          title: '操作',
          width: 10,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'table-operation',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }]
      }
    }
  },
  methods: {
    // 获取审批个人信息列表
    getApprovalPersonalInfoTableData () {
      let userId = sessionStorage.getItem('user_id')
      let month = this.$route.params.month
      try {
        if (month !== '' && userId !== '') {
          let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:queryAttendanceDetailList xmlns:m='http://webservice.attence.com/'><user_id type='String'>${userId}</user_id><month type='String'>${month}</month></m:queryAttendanceDetailList></soap:Body></soap:Envelope>`
          axios({
            method: 'POST',
            url: this.baseUrl,
            headers: { 'content-type': 'application/text; charset=utf-8' },
            data: postdata
          }).then(this.handleGetApprovalPersonalInfoTableData).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log('userId:' + userId)
          console.log('month:' + month)
        }
      } catch (e) {
        console.log(e)
      }
      // axios.get('../../attendance/mock/approvaltablelist2.json').then(this.handleGetApprovalPersonalInfoTableData)
    },
    handleGetApprovalPersonalInfoTableData (res) {
      try {
        if (res.data.indexOf('<String>') !== -1) {
          let sliceData = res.data.slice((res.data.indexOf('<String>') + 8), res.data.lastIndexOf('</String>'))
          if (sliceData) {
            let handleData = (new Function('return' + sliceData))()
            let tableDataList = handleData.rows
            this.total = tableDataList.length
            for (let i = 0; i < tableDataList.length; i++) {
              if (tableDataList[i].check_status === '2' || tableDataList[i].check_status === '3') {
                tableDataList[i]._disabled = true
              }
            }
            this.tableConfig.tableData = tableDataList.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
            this.isLoading = false
          } else {
            console.log(sliceData)
          }
        } else {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
      // if (res.data.status === '0' && res.data) {
      //   let tableDataList = res.data.result
      //   this.total = tableDataList.length
      //   this.tableConfig.tableData = tableDataList.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
      // }
    },
    handleTableSelectAll (selection) {
      this.approvalPersonalInfoTableList = []
      this.approvalStr = ''
      for (var i = 0; i < selection.length; i++) {
        this.approvalPersonalInfoTableList.push(selection[i].id)
      }
      this.approvalStr = this.approvalPersonalInfoTableList.join(',')
      // this.approvalPersonalInfoTableList = selection
      console.log('选择全部', this.approvalStr)
    },
    handleTableSelectChange (selection, rowData) {
      this.approvalPersonalInfoTableList = []
      this.approvalStr = ''
      for (var i = 0; i < selection.length; i++) {
        this.approvalPersonalInfoTableList.push(selection[i].id)
      }
      this.approvalStr = this.approvalPersonalInfoTableList.join(',')
      // this.approvalPersonalInfoTableList = selection
      console.log('选择更改', this.approvalStr)
    },
    // 设置单元格样式名称
    columnCellClass (rowIndex, columnName, rowData) {
      // if (rowIndex % 2) {
      //   return 'column-cell-class-name-two'
      // }
      if (rowData.check_status === '3') {
        return 'column-cell-class-name-two'
      }
    },
    pageChange (pageIndex) {
      console.log(pageIndex)
      this.approvalPersonalInfoTableList = []
      this.pageIndex = pageIndex
      this.getApprovalPersonalInfoTableData()
    },
    pageSizeChange (pageSize) {
      console.log(pageSize)
      this.approvalPersonalInfoTableList = []
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getApprovalPersonalInfoTableData()
    },
    // 审批通过
    handleApprovalPassed (pas) {
      try {
        if (this.approvalPersonalInfoTableList.length === 0) {
          this.toast = true
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          return false
        }
        let id = this.approvalStr
        console.log(id)
        let postdata = `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><m:updateAttendByIds xmlns:m='http://webservice.attence.com/'><ids type='String'>${id}</ids><status>${pas}</status></m:updateAttendByIds></soap:Body></soap:Envelope>`
        axios({
          method: 'POST',
          url: this.baseUrl,
          headers: { 'content-type': 'application/text; charset=utf-8' },
          data: postdata
        }).then(this.handleApprovalPassedRes).catch(function (error) {
          console.log(error)
        })
      } catch (e) {
        console.log(e)
      }
      // console.log(e.target)
      // this.$router.go(-1)
      // console.log('审批通过的数据: ', JSON.stringify(this.approvalPersonalInfoTableList))
    },
    // 审批通过或拒绝响应
    handleApprovalPassedRes (res) {
      // console.log(res)
      this.$router.go(0)
    },
    // 审批拒绝
    // handleApprovalReject () {
    //   if (this.approvalPersonalInfoTableList.length === 0) {
    //     this.toast = true
    //     if (this.toastTimer) {
    //       clearTimeout(this.toastTimer)
    //     }
    //     this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    //     return false
    //   }
    //   console.log('审批通过的数据: ', JSON.stringify(this.approvalPersonalInfoTableList))
    // },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    // 处理表格点击详情事件
    handleClickEventDetails (pars) {
      console.log(pars)
      if (pars.type === 'details') {
        this.$router.push({
          name: 'ApprovalPersonalDetails',
          params: {
            pdid: pars.rowData.id
          }
        })
      }
    }
  },
  mounted () {
    this.getApprovalPersonalInfoTableData()
  }
}

// 自定义列组件
Vue.component('table-operation', {
  template: `<button type="button" name="button" class="btn-details" @click.stop.prevent="update(rowData,index)">详情</button>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update () {
      // 参数根据业务场景随意构造
      let params = {
        type: 'details',
        index: this.index,
        rowData: this.rowData
      }
      this.$emit('on-custom-comp', params)
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl'
  .approvalpersonal-main >>> .title-cell-class-header
     background-color: $bgColor;
     color:#FFF;
  .approvalpersonal-main >>> .column-cell-class-name-two
     color: #FF0000;
  .approvalpersonal-main >>> .btn-details
    width: 100%;
    text-align: center;
    color: #FFF;
    background-color: $bgColor;
  .approvalpersonal-main >>> .mu-toast
    text-align:center;
    background-color: $bgColor;
    right:0;
    left:0;
    margin:auto;
    bottom:2rem;
    width:4rem;
  .approvalpersonal-main >>> .flexbox-btn-approval
    text-align:right !important;
    .btn-approval
      margin:.2rem .1rem;
  .approvalpersonal-main >>> .search-approval
    display: flex;
    text-align: center;
    margin: .2rem 0;
    padding: 0 .1rem;
  .approvalpersonal-main >>> .mu-dropDown-menu-text
    color: $bgColor;
  .approvalpersonal-main >>> .mu-dropDown-menu
    flex: 1;
    color:red;
    height: .8rem;
    font-size: .3rem;
  .approvalpersonal-main >>> .mu-menu-list
    border: 1px solid $bgColor;
  .approvalpersonal-main >>> .mu-dropDown-menu-text
    padding:0 0;
    line-height:.7rem;
  .approvalpersonal-main >>> .mu-dropDown-menu-icon
    top:.1rem;
    right: 0;
  .approvalpersonal-main >>> .approval-search-text
    flex: 2;
    margin: 0 .2rem;
</style>
