<template lang="pug">
  .index-wrap
    .carousel(v-show="banners.length")
      .banner(v-for="banner in banners")
        a.banner-image(:href="banner.rollItemLinkUrl" :style="`background-image:url(${banner.rollItemPicUrl})`")
    .weui-grids
      a.weui-grid(href="javascript:;" v-for="(i, k) in services" :key="k" :href="i.url")
        .weui-grid__icon
          img(:src="i.projectThumbUrl")
        p.weui-grid__label {{i.projectName}}
    .flows.content
      h2 服务流程
      ul 
        li(v-for="(v, k) in flows")
          img(:src="'/static/img/wrap/flow' + (k + 1) +'.png'" :style="{'background': v[0]}")
          p {{v[1]}}
    .content
      h2 合作伙伴
      img(src="/static/img/partner.png" style="width: 90%")
    .partner

</template>
<script>
//let serviceName = '厨卫改造，窗帘安装，打孔安装，防水补漏，管道疏通，家电维修，家具维修，局部改造，门窗维修安装，泥瓦贴砖，墙面粉刷，墙纸安装维修，水电改造'.split('，')

export default {
  data: () => ({
    services: [],
    flows: [
      ['#009fd3', '咨询预约'],
      ['#00cc9d', '方案制定'],
      ['#94cc73', '签约施工'],
      ['#ff2f39', '开展施工'],
      ['#9b9af8', '现场清理'],
      ['#ff66c7', '售后保障']
    ],
    banners: []
  }),
  methods: {
    fetchServices() {
      this.$http.get('/api/projects/projectItems').then(res => {
        let body = res.body
        if (body && body.code) {
          return
        }
        this.services = body.data.map(i => {
          i.projectThumbUrl = this.SERVER_HOST + i.projectThumbUrl.replace('..', '')
          i.url = `#/detail/${i.projectid}?project=${i.projectName}`
          return i
        })
      })
    },
    fetchBanners() {
      this.$http.get('/api/projects/getProItemRollItems').then(res => {
        let body = res.body;
        if (!body || body.error) {
          return;
        }
        body.data.rollItemUrls.forEach(i => {
          i.rollItemPicUrl = this.SERVER_HOST + i.rollItemPicUrl;
        })
        this.banners = body.data.rollItemUrls;
        console.log(this.banners)
      })
    },
    fetchFeatures() {
      this.$http.get('/api/projects/getFeatureRecommendItems').then(res => {
          let body = res.body
          if (body && body.code) {
            return
          }
          this.features = body.data.map(i => {
            i.thumbUrl = this.SERVER_HOST + i.featureItemThumbUrl.replace('..', '')
            i.linkUrl = i.featureItemLinkUrl.replace('..', '')
            return i
          });
          console.log(this.features);
      })
    },
    navigate(url) {
      this.$router.replace(url);
    }
  },
  mounted() {
    this.fetchServices()
    this.fetchBanners()
    this.fetchFeatures()
  },
  watch: {
    banners() {
      this.$nextTick(() => {
        $('.carousel').slick({
          dots: true,
          autoplay: true
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .index-wrap {
    .process-list {
      background: url(/static/img/process.png) no-repeat center;
      background-size: contain;
      height: 150px;
      li {
        display: none;
      }
    }

    .feature-item-wrapper {
      display: flex;
      a {
        img {
          width: 160px;
          height: 120px;
        }
      }
    }

    .flows {
      
      ul {
        display: flex;
        font-size: 12px;
        text-align: center;
      }
      li {
        float: left;
        flex: 1;
        position: relative;

        &:after {
          content: ' ';
          position: absolute;
          width: 6px;
          height: 6px;
          border: solid #ddd;
          border-width: 0 1px 1px 0;
          transform: rotate(-45deg) translate(50%, -50%);
          right: 0;
          top: 50%;
        }

        &:last-child:after {
          display: none;
        }

        img {
          display: block;
          margin: auto;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          background: #ddd;
          padding: 5px;
          margin-bottom: 10px;
        }
      }
    }
    .content {
      margin-top: 10px;
      background: #fff;
      padding: 15px 0;

      h2 {
        text-align: left;
        padding-left: 15px;
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }

    .carousel {
      width: 100%;
      height: 124px;
      text-align: center;
      color: #444;
      overflow: hidden;
      white-space: nowrap;
      .banner {
        display: inline-block;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        .banner-image {
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center;
        }
      }
    }
  }
  .weui-grid {
    padding: 15px 10px;
    border: 1px solid #eee;
  }
  .weui-grid__icon {
    width: 80%;
    height: 80%;
  }
  .weui-grids {
    background: #fff;
  }

  .weui-grid__icon+.weui-grid__label {
    font-size: 11px;
  }

  .recommend
  {
    height:160px;
  }

  .feature-item img
  {
    margin-top:8px;
    margin-right:20px;
    width:160px;
    height:100px;
    background-color:#000;
  }
</style>
