<template lang="pug">
.item-detail-wrapper
  carousel(:list="carouselList")
  el-row
    el-col.grid-content(:span="12")

    el-col.grid-content(:span="12")
  
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
.top-services {
  li {
    img {
      width: 160px;
    }
  }
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
