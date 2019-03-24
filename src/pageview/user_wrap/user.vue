<template lang="pug">
  .user-center-wrap.bd-wrap
    .weui-cells.user-info
      .weui-cell
        .weui-cell__hd
          img(src="/static/img/icon_200.png")
        .weui-cell__bd
          p.name {{username}}
    .weui-cells
      a.weui-cell.weui-cell_access(href="#/user/orders")
        .weui-cell__bd
          a 我的订单
        .weui-cell__ft
      //- a.weui-cell.weui-cell_access(href="javascript:;")
      //-   .weui-cell__bd
      //-     a 代金券
      //-   .weui-cell__ft
      a.weui-cell.weui-cell_access(href="#/contact")
        .weui-cell__bd
          a 客服中心
        .weui-cell__ft
      a.weui-cell.weui-cell_access(href="#/about")
        .weui-cell__bd
          a 关于我们
        .weui-cell__ft
    .weui-btn-area
      a.weui-btn.weui-btn_warn(@click.stop="logout()") 退出账号
</template>
<script>
export default {
  data: () => ({
    username: Vue.userInfo.username
  }),
  methods: {
    logout() {
      window.localStorage.clear('userInfo');
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  .weui-cell__hd {
    position: relative;
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: #f2f2f2;
    display: flex;
    img {
      max-width: 80%;
      max-height: 80%;
      margin: auto;
    }
  }
  .name {
    font-size: 16px;
  }
  .tel {
    color: #666;
  }
}
</style>
