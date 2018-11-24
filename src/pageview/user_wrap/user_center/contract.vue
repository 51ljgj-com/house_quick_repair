<template lang="pug">
  article.weui-article(style="text-align:left")
    img(v-for="i in imgs" :src="i.cmgUrl")
</template>
<script>
export default {
  data: () => ({
    imgs: []
  }),
  mounted() {
    this.$http.post('/api/order/getOrderContract', {
      orderID: this.$route.params.id,
      token: Vue.userInfo.token
    }).then(res => {
      let body = res.body;
      if (!res.body || res.body.error) {
        return;
      }
      body.data.contractUrls.forEach(i => {
        i.cmgUrl = this.SERVER_HOST + i.cmgUrl;
      })
      this.imgs = body.data.contractUrls;
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


