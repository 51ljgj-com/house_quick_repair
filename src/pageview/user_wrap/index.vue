<template lang="pug">
  .index-wrap
    .carousel
      .banner 第一页
      .banner 第二页
      .banner 第三页
    .weui-grids
      a.weui-grid(href="javascript:;" v-for="(i, k) in services" :key="k" :href="'/user/service_detail/' + i.projectID")
        .weui-grid__icon
          img(:src="i.projectThumbUrl")
        p.weui-grid__label {{i.projectName}}
    .recommend.content
      h2 特色推荐
    .flows.content
      h2 服务流程
      ul 
        li(v-for="(v, k) in flows")
          img(:src="'/static/img/wrap/flow' + (k + 1) +'.png'" :style="{'background': v[0]}")
          p {{v[1]}}
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
    ]
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
          return i
        })
      })
    }
  },
  mounted() {
    this.fetchServices()
    $('.carousel').slick({
        dots: false,
        autoplay: true
      })
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
      height: 200px;
      text-align: center;
      color: #444;
      overflow: hidden;
      white-space: nowrap;
      .banner {
        display: inline-block;
      }
    }
     
  }
  .weui-grid {
    padding: 15px 10px;
  }
  .weui-grid__icon {
    width: 35px;
    height: 35px;
  }
  .weui-grids {
    background: #fff;
  }
</style>
