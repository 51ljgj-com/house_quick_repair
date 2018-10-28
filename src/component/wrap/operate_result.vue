<template lang="pug">
.operator-result(:style="style")
  .weui-msg
    .weui-msg__icon-area
      i.weui-icon-success.weui-icon_msg
    .weui-msg__text-area
      h2.weui-msg__title 操作成功
      p.weui-msg__desc(v-html="msg")
    .weui-msg__opr-area
      p.weui-btn-area
        a(v-for="(btn, index) in btns" :class="'weui-btn weui-btn_' + (index === 0 ? 'primary': 'default')" @click.stop="btn.cb()") {{btn.txt}}
    .weui-msg__extra-area
      .weui-footer
        p.weui-footer__links
          a.weui-footer__link(href="javascript:void(0);")
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    msg: '',
    btns: []
  },
  data: () => ({
    style: {
      left: '100%'
    }
  }),
  methods: {
    click() {}
  },
  mounted() {
   
  },
  watch: {
    isShow(v) {
      console.log(v);
      if (v) this.style.left = 0;
    }
  }
}
</script>

<style lang="scss">
.operator-result {
  position: fixed;
  left: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: #ffffff;
  transition: all .2s ease;
}
</style>