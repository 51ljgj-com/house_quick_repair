<template lang="pug">
  .index-wrap
    .carousel TODO 这是滚动区域
    .grid
    .recommend
    .flow
    .partner

</template>
<script>
export default {
  data: () => ({
    a: '这是第一页'
  }),
  methods: {
    alert () {
      alert(1)
    }
  }
}
</script>

<style lang="scss">
  .index-wrap {
    .process-list {
      background: url(/static/img/process.png) no-repeat center;
      background-size: contain;
      height: 150px;
      li {
        display: none;
      }
    }
  }
</style>
