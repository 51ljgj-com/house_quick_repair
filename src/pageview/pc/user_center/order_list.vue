<template lang="pug">
.order-list-container
  .order-item
    .order-head
      span 2017-12-25 18:19:12
      span 订单号： WXX2018050813523254
      span 地址 : 成都市武侯区人民南路四段三号
    table 
      tr 
        th(width="400px")
        th(width="200px")
        th(width="100px")
        th
      tr
        td
          .img
            img(src="/static/img/case_1.jpg")
            span.group 团购
          .info
            h3  门窗安装/维修
            p 1，“11.2” 个平方阳台贴砖。
              br
              | 2，11个平方需要美缝
              br
              | 3，3个平方的防水
              br
              | 4，30cm*100cm*60cm的剔除墙体操作。
        td
          p.cost
            | 订单总额:¥1825.00
            br
            | 预付款:- ¥200.00
            br
            | 优惠券: - ¥200.00
            br
            | strong 实付款:¥1442.50
          p.status 未支付
        td
          a(href="") 查看合同
        td
          el-button(type="danger") 立即支付
          el-button(plain) 联系客服
  .order-item
    .order-head
      span 2017-12-25 18:19:12
      span 订单号： WXX2018050813523254
      span 地址 : 成都市武侯区人民南路四段三号
    table 
      tr 
        th(width="400px")
        th(width="200px")
        th(width="100px")
        th
      tr
        td
          .img
            img(src="/static/img/case_1.jpg")
            span.group 团购
          .info
            h3  门窗安装/维修
            p 1，“11.2” 个平方阳台贴砖。
              br
              | 2，11个平方需要美缝
              br
              | 3，3个平方的防水
              br
              | 4，30cm*100cm*60cm的剔除墙体操作。
        td
          p.cost
            | 订单总额:¥1825.00
            br
            | 预付款:- ¥200.00
            br
            | 优惠券: - ¥200.00
            br
            | strong 实付款:¥1442.50
          p.status 未支付
        td
          a(href="") 查看合同
        td
          el-button(type="danger") 立即支付
          el-button(plain) 联系客服
</template>

<script>

export default {
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style lang="scss">
.order-list-container {
  padding: 10px;
  table {
    border-collapse: collapse;
    margin-top: -1px;
    text-align: center;
  }
  .order-head {
    background: #f5f5f5;
    height: 31px;
    line-height: 31px;
    color: #aaa;
    overflow: hidden;
    font-size: 12px;
    padding-left: 10px;
    border: 1px solid #e5e5e5;
  }
  .order-item {
    margin-bottom: 20px;
    td {
      padding: 14px 0;
      border: 1px solid #e5e5e5;
      padding: 10px;
    }

    .img {
      width: 150px;
      height: 150px;
      position: relative;
      overflow: hidden;
      float: left;
      img {
        max-width: 100%;
        max-width: 100%;
        float: left;
      }

      .group {
        display: block;
        background: red;
        color: #fff;
        font-size: 12px;
        line-height: 25px;
        text-align: center;
        transform: rotate(-45deg);
        position: absolute;
        width: 60px;
        left: -18px;
        top: 0;
      }
    }
    .info {
      overflow: hidden;
      text-align: left;
      padding-left: 10px;
    }
    .cost {
      text-align: left;
    }
    .status {
      padding-top: 10px;
      margin-top: 10px;
      color: red;
      border-top: 1px solid #e5e5e5;
    }

    button {
      margin: auto;
      margin-top: 10px;
    }
  }
}
</style>
