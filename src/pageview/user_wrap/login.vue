<template lang="pug">
  .login-wrap.bd-wrap
    .weui-cells.weui-cells_form
      .weui-cell
        .weui-cell__hd
          label.weui-label 手机号
        .weui-cell__bd
          input(class="weui-input" v-model="form.tel" type="tel" placeholder="请输入正确的手机号")
        .weui-cell__ft
          button.weui-vcode-btn(@click="getCode()") {{disableGetCodeStr || '获取验证码'}}
      .weui-cell
        .weui-cell__hd
          label.weui-label 验证码
        .weui-cell__bd
          input(class="weui-input" v-model="form.code" type="name" placeholder="请输入验证码")
    .weui-btn-area
      a.weui-btn.weui-btn_primary(@click.stop="login()") 登录
    p.center
      | 还没有账号请
      a(href="#/register") 点击注册
   
</template>
<script>
export default {
  data: () => ({
    form: {
      tel: ''
    },
    disableGetCodeStr: ''
  }),
  methods: {
    getCode() {
      let form = this.form;
      if (this.disableGetCodeStr) return
      if (!form.tel || !/^\d{11}$/g.test(form.tel)) {
        return
      }

      let _t = 3;
      let _timer = null;
      _timer = setInterval(() => {
        if (_t <= 0) {
          this.disableGetCodeStr = '';
          clearInterval(_timer);
          return;
        }
        this.disableGetCodeStr = `${_t}秒后重新获取`;
        _t--
      }, 1000);

      this.$http.post('/api/auth/getVerificationCode', {
        phoneNo: form.tel
      }).then(res => {
        console.log(res);
      })
    },

    login() {
      let form = this.form;
      if (!form.tel || !/^\d{11}$/g.test(form.tel) || !form.code) {
        return;
      }
      this.$http.post('/api/auth/login', {
        phoneNo: form.tel,
        verificationCode: Number(form.code)
      }).then(res => {
        res = res.body;
        if (res.code) return;
        window.localStorage.setItem('userInfo', JSON.stringify(res.data));
        location.href = '/wrap.html';
      })
    }
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
