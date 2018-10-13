<template lang="pug">
.item-detail-wrapper
  .detail-hd
    .banners
      carousel(:list="carouselList" :data-w="600" :data-h="400")
      .imgs
    .desc
      h1 门窗安装/安装/维修
      dl
        dt 【服务内容】
        dd 浴室玻璃隔断安装/维修
        dd 墙砖维修/安装
        dd 地砖维修/安装
        dd 浴室玻璃隔断安装/维修
        dd 墙砖维修/安装
        dd 地砖维修/安装
      el-button(type="danger") 立即预约
      el-button(type="danger" plain) 电话预约
      p.tip 马上预约，免费上门
  el-row
    el-col.grid-content(:span="12")
    el-col.grid-content(:span="12")
  el-container.detail-content-container
    el-aside(width="300px")
      hot-service(style="margin-top: 20px;")
    el-main.main-wrapper
      .chapter.service-feature
        .title 服务保障
        ul
          li 
            span 免费制定方案
          li
            span 价格透明
          li 
            span 自有工人师傅
          li 
            span 先施工后付款
          li 
            span 不满意免费返工
          li 
            span 超长质保
      .chapter.service-price
        .title 价格服务
        .head
          .mask
          .contain
            h3 免费上门，免费制定方案，先施工后付款
            ul
              li
                label 自主查询
                p 关注微信公众号"邻家工匠"进行自主查询.
              li
                label 师傅上门报价
                p 预约上门，师傅进行现场报价，价格准确
              li
                label 联系客服查询价格
                p 联系客服工作人员，进行报价预估
        ol.cont
          li 价格透明,我们提供在线报价,价格明细表 自查,师傅现场详细报价,等多种方式报价,请根据实际需求查询
          li 推荐师傅现场报价,在线报价和价格明细表只能为区间报价，非最后合同价格,详细报价需师傅上门查看问题以及根据施工方案进行报价,目前我们提供全部采用免费上门检测服务，强烈推荐师傅现场报价
          li 为维护您的合法权益,以及售后保障法理依据,请不要与技师师傅私下交易,请在平台上进行交易结算操作.
      
      .chapter.service-order
        .title 预约服务
        .head
          .mask
          .people
          .contain
            h3 在线客服，一对一服务
            p 预约下单，订单进度跟踪，订单紧急处理，售后服务，均可通过在线客服协助处理，快速响应，全程无忧
        ol.cont
          li 预约上门前，请与客服人员进行确认您的信息，以及师傅上门时间，请确保师傅上门期间，家中留人
          li 如需变更订单，取消，增加，减少服务项目，请提前联系我们，及时通知在线客服人员，由公司平台统一处理，也可拨打电话028-85147492处理
          li 在完成签订合同后，在准备施工或施工过程中，因为客户自购材料未到位，或者中途有事出门，物业不允许施工，等导致师傅不能正常施工或者拖延施工，需要加收一定误工费
          li 为了带给客户更好的服务以及保障客户的权益，请不要与师傅私下交易，若客户与师傅或他人跳过邻家工匠平台进行私下交易，产生的一切后果及法律责任均由客户自己承担，如因此造成对邻家工匠公司损失，保留追究法律责任的权力
          li 成品保护措施，在师傅上门施工前，不能进行直接施工，需要对墙面，地面，门窗，家具家电，柜体等家用物品进行包裹保护后才能施工，避免造成污染，具体收费情况根据师傅上门查看现场情况以及实际用量商定.
          li 施工完成后，我方只负责对施工区域进行大致卫生亲扫，细致的卫生由客户自行处理。
          
      .chapter.about-us
        .title 公司简介
        .head
          .mask
          .contain
            h3 房屋问题，一站式服务
            p 我们拒绝做桥头堡，选择邻家工匠，安全，可靠，放心，一站式解决所有房屋问题，省时，省力，更省心
        .cont
          .name 公司介绍
          p 邻家工匠隶属于成都绿野起点科技有限公司，创建于2014年7月，是专业的互联网+房屋装饰/维修平台,我们目前向用户提供高标准，高品质，更高效的房屋维修服务。
            br
            br 
            | 当前邻家工匠开通的维修项目包括,门窗维修/安装/翻新,墙纸墙布维修/安装/更换,防水补漏/维修/改造,墙面粉刷/维修/装修,泥瓦维修/安装,厨卫维修/安装/修理,墙上打孔/安装/钻孔,邻家工匠已经拥有完整的工程师师傅团队，目前开通了免费上门检测服务，如果您有房屋问题,请立即预约，我们将派遣专业的师傅免费上门检测，免费定制维修方案。
            br
            br 
            | 同时邻家工匠和大品牌材料服务商均有深入合作，邻家工匠上所购买的材料，配件，均为正品，并免费配送，无需自己动手，省钱，省心.

  example-case.service-case
  partner-list
</template>

<script>
import hotService from '../../component/hot_service.vue';
import exampleCase from '../../component/example_case.vue';
import partnerList from '../../component/partner_list.vue';
import Carousel from '../../component/carousel.vue';
export default {
  data: () => ({
    carouselList: ['/static/img/banner1.jpg', '/static/img/banner2.png']
  }),
  components: {
    'hot-service': hotService,
    'example-case': exampleCase,
    'partner-list': partnerList,
    carousel: Carousel
  }
}
</script>

<style lang="scss">
.detail-content-container {
  width: 1200px;
  margin: auto;

  .chapter {
    .title {
      padding: 15px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }
    .head {
      position: relative;
      height: 370px;
      .mask {
        background: rgba(255, 255, 255, .75);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      .contain {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      h3 {
        font-size: 22px;
        text-align: center;
        color: #333;
      }
      font-size: 16px;
      p {
        width: 70%;
        margin-top: 20px;
      }
    }
    .cont {
      background: #f2f2f2;
    }
  }

  .service-feature {
    ul {
      li {
        border: 1px solid #ccc;
        text-align: center;
        font-size: 16px;
        width: 33%;
        display: inline-block;
        border-collapse: collapse;
        padding: 20px;
        span {
          display: inline-block;
          width: 7em;
          text-align: left;
        }
        &:before {
          content: ' ';
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 30px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          margin-right: 5px;
        }

        &:nth-child(1):before {
          background-image: url(/static/img/service_feature/s_1.png);
        }
        &:nth-child(2):before {
          background-image: url(/static/img/service_feature/s_2.png);
        }
        &:nth-child(3):before {
          background-image: url(/static/img/service_feature/s_3.png);
        }
        &:nth-child(4):before {
          background-image: url(/static/img/service_feature/s_4.png);
        }
        &:nth-child(5):before {
          background-image: url(/static/img/service_feature/s_5.png);
        }
        &:nth-child(6):before {
          background-image: url(/static/img/service_feature/s_6.png);
        }
      }
    }
  }

  .service-order {
    .head {
      background: url(/static/img/service_feature/kefu_bg1.jpg) no-repeat center;
      background-size: cover;
      padding-left: 40%;
    }
    .people {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 40%;
      background: url(/static/img/service_feature/kefu_bg2.png) no-repeat right;
      background-size: contain;
      z-index: 1;
    }
  }

  .about-us {
    .head {
      background: url(/static/img/service_feature/worker_bg.jpg) no-repeat center;
      background-size: cover;
    }
    .cont {
      .name {
        border-bottom: 4px #f13714 solid;
        width: 6em;
        text-align: center;
        line-height: 2.5em;
        font-size: 16px;
        font-weight: bold;
      }
      p {
        font-size: 16px;
        padding: 20px;
        line-height: 1.5;
      }
    }
  }

  .service-price {
    .head {
      background: url(/static/img/service_feature/price_bg.jpg) no-repeat center;
      background-size: cover;
      ul {
        width: 80%;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        li {
          label {
            background: #f13714;
            border-radius: 5px;
            padding: 15px;
            color: #fff;
            font-size: 14px;
            display: block;
            text-align: center;
          }
          p {
            font-size: 14px;
            margin-top: 10px;
          }
          width: 150px;
        }
      }
    }
    .cont {
      padding: 40px 0;
      li {
        width: 80%;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
        &:before {
          content: '◆';
          margin-right: 8px;
        }
        margin-left: 10%;
      }
    }
  }

}

.item-detail-wrapper {
  .detail-hd {
    width: 1200px;
    margin: auto;
    display: flex;
    height: 450px;

    .banners {
      width: 600px;
    }
    .desc {
      flex-grow: 1;
      padding-left: 20px;

      h1 {
        background: #f2f2f2;
        font-size: 36px;
        padding: 20px 10px;
      }

      dl {
        margin-top: 10px;
        background: #f2f2f2;
        padding: 10px;

        dt {
          font-size: 18px;
          margin-bottom: 10px;
        }

        dd {
          font-size: 16px;
          display: inline-block;
          width: 50%;
          margin-bottom: 5px;
          &:before {
            content: '◆';
            margin-right: 5px;
          }
        }
      }
      .el-button {
        font-size: 44px;
        margin-top: 20px;
        font-weight: 100;
      }
      .tip {
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>
