<template lang="pug">
  .login-wrap.bd-wrap
    .weui-cells.weui-cells_form
      .weui-cell
        .weui-cell__hd
          label.weui-label 手机号
        .weui-cell__bd
          input(class="weui-input" type="tel" placeholder="请输入正确的手机号")
        .weui-cell__ft
          button.weui-vcode-btn 获取验证码
      .weui-cell
        .weui-cell__hd
          label.weui-label 验证码
        .weui-cell__bd
          input(class="weui-input" type="name" placeholder="请输入验证码")
    .weui-btn-area
      a.weui-btn.weui-btn_primary 登录
    p.center
      | 还没有账号请
      a(href="#/register") 点击注册
   
</template>
<script>
export default {
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style lang="scss">
  .center {
    text-align: center;
    a {
      color: blue;
      text-decoration: underline;
    }
  }
</style>
