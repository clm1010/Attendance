<template>
  <div>
    <approval-personal-details-header></approval-personal-details-header>
    <form ref="personalDetailsForm" :modle="personalDetailsObj" class="formBody" @submit.prevent="handleSubmit">
      <mu-card class="personal-details-card">
          <mu-text-field
            v-model="personalDetailsObj.date"
            v-show="isShow"
            hintText="日期"
            label="日期"
            icon="access_time"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.projectname"
            v-show="isShow"
            hintText="项目名称"
            label="项目名称"
            icon="card_travel"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.normaltile"
            v-show="isShow"
            hintText="工时"
            label="工时"
            icon="alarm_on"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.overworktime"
            v-show="isShow"
            hintText="加班工时"
            label="加班工时"
            icon="alarm_add"
            labelFloat
            fullWidth
            disabled
          />
          <mu-text-field
            v-model="personalDetailsObj.workContent"
            v-show="isShow"
            hintText="工作内容"
            label="工作内容"
            multiLine
            icon="content_paste"
            labelFloat
            fullWidth
            disabled
          />
          <mu-card-actions class="personal-details-footer">
            <mu-raised-button type="submit" label="通过" class="demo-raised-button" primary/>
            <mu-raised-button type="submit" label="拒绝" class="demo-raised-button" secondary/>
          </mu-card-actions>
      </mu-card>
    </form>
  </div>
</template>

<script>
import ApprovalPersonalDetailsHeader from './components/Header'
export default {
  name: 'ApprovalPersonalDetails',
  components: {
    ApprovalPersonalDetailsHeader
  },
  data () {
    return {
      isShow: true,
      personalDetailsObj: {
        date: '1',
        name: '2',
        projectname: '3',
        normaltile: '4',
        overworktime: '5',
        workContent: '6'
      }
    }
  },
  methods: {
    handleSubmit (e) {
      console.log(e.target)
      console.log(JSON.stringify(this.personalDetailsObj))
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .personal-details-card
    margin:.2rem;
    .personal-details-footer
      text-align: center;
</style>
