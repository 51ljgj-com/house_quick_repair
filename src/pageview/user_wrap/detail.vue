<template lang="pug">
  .detail-wrapper
    loading(:show="!banners || !content")
    .carousel
      .banner(v-for="i in banners")
        img(:src="i.rollItemPicUrl")
    article.service-desc
      h2 服务简介
      ul.contents
        li(v-for="i in  content") {{i.serviceName}}
    .actions
      a.weui-btn.weui-btn_plain-default(@click="callUs()") 电话预约
      a.weui-btn.weui-btn_plain-primary(@click="goQuckOrder()") 免费预约
    article.promise
      h2 服务保障
      ul.contents
        li(v-for="i in  promise")
          i(:style="`background-image: url(/static/img/detail/${i.icon})`")
          p {{i.name}}
    article.service-case
      h2 施工案例
      ul.contents
        li(v-for="i in cases")
          .img
            img(:src="i.caseThumbUrl")
          .desc
            p
              strong 小区: {{i.hosueName}}
            p 服务项目: {{i.projectName}}
            p 服务时间: {{i.serviceTime}}
      a.look-all(href="#/all_cases") 查看全部
    article.price-tips
      h2 报价服务
      ul.contents
        li 价格透明,我们提供在线报价,价格明细表 自查,师傅现场详细报价,等多种方式报价,请根据实际需求查询
        li 推荐师傅现场报价,在线报价和价格明细表只能为区间报价，非最后合同价格,详细报价需师傅上门查看问题以及根据施工方案进行报价,目前我们提供全部采用免费上门检测服务，强烈推荐师傅现场报价
        li 为维护您的合法权益,以及售后保障法理依据,请不要与技师师傅私下交易,请在平台上进行交易结算操作.
</template>
<script>
import Loading from "../../component/wrap/loading.vue";
import { statusText, callUs } from "@/router/util.js";
const promise = [
  { name: "免费制定方案", icon: "icon_dingzhi.png" },
  { name: "价格透明", icon: "icon_jiage.png" },
  { name: "自有工人师傅", icon: "icon_gongren.png" },
  { name: "先施工后付款", icon: "icon_fukuan.png" },
  { name: "不满意免费返工", icon: "icon_manyi.png" },
  { name: "超长质保", icon: "icon_zhibao.png" }
];
export default {
  data: () => ({
    banners: null,
    content: null,
    promise,
    cases: []
  }),
  methods: {
    fetchBanners() {
      this.$http
        .get(
          "/api/projects/getProItemRollItems?projectid=" +
            this.$route.params.projectid
        )
        .then(res => {
          let body = res.body;
          if (body && body.code) {
            return;
          }
          this.banners = body.data.rollItemUrls
            .filter(i => i)
            .map(i => {
              i.rollItemPicUrl = this.SERVER_HOST + i.rollItemPicUrl;
              return i;
            });
        });
    },
    fetchCont() {
      this.$http
        .get(
          "/api/projects/getSubProjectItems?projectid=" +
            this.$route.params.projectid
        )
        .then(res => {
          let body = res.body;
          if (body && body.code) {
            return;
          }
          this.content = body.data[0].subServiceItemList;
        });
    },
    goQuckOrder() {
      this.$router.push({
        path: "/quick_order",
        query: {
          projectId: this.$route.params.projectid,
          orderContent: this.$route.query.project,
        }
      });
    },
    fetchCases() {
      this.$http.get("/api/projects/getProItemCase").then(res => {
        let body = res.body;
        if (body && body.error) {
          return;
        }
        body.data.forEach(
          i => (i.caseThumbUrl = this.SERVER_HOST + i.caseThumbUrl)
        );
        this.cases = body.data.slice(0, 3);
      });
    },

    callUs
  },
  mounted() {
    this.fetchBanners();
    this.fetchCont();
    this.fetchCases();
    this.$nextTick(() => {
      this.$BUS.$emit("subtitle-change", this.$route.query.project);
    });
  },
  watch: {
    banners() {
      this.$nextTick(() => {
        $(".carousel").slick({
          dots: true,
          autoplay: true
        });
      });
    }
  },
  components: {
    loading: Loading
  }
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  .carousel {
    width: 100%;
    height: 124px;
    text-align: center;
    color: #444;
    overflow: hidden;
    white-space: nowrap;
    .banner {
      display: inline-block;
      img {
        height: 124px;
        width: 100%;
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
    .contents {
      text-align: left;
    }
  }

  .service-desc {
    .contents {
      padding: 0 15px;
    }
    li {
      &:before {
        content: "●";
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
      min-width: 50%;
      display: inline-block;
      text-align: left;
      margin-top: 10px;
    }
  }

  .actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .weui-btn {
      flex: 1;
      margin: 0 20px;
    }
  }

  .promise {
    ul {
      list-style: none;
      overflow: hidden;
    }
    li {
      flex: 1;
      display: flex;
      width: 50%;
      float: left;
      padding-left: 10px;
      margin-top: 10px;
      i {
        width: 20px;
        height: 20px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
      p {
        flex-grow: 1;
        margin-left: 5px;
      }
    }
  }

  .price-tips {
    font-size: 14px;
    .contents {
      padding: 10px;
    }
    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 5px;
      &:before {
        content: "➡️";
        position: absolute;
        left: 0;
        top: 2px;
      }
    }
  }
  .service-case {
    li {
      display: flex;
      font-size: 14px;
      line-height: 1.25;
      margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
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
    .look-all {
      display: block;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      margin-top: 10px;
      font-size: 14px;
      color: #09bb07;
    }
  }
}
</style>
