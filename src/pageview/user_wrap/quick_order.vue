<template lang="pug">
  .quick-order-wrap.bd-wrap
    .weui-cells__title  快速下单
    .weui-cells.weui-cells_form
      .weui-cell
        .weui-cell__hd
          label.weui-label 姓名
        .weui-cell__bd
          input(class="weui-input" type="name" placeholder="请输入真实姓名")
      .weui-cell
        .weui-cell__hd
          label.weui-label 电话
        .weui-cell__bd
          input(class="weui-input" type="tel" placeholder="请输入正确的电话")
        .weui-cell__ft
          button.weui-vcode-btn 获取验证码
      .weui-cell
        .weui-cell__hd
          label.weui-label 地址
        .weui-cell__bd
          input(class="weui-input" type="name" placeholder="请输入详细地址")
      .weui-cell
        .weui-cell__hd
          label.weui-label 需求描述
        .weui-cell__bd
          textarea.weui-textarea(row="5" placeholder="请输入简要的需求说明")
    .weui-btn-area
      a.weui-btn.weui-btn_primary 确定
   
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
</style>
