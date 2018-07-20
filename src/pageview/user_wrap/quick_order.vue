<template lang="pug">
  .quick-order-wrap
    | 这是快速下单页面

</template>
<script>
export default {
  data: () => ({
    a: '这是第一页'
  }),
  methods: {
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
