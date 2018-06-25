<template>
<div>
  <problems-header></problems-header>
  <problems-list></problems-list>
</div>
</template>

<script>
import ProblemsHeader from './components/Header'
import ProblemsList from './components/List'
export default {
  name: 'Problems',
  components: {
    ProblemsHeader,
    ProblemsList
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped></style>
