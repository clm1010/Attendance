<template>
<div>
  <approval-personal-header></approval-personal-header>
  <v-table
    is-horizontal-resize style="width:100%"
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
      <mu-raised-button label="审批通过" icon="check" class="btn-approval" @click="handleApprovalPassed" primary />
      <mu-raised-button label="审批拒绝" icon="close" class="btn-approval" @click="handleApprovalReject" secondary />
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
      total: 0,
      pageIndex: 1,
      pageSize: 10,
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
          field: 'name',
          title: '姓名',
          width: 15,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'projectname',
          title: '项目',
          width: 15,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'normaltile',
          title: '工时',
          width: 10,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'overworktime',
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
      axios.get('../../static/mock/approvaltablelist2.json').then(this.handleGetApprovalPersonalInfoTableData)
    },
    handleGetApprovalPersonalInfoTableData (res) {
      if (res.data.status === '0' && res.data) {
        let tableDataList = res.data.result
        this.total = tableDataList.length
        this.tableConfig.tableData = tableDataList.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
      }
    },
    handleTableSelectAll (selection) {
      this.approvalPersonalInfoTableList = selection
      console.log('选择全部', JSON.stringify(this.approvalPersonalInfoTableList))
    },
    handleTableSelectChange (selection, rowData) {
      this.approvalPersonalInfoTableList = selection
      console.log('选择更改', JSON.stringify(this.approvalPersonalInfoTableList))
    },
    // 设置单元格样式名称
    columnCellClass (rowIndex, columnName, rowData) {
      if (rowIndex % 2) {
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
    handleApprovalPassed () {
      if (this.approvalPersonalInfoTableList.length === 0) {
        this.toast = true
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        return false
      }
      console.log('审批通过的数据: ', JSON.stringify(this.approvalPersonalInfoTableList))
    },
    // 审批拒绝
    handleApprovalReject () {
      if (this.approvalPersonalInfoTableList.length === 0) {
        this.toast = true
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        return false
      }
      console.log('审批通过的数据: ', JSON.stringify(this.approvalPersonalInfoTableList))
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    // 处理表格点击详情事件
    handleClickEventDetails (params) {
      console.log(params)
      if (params.type === 'details') {
        this.$router.push({
          name: 'ApprovalPersonalDetails',
          params: {
            personaldetailsid: params.rowData
          }
        })
      }
    }
  },
  mounted () {
    console.log('123')
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
  .title-cell-class-header
     background-color: $bgColor;
     color:#FFF;
  .column-cell-class-name-two
     background-color: #d8eeff;
  .btn-details
    width: 100%;
    text-align: center;
    color: #FFF;
    background-color: $bgColor;
  .mu-toast
    text-align:center;
    background-color:rgba(33,150,240,.8);
    right:0;
    left:0;
    margin:auto;
    bottom:2rem;
    width:4rem;
  .flexbox-btn-approval
    text-align:right;
    .btn-approval
      margin:.2rem .1rem;
  .search-approval
    display: flex;
    text-align: center;
    margin: .2rem 0;
    padding: 0 .1rem;
  .mu-dropDown-menu-text
    color: $bgColor;
  .mu-dropDown-menu
    flex: 1;
    color:red;
    height: .8rem;
    font-size: .3rem;
  .mu-menu-list
    border: 1px solid $bgColor;
  .mu-dropDown-menu-text
    padding:0 0;
    line-height:.7rem;
  .mu-dropDown-menu-icon
    top:.1rem;
    right: 0;
  .approval-search-text
    flex: 2;
    margin: 0 .2rem;
</style>
