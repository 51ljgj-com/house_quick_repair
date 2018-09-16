<template lang="pug">
.group-shopping-wrapper
  carousel(:list="carouselList")
  el-container.group-shopping  
    el-aside(width="300px")
      hot-service
    el-main.main-wrapper
      .title
        h2 参团小区
        el-input.search(placeholder="请输入内容" v-model="input5" class="input-with-select")
          el-button(slot="append" icon="el-icon-search")
      ul.grouping-list
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
        li
          el-row(:gutter="0")
            el-col.col_1(style="width: 180px;")
              img.item-img(src="/static/img/service_1.jpg")
            el-col.col_2(style="width: 120px;float:right;")
              label 10户
              el-button(type="danger") 我要拼团
            el-col.col_3(style="overflow:hidden;width: auto;float: none;") 
              p 楼盘小区：万科金润华府
              p 楼盘地址：锦江区菱窠路128号
              p 拼团项目：
                span.items
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
                  span.item 封阳台/防盗窗
      el-pagination.pager(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000")

      .service-desc
        h2 拼团优势
        .advantage
          dl
            dt 小区邻居共同选择，质量保证，专业售后
            dd 
              label 优惠更大
              p 拼团项目将享受更多折扣优惠
            dd 
              label 统一施工
              p 预约成功后，师傅们上门统一施工作业
            dd 
              label 统一售后、检修
              p 施工完成后，将进行统一检修维护
        h2 拼团流程
        img.group-step(src="/static/img/group_step.png")
        h2 拼团说明
        p.desc 
          span 封阳台/防盗窗 ,纱窗安装/维修,加入团购统一享受项目总价9折优惠，赶紧分享给小区邻居吧
          span 墙纸墙布安装,加入团购统一享受人工费用9折优惠
          span 房屋贴砖,加入团购统一享受人工费用9折优惠
          span 封阳台团购用户,在订单完成起一年时间内，享受一次平台提供的免费清洗所施工区域的玻璃服务.所述服务将在合同中具体落实
          span 纱窗安装/维修团购用户,在订单完成起一年时间内，享受一次平台提供的免费拆装清洁纱窗服务.所述服务将在合同中具体落实
          span 本折扣不与其他折扣同时进行
          span 参与团购活动的四个项目中，因为涉及材料采购成本，除房屋贴砖人工费外，其他类别项目需要在施工前支付部分预付款，用于材料购买
          span 如果支付问题,请立即联系:028-85147492
          span 在预约后24小时内，如因其他原因取消订单，请立即致电:028-85147492申请退款，我们在接到退款申请2个工作日把定金退给您的指定账户
  example-case.service-case
  partner-list.service-partner
</template>

</template>

<script>
import hotService from '../../component/hot_service.vue';
import exampleCase from '../../component/example_case.vue';
import partnerList from '../../component/partner_list.vue';
import Carousel from '../../component/carousel.vue';
export default {
  name: 'App',
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
.group-shopping {
  width: 1200px;
  margin: auto;
}
.grouping-list {
  li {
    padding: 20px 0 15px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .item-img {
    max-width: 100%;
    max-height: 100%;
  }
  .col_2 {
    .el-button {
      width: 100%;
    }
  }
  .col_3 {
    text-align: left;
    padding: 0 30px;

    .items {
      display: inline-block;
      vertical-align: top;
      width: 440px;
      .item {
        margin-right: 10px;
        &::before {
          content: ' ';
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #ee3923;
          border-radius: 10px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
}

.main-wrapper {
  padding: 0;
  padding-left: 20px;
  .title {
    overflow: hidden;
    h2 {
      float: left;
    }
    .search {
      width: 560px;
      float: right;
    }
  }
  .pager {
    margin-top: 20px;
  }
}

.service-desc {
  background: #f3f3f3;
  padding: 10px 20px;
  margin-top: 20px;
  h2 {
    font-size: 22px;
    color: #FF3300;
    margin: 15px 0;
    text-align: left;
  }
  .advantage {
    height: 320px;
    background: url(/static/img/grouping_bg.jpg) no-repeat center;
    background-size: 100%;
    dl {
      height: 100%;
      background: rgba(255 ,255, 255, .8);
      color: #333;
      padding-top: 80px;

      dt {
        font-size: 40px;
        width: 100%;
        margin-bottom: 30px;
      }

      dd {
        display: inline-block;
        width: 160px;
        margin: 0 45px;

        label {
          width: 100%;
          height: 50px;
          line-height: 50px;
          background: #ee3923;
          color: #fff;
          border-radius: 5px;
          margin-bottom: 20px;
          display: block;
        }
        p {
          text-align: left;
        }
      }
    }
  }
  .desc {
    text-align: left;
    span {
      display: block;
      padding-left: 15px;
      position: relative;
      margin-bottom: 5px;
      &::before {
        content: ' ';
        position: absolute;
        width: 10px;
        height: 10px;
        background: #ee3923;
        border-radius: 10px;
        vertical-align: middle;
        position: absolute;
        left: 0;
        top: 7px;
      }
    }
  }
  .group-step {
    margin: 10px auto;
    height: 200px; 
  }
}
.top-hd {
  font-size: 22px;
  line-height: 50px;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
}

.service-case {
  margin-top: 20px;
}
</style>
