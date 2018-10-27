<template lang="pug">
  .detail-wrapper
    loading(:show="!banners || !content")
    .carousel
      .banner(v-for="i in banners")
        img(:src="i.rollItemPicUrl")
    article
      h2 服务简介
      ul.contents
        li(v-for="i in  content") {{i.serviceName}}
    .actions
      a.weui-btn.weui-btn_plain-default 电话预约
      a.weui-btn.weui-btn_plain-primary(@click="goQuckOrder()") 免费预约
</template>
<script>
import Loading from '../../component/wrap/loading.vue';
export default {
  data: () => ({
    banners: null,
    content: null
  }),
  methods: {
    fetchBanners() {
      this.$http.get('/api/projects/getProItemRollItems?projectid=' + this.$route.params.projectid).then(res => {
        let body = res.body
        if (body && body.code) {
          return
        }
        this.banners = body.data.rollItemUrls.filter(i => i).map(i => {
          i.rollItemPicUrl = this.SERVER_HOST + i.rollItemPicUrl
          return i;
        });
      })
    },
    fetchCont () {
      this.$http.get('/api/projects/getSubProjectItems?projectid=' + this.$route.params.projectid).then(res => {
        let body = res.body
        if (body && body.code) {
          return
        }
        this.content = body.data[0].subServiceItemList;
      })
    },
    goQuckOrder() {
      this.$router.push({ path: '/quick_order', query: {orderContent: this.$route.query.project}})
    }
  },
  mounted() {
    this.fetchBanners()
    this.fetchCont()
    this.$nextTick(() => {
      this.$BUS.$emit('subtitle-change', this.$route.query.project)
    })
  },
  watch: {
    banners() {
      this.$nextTick(() => {
        $('.carousel').slick({
          dots: false,
          autoplay: true
        })
      })
    }
  },
  components: {
    'loading': Loading
  }
}
</script>

<style lang="scss" scoped>
  .detail-wrapper {
    .carousel {
      width: 100%;
      height: 200px;
      text-align: center;
      color: #444;
      overflow: hidden;
      white-space: nowrap;
      .banner {
        display: inline-block;
        img {
          width: 100%;
          height: 200px;
        }
      }
    }

    article {
      background: #ffffff;
      margin-top: 20px;
      padding: 10px 0;
      h2 {
        font-size: 18px;
        border-bottom: 1px solid #cccc;
      }
      ul.contents {
        padding: 0 15px;
        text-align: left;
        li {
          &:before {
            content: '●';
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
          }
          width: 50%;
          display: inline-block;
          text-align: left;
          margin-top: 10px;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      .weui-btn {
        flex: 1;
        margin: 0 20px;
        background: #ffffff;
      }
    }
  }
</style>
