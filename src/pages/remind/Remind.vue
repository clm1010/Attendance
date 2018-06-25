<template>
  <div>
    <remind-header></remind-header>
    <mu-list class="remind-list">
      <mu-radio label="邮件提醒"
      name="group" nativeValue="1"
      v-model="value"
      class="demo-radio"
      @input="handleRemind"
      />
      <mu-radio
      label="微信提醒"
      name="group"
      nativeValue="2"
      v-model="value"
      class="demo-radio"
      @input="handleRemind"
      />
    </mu-list>
  </div>
</template>

<script>
import RemindHeader from './components/Header'
export default {
  name: 'Remind',
  components: {
    RemindHeader
  },
  data () {
    return {
      value: '1'
    }
  },
  methods: {
    handleRemind () {
      console.log(this.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.remind-list
  text-align:center;
</style>
