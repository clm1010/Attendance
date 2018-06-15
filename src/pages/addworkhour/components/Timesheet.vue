<template>
<mu-card class="timesheet-card">
    <mu-text-field
      hintText="项目名称"
      label="项目名称"
      :required="true"
      @input=""
      icon="card_travel"
      labelFloat
      fullWidth
    />
    <mu-select-field
      v-model="workState"
      hintText="工作状态"
      label="工作状态"
      @change="handleWorkState"
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
      :required="true"
      @input=""
      icon="developer_board"
      labelFloat
      fullWidth
    >
      <mu-menu-item value="1" title="事假&调休假"/>
      <mu-menu-item value="2" title="年假&福利假"/>
      <mu-menu-item value="3" title="病假"/>
      <mu-menu-item value="4" title="婚假"/>
      <mu-menu-item value="5" title="产假"/>
      <mu-menu-item value="6" title="其他"/>
    </mu-select-field>
    <mu-text-field
      hintText="工时"
      label="工时"
      :required="true"
      @input=""
      icon="alarm_on"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="加班时间"
      label="加班时间"
      :required="true"
      @input=""
      icon="alarm_add"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      @input=""
      icon="content_paste"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="请假工时"
      label="请假工时"
      :required="true"
      @input=""
      icon="alarm_off"
      labelFloat
      fullWidth
    />
    <mu-text-field
      hintText="工作内容"
      label="工作内容"
      :required="true"
      multiLine
      @input=""
      icon="content_paste"
      labelFloat
      fullWidth
    />
</mu-card>
</template>

<script>
export default {
  name: 'AddworkhoureTimesheet',
  data () {
    return {
      workState: '1',
      askleaveTypes: '1'
    }
  },
  methods: {
    handleWorkState () {
      console.log(this.workState);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mu-popover >>> .mu-menu-item-title
    color:red;
  .timesheet-card
    margin:.2rem;
</style>
