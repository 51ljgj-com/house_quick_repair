<template lang="pug">
.item-detail-wrapper
  carousel(:list="carouselList")
  el-row
    el-col.grid-content(:span="12")
    el-col.grid-content(:span="12")
  el-container.detail-content-container
    el-aside(width="300px")
      hot-service
    el-main.main-wrapper
      .title
        h2 参团小区
  example-case.service-case
  partner-list.service-partner
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
}
</style>
