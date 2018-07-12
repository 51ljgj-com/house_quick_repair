<template lang="pug">
  div.black {{a}}
    el-button(@click="alert(111)") 测试element.ui
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
  .black {
    color: #000;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
  }
</style>
