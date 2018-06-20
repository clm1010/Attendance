<template>
<div>
  <approval-header></approval-header>

  <v-table
    is-horizontal-resize style="width:100%"
    :columns="columns"
    :table-data="tableData"
    :column-cell-class-name="columnCellClass"
    :select-all="handleTableSelectAll"
    @on-custom-comp="customCompFunc"
  ></v-table>
  <button type="button" name="button" @click="handleLink">跳转</button>
</div>
</template>

<script>
import Vue from 'vue'
import ApprovalHeader from './components/Header'
export default {
  name: 'Approval',
  components: {
    ApprovalHeader
  },
  data () {
    return {
      tableData: [{
        'month': '5月份',
        'name': '张三',
        'reportdays': '5天',
        'submitteddays': '5天',
        'unsubmitteddays': '0天',
        'auditeddays': '0天'
      }, {
        'month': '5月份',
        'name': '张三',
        'reportdays': '5天',
        'submitteddays': '5天',
        'unsubmitteddays': '0天',
        'auditeddays': '0天'
      }, {
        'month': '5月份',
        'name': '张三',
        'reportdays': '5天',
        'submitteddays': '5天',
        'unsubmitteddays': '0天',
        'auditeddays': '0天'
      }],
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
  },
  methods: {
    customCompFunc (params) {
      console.log(params)
      // do delete operation
      if (params.type === 'delete') {
        this.$delete(this.tableData, params.index)
        // do edit operation
      } else if (params.type === 'edit') {
        alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
      }
    },
    handleTableSelectAll (selection) {
      console.log('选择全部', selection)
    },
    // 设置单元格样式名称
    columnCellClass (rowIndex, columnName, rowData) {
      if (rowIndex % 2) {
        return 'column-cell-class-name-two'
      }
    },
    handleLink () {
      this.$router.push({
        name: 'ApprovalPersonalDetails',
        params: {
          userid: '001'
        }
      })
    }
  },
  mounted () {}
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
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      }
      this.$emit('on-custom-comp', params)
    },

    deleteRow () {
      // 参数根据业务场景随意构造
      let params = {
        type: 'delete',
        index: this.index
      }
      this.$emit('on-custom-comp', params)
    }
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
</style>
