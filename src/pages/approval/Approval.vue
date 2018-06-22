<template>
<div>
  <approval-header></approval-header>
  <div class="search-approved">
    <mu-dropDown-menu menuClass="menuClass" autoWidth  :value="monthValue"  @change="handleMonthChange">
      <mu-menu-item value="1" title="一月"/>
      <mu-menu-item value="2" title="二月"/>
      <mu-menu-item value="3" title="三月"/>
      <mu-menu-item value="4" title="四月"/>
      <mu-menu-item value="5" title="五月"/>
      <mu-menu-item value="6" title="六月"/>
      <mu-menu-item value="7" title="七月"/>
      <mu-menu-item value="8" title="八月"/>
      <mu-menu-item value="9" title="九月"/>
      <mu-menu-item value="10" title="十月"/>
      <mu-menu-item value="11" title="十一月"/>
      <mu-menu-item value="12" title="十二月"/>
    </mu-dropDown-menu>
    <mu-text-field class="approved-search-text" hintText="请输入搜索内容"/>
    <mu-raised-button label="查询" class="approved-search-button" primary/>
  </div>
  <v-table
    is-horizontal-resize style="width:100%"
    :title-rows="tableConfig.titleRows"
    :columns="tableConfig.columns"
    :table-data="tableConfig.tableData"
    :column-cell-class-name="columnCellClass"
    :select-all="handleTableSelectAll"
    :select-change="handleTableSelectChange"
    :show-vertical-border="false"
    @on-custom-comp="handleClickEventDetails"
    :paging-index="(pageIndex-1)*pageSize"
  ></v-table>
  <div class="mt20 mb20 bold"></div>
  <v-pagination
    @page-change="pageChange"
    @page-size-change="pageSizeChange"
    :total="total"
    :page-size="pageSize"
    :layout="['total', 'prev', 'pager', 'next', 'sizer']"
  ></v-pagination>
      <!-- :select-group-change="handleTableSelectGroupChange" -->
  <mu-flexbox class="flexbox-btn-approved" orient="vertical">
    <mu-flexbox-item>
      <mu-raised-button label="审批通过" icon="check" class="btn-approved" @click="handleApprovalPassed" primary />
    </mu-flexbox-item>
  </mu-flexbox>
  <mu-toast v-if="toast" message="请选择一行数据" @close="hideToast"/>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ApprovalHeader from './components/Header'
export default {
  name: 'Approval',
  components: {
    ApprovalHeader
  },
  data () {
    return {
      monthValue: '1',
      toast: false,
      approvalPassedTableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      tableConfig: {
        multipleSort: false,
        tableData: [],
        columns: [{
          width: 1,
          titleAlign: 'center',
          columnAlign: 'center',
          type: 'selection',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'month',
          title: '月份',
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
          field: 'reportdays',
          title: '申报天数',
          width: 10,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'submitteddays',
          title: '已提交天数',
          width: 14,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'unsubmitteddays',
          title: '未提交天数',
          width: 14,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          titleCellClassName: 'title-cell-class-header'
        }, {
          field: 'auditeddays',
          title: '已审核天数',
          width: 14,
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
    // 处理监听日期框
    handleMonthChange (value) {
      this.monthValue = value
      console.log(this.monthValue)
    },
    handleTableSelectAll (selection) {
      this.approvalPassedTableData = selection
      console.log('选择全部', JSON.stringify(this.approvalPassedTableData))
    },
    handleTableSelectChange (selection, rowData) {
      this.approvalPassedTableData = selection
      console.log('选择更改', JSON.stringify(this.approvalPassedTableData))
    },
    getApprovalTableData () {
      axios.get('../../static/mock/approvaltablelist.json').then(this.handleGetApprovalTableData)
    },
    handleGetApprovalTableData (res) {
      if (res.data.status === '0' && res.data) {
        this.tableConfig.tableData = res.data.result
        this.total = this.tableConfig.tableData.length
        this.handleApprovalTableData()
      }
      // this.tableConfig.tableData = this.tableConfig.tableData.slice((this.pageIndex-1)*this.pageSize, (this.pageIndex)*this.pageSize)
    },
    handleApprovalTableData () {
      var table = this.tableConfig.tableData.slice((this.pageIndex-1)*this.pageSize, (this.pageIndex)*this.pageSize)
      console.log(table)
    },
    pageChange (pageIndex) {
      console.log(pageIndex)
      console.log(pageIndex)
       this.pageIndex = pageIndex
       this.getApprovalTableData()
    },
    pageSizeChange (pageSize) {
      console.log(pageSize)
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getApprovalTableData()
   },
    // handleTableSelectGroupChange (selection) {
    //   console.log('选择组更改', JSON.stringify(selection))
    // },
    // 设置单元格样式名称
    columnCellClass (rowIndex, columnName, rowData) {
      if (rowIndex % 2) {
        return 'column-cell-class-name-two'
      }
    },
    // 审批通过
    handleApprovalPassed () {
      if (this.approvalPassedTableData.length === 0) {
        this.toast = true
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        return false
      }
      console.log('审批通过的数据: ', JSON.stringify(this.approvalPassedTableData))
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
            userid: params.rowData
          }
        })
      }
      // // do delete operation
      // if (params.type === 'delete') {
      //   this.$delete(this.tableData, params.index)
      //   // do edit operation
      // } else if (params.type === 'edit') {
      //   alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
      // }
    }
  },
  created () {
    this.getApprovalTableData()
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
    // ,
    // deleteRow () {
    //   // 参数根据业务场景随意构造
    //   let params = {
    //     type: 'delete',
    //     index: this.index
    //   }
    //   this.$emit('on-custom-comp', params)
    // }
  }
})
</script>

<style lang="stylus">
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
  .flexbox-btn-approved
    text-align:right;
    .btn-approved
      margin:.2rem .1rem;
  .search-approved
    display: flex;
    text-align: center;
    margin: .2rem 0;
    padding: 0 .1rem;
  .mu-dropDown-menu-text
    color: $bgColor;
  .mu-dropDown-menu
    flex: 1;
    color:red;
    // border: 1px solid rgba(33,150,240,.6);
    height: .8rem;
    font-size: .3rem;
  .mu-dropDown-menu-text
    padding:0 0;
    line-height:.7rem;
  .mu-dropDown-menu-icon
    top:.1rem;
    right: 0;
  .approved-search-text
    flex: 2;
    margin: 0 .2rem;
</style>
