<template lang="pug">
.user-center-wrapper
  .menu-container
    el-tree(:data="menuData" :props="defaultProps" @node-click="handleMenuClick")
  .right-cont
    h1 {{curTitle}}
    router-view.content-container
</template>

<script>

export default {
  data: () => ({
    payType: 'weixin',
    menuData: [
      {
        label: '我的订单',
        url: '#/user/orders'
      }
    ],
    curTitle: '我的订单'
  }),
  methods: {
    handleMenuClick(item) {
      this.curTitle = item.label;
    }
  }
}
</script>

<style lang="scss">
#bd.user-center-wrapper {
  width: 1024px;
  margin: auto;
  padding: 50px 0;
  
  .menu-container {
    width: 150px;
    float: left;
  }

  .el-tree {
    background: #f2f2f2;
  }

  .right-cont {
    overflow: hidden;
    padding-left: 20px;
  }

  h1 {
    font-size: 18px;
    color: #333;
  }

  .content-container {
    border: 1px solid #ccc;
    margin-top: 20px;
  }
}
</style>
