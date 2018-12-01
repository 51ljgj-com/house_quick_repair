<template lang="pug">
  article.weui-article(style="text-align:left")
    div(v-for="i in imgs")
      img( :src="i.cmgUrl")
      br
</template>
<script>
export default {
  data: () => ({
    imgs: []
  }),
  mounted() {
    this.$http.get('/api/order/getOrderContract', {
      params: {
        orderid: this.$route.params.id,
        token: Vue.userInfo.token
      }
    }).then(res => {
      let body = res.body;
      if (!res.body || res.body.error) {
        return;
      }
      body.contractUrls.forEach(i => {
        i.cmgUrl = this.SERVER_HOST + i.cmgUrl;
      })
      this.imgs = body.contractUrls;
    })
  }
}
</script>
<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
}
</style>


