<template lang="pug">
  article.service-case(style="text-align:left")
    ul.contents
      li(v-for="i in cases")
        .img
          img(:src="i.caseThumbUrl")
        .desc
          p
            strong 小区: {{i.hosueName}}
          p 服务项目: {{i.projectName}}
          p 服务时间: {{i.serviceTime}}

</template>
<script>
export default {
  data: () => {
    return {
      cases: []
    }
  },
  methods: {
    fetchCases() {
      this.$http.get('/api/projects/getProItemCase').then(res => {
        let body = res.body
        if (body && body.error) {
        return;
        }
        body.data.forEach(i => i.caseThumbUrl = this.SERVER_HOST + i.caseThumbUrl)
        this.cases = body.data;
      })
    }
  },
  mounted() {
    this.fetchCases();
  }
}
</script>
<style lang="scss" scoped>
.service-case {
  h2 {
    font-size: 16px;
    line-height: 3;
  }
  li {
    display: flex;
    font-size: 14px;
    line-height: 1.25;
    margin: 0 10px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: none;
    }
    .img {
      width: 50px;
      height: 50px;
      text-align: center;
      background: #f2f2f2;
      margin-right: 5px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .desc {
      flex-grow: 1;
    }
  }
}
</style>

