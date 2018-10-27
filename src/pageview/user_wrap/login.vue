<template lang="pug">
  .login-wrap.bd-wrap
    vue-form.weui-cells.weui-cells_form(:state="formstate")
      validate.weui-cell(:class="{'weui-cell_warn': formstate.tel && formstate.tel.$invalid}")
        .weui-cell__hd
          label.weui-label 手机号
        .weui-cell__bd
          input(class="weui-input" v-model="form.tel" type="tel" placeholder="请输入正确的手机号" required name="tel" pattern="\\d{11}")
        .weui-cell__ft
          button.weui-vcode-btn(@click.prevent="getCode()") {{disableGetCodeStr || '获取验证码'}}
      validate.weui-cell(:class="{'weui-cell_warn': formstate.code && formstate.code.$invalid}")
        .weui-cell__hd
          label.weui-label 验证码
        .weui-cell__bd
          input(class="weui-input" v-model="form.code" type="name" placeholder="请输入验证码" required name="code" pattern="\\d{6}")
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
    disableGetCodeStr: '',
    formstate: {}
  }),
  methods: {
    getCode() {
      let form = this.form;
      if (this.disableGetCodeStr) return
      if (this.formstate.tel && this.formstate.tel.$invalid) {
        return
      }

      let _t = 30;
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
      if (this.formstate.$invalid) return;
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
