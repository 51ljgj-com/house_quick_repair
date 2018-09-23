<template lang="pug">
  .index-wrap
    carousel.content(:list="carouselList")
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
        a(v-for="(i, k) in services" :key="k" :href="'#/service/detail/' + i.projectID")
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
        li
          .service.service1
            .img
            h3 免费上门
            p 极速响应，免费上门，最块当天安排工程师上门，现场指定维修方案
        li
          .service.service2
            .img
            h3 价格透明
            p 价格公开透明，满意再付款。无任何隐形消费
        li
          .service.service3
            .img
            h3 自有师傅团队
            p 平台自己工人师傅，安全放心，技术精湛，层层考核，高标准的专业施工团队
        li
          .service.service4
            .img
            h3 专业标准施工
            p 极速响应，免费上门，最块当天安排工程师上门，现场指定维修方案
        li
          .service.service5
            .img
            h3 先施工后付款
            p 极速响应，免费上门，最块当天安排工程师上门，现场指定维修方案
        li
          .service.service6
            .img
            h3 超长质保
            p 极速响应，免费上门，最块当天安排工程师上门，现场指定维修方案
    .content.partner
      .hd
        h2 合作伙伴
        p 品牌支持
        img(src="/static/img/partner.png")
    .content.questions
      .hd
        h2 常见问题
      .q-and-a
        h3 预约下单之后什么时候可以施工？
        p 在预约成功后，邻家工匠师傅将上门查看现场，并根据现场需要作出合适的施工方案，如果是简单修理，最快当天就能上门施工，特殊工程需要适当时间做施工前准备
        h3 在施工过程中，可以终止订单吗？
        p 如果在施工过程中，您因为个人愿意需要中止订单，请及时打电话通知客服人员，我们将根据具体的项目施工情况，工程进度规范处理并中止订单
        h3 施工完成后，遇到质量问题怎么办？
        p 施工完成后，如果遇到施工质量问题，请立即打电话通知客服人员，邻家工匠将立即安排专人查看现场，并给出合理的解决方案,直到处理完成，您满意为止
        h3 付款问题
        p 如果用户只有现金，没有微信，支付宝，银行卡，请提前电话与客服人员沟通，我们将告知师傅特殊处理
</template>
<script>
//let serviceName = '厨卫改造，窗帘安装，打孔安装，防水补漏，管道疏通，家电维修，家具维修，局部改造，门窗维修安装，泥瓦贴砖，墙面粉刷，墙纸安装维修，水电改造'.split('，')
import Carousel from '../../component/carousel.vue';
export default {
  data: () => ({
    form: {
      content: ''
    },
    services: [],
    carouselList: ['/static/img/banner1.jpg', '/static/img/banner2.png']
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
  },
  components: {
    carousel: Carousel
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
    .carousel {
      padding: 0;
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

.slogan {
  margin: auto;
  ul {
    overflow: hidden;
    width: 1305px;
    margin: auto;
  }

  li {
    width: 385px;
    height: 360px;
    background-color: #fff;
    box-shadow: 1px 1px 5px rgba(0,0,0,.7);
    float: left;
    margin: 25px;
  }
  .service {
    .img {
      height: 200px;
      background-color: #ee3923;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    h3 {
      font-size: 26px;
      line-height: 70px;
      margin-top: 10px;
      color: #333;
    }
    p {
      padding: 0 15px;
      font-size: 18px;
      color: #515151;
      text-align: left;
    }
  }
  .service1 .img {background-image: url(/static/img/service_1.jpg);}
  .service2 .img {background-image: url(/static/img/service_2.png);}
  .service3 .img {background-image: url(/static/img/service_3.jpg);}
  .service4 .img {background-image: url(/static/img/service_4.jpg);}
  .service5 .img {background-image: url(/static/img/service_5.jpg);}
  .service6 .img {
    background-image: url(/static/img/service_6.png);
    background-size: 155px 178px;
  }
}

.questions {
  .q-and-a {
    text-align: left;
    width: 1200px;
    margin: auto;
    h3 {
      font-size: 26px;
      color: #fff;
      margin-top: 20px;
    }
    p {
      font-size: 18px;
      margin-top: 10px;
      color: #fff;
      padding-left: 2em;
    }
  }
}
</style>
