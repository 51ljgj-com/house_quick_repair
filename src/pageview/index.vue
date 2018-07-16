<template lang="pug">
  .index-wrap
    .carousel TODO 这是滚动区域
    .process 
      div
        h2 服务流程
        p 签约保障，把握每一个细节
      ul.process-list
        li 免费咨询
        li 预约服务
        li 问题咨询
        li 签约施工
        li 验收付款
        li 售后保修

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
