<template lang="pug">
  .index-wrap
    .content.carousel
      .banner(style="background-image:url(/static/img/banner1.jpg)")
      .banner(style="background-image:url(/static/img/banner2.png)")
    .content.process
      .hd.center1200
        h2 服务流程
        p 签约保障，把握每一个细节
      ul.center1200
        li 免费咨询
        li 预约服务
        li 问题咨询
        li 签约施工
        li 验收付款
        li 售后保修
    .content.services
      .hd.center1200
        h2 服务项目
        p 签约保障，把握每一个细节
      .list
        a(v-for="(i, k) in services" :key="k" :href="'/service/detail/' + i.projectID")
          img(:src="'/static/img/service/' + i.projectName + '.png'")
          p {{i.projectName}}
    .content.order
      .hd.center1200
        h2 马上预约
        p 马上预约，免费上门制定施工方案
      el-form.form(ref="form" :model="form" label-width="140px")
        el-form-item(label="请输入维修内容：")
          el-input(type="textarea" v-model="form.content")
        el-form-item(label="服务地址：")
          el-col(:span="7")
            el-select(v-model="form.province" placeholder="请选择省份")
              el-option(label="四川" value="sichuan")
          el-col(class="line" :span="1") &nbsp;
          el-col(:span="7")
            el-select(v-model="form.city" placeholder="请选择城市")
              el-option(label="成都" value="sichuan")
          el-col(class="line" :span="1") &nbsp;
          el-col(:span="7")
            el-select(v-model="form.town" placeholder="请选择区县")
              el-option(label="高新区" value="sichuan")
        el-form-item(label="详细街道地址：")
          el-input(type="text" v-model="form.addr")
        el-form-item(label="联系电话：")
          el-input(type="text" v-model="form.phone")
        el-button(type="primary") 马上预约
      p.tip 预约后将会有工作人员在10分钟内跟你取得联系，请保持电话畅通.
    .content.slogan
      .hd.center1200
        h2 优质服务
        p 马上预约，免费上门制定施工方案
      ul
        li 智能派单
        li 自有工程师
        li 价格透明
        li 专业施工
        li 服务保障
    .content.partner
      .hd
        h2 合作伙伴
        p 品牌支持
        img(src="/static/img/partner.png")
</template>
<script>
//let serviceName = '厨卫改造，窗帘安装，打孔安装，防水补漏，管道疏通，家电维修，家具维修，局部改造，门窗维修安装，泥瓦贴砖，墙面粉刷，墙纸安装维修，水电改造'.split('，')

export default {
  data: () => ({
    form: {
      content: ''
    },
    services: []
  }),
  mounted() {
    this.fetchServices()
    $('.carousel').slick({
        dots: false,
        autoplay: true
      })
  },
  methods: {
    fetchServices() {
      this.$http.get('/api/user/serviceItems').then(res => {
        let body = res.body
        if (body && body.code) {
          return
        }
        this.services = body.data
      })
    }
  }
}
</script>

<style lang="scss">
  .index-wrap {
    .content {
      padding: 20px 0;
      color: #333;
      padding: 80px 0;
    }
    .content:nth-child(odd) {
      background: #222;
      color: #fff;
    }
    .hd {
      text-align: center;
      color: inherit;
      h2 {
        font-size: 40px;
        margin-bottom: 30px;
        font-weight: normal;
        ~ p {
          line-height: 30px;
          font-size: 24px;
          margin-bottom: 50px;
        }
      }
    }
    .carousel {
      width: 100%;
      height: 400px;
        .banner {
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          height: 100%;
          width: 100%;
        }
    }
    .process {
      ul {
        background: url(/static/img/process.png) no-repeat center;
        background-size: contain;
        height: 100px;
        li {
            display: none;
        }
      }
    }
    .order {
      .form {
        width: 700px;
        margin: auto;
      }
      .tip {
        margin-top: 20px;
        color: #999;
      }
    }
    
    .slogan {
      max-width: 1400px;
      margin: auto;
      ul {
        overflow: hidden;
      }
      li {
        float: left;
        width: 20%;
        font-size: 24px;
        text-align: center;
        &:before {
          content: ' ';
          display: block;
          width: 100px;
          height: 100px;
          margin: auto;
          border: 2px solid #fff;
          background-size: 80%;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 100px;
          margin-bottom: 20px;
        }
      }
      li:nth-child(1):before {
        background-image: url(/static/img/slogan1.png);
      }
      li:nth-child(2):before {
        background-image: url(/static/img/slogan2.png);
      }
      li:nth-child(3):before {
        background-image: url(/static/img/slogan3.png);
      }
      li:nth-child(4):before {
        background-image: url(/static/img/slogan4.png);
      }
      li:nth-child(5):before {
        background-image: url(/static/img/slogan5.png);
      }
    }

    .services {
      .list {
        width: 1000px;
        margin: auto;
        overflow: hidden;

        a {
          float: left;
          width: 20%;
          height: 200px;
          padding: 10px;

          &:hover img {
            transform: scale(1.1)
          }
        }
        img {
          width: 100px;
          margin-bottom: 20px;
          transition: .1s ease all;

          ~ p {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
