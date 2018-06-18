<template>
<mu-card class="timesheet-card">
    <mu-text-field
      hintText="项目名称"
      label="项目名称"
      :required="true"
      icon="card_travel"
      labelFloat
      fullWidth
    />
    <mu-select-field
      v-model="workState"
      hintText="工作状态"
      label="工作状态"
      icon="developer_board"
      labelFloat
      fullWidth
    >
      <mu-menu-item value="1" title="正常"/>
      <mu-menu-item value="2" title="新进场无工作包"/>
      <mu-menu-item value="3" title="在场无工作包"/>
      <mu-menu-item value="4" title="新入职未进场"/>
      <mu-menu-item value="5" title="公司坐班"/>
      <mu-menu-item value="6" title="项目间歇"/>
      <mu-menu-item value="7" title="请假"/>
    </mu-select-field>
    <mu-select-field
      v-model="askleaveTypes"
      hintText="请假类型"
      label="请假类型"
      icon="developer_board"
      labelFloat
      fullWidth
      @input="handleLeaveType"
    >
      <mu-menu-item v-for = "(item,index) in leaveTypeList" :value="item.value" :title="item.name" :key="index" />
    </mu-select-field>
    <mu-text-field
      hintText="工时"
      label="工时"
      :required="true"
      icon="alarm_on"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="加班时间"
      label="加班时间"
      :required="true"
      icon="alarm_add"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      icon="content_paste"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="请假工时"
      label="请假工时"
      :required="true"
      icon="alarm_off"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      icon="content_paste"
      labelFloat
      fullWidth
    />
</mu-card>
</template>

<script>
export default {
  name: 'AddworkhoureTimesheet',
  props: {
    leaveTypeList: Array
  },
  data () {
    return {
      workState: '',
      askleaveTypes: ''
    }
  },
  methods: {
    handleLeaveType () {
      console.log(this.askleaveTypes)
    }
  },
  beforeUpdate () {
    // 请假类型默认设置
    this.askleaveTypes = '1'
  }
}
</script>

<style lang="stylus" scoped>
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.2rem;
</style>
