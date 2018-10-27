<template lang="pug">
div(v-show="isShow")
  .weui-mask_transparent
  .weui-toast
    i.weui-loading.weui-icon_toast
    p.weui-toast__content 数据加载中
</template>
<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    isShow: false
  }),
  watch: {
    show(v) {
      this.isShow = v;
    }
  }
}
</script>
<style lang="scss" scoped>
  .weui-mask_transparent {
    background: #ffffff;
  }
</style>
