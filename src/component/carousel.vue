<template lang="pug">
.carousel
  .banner(v-for="item in list" :key="item" :style="{'background-image': 'url(' + item + ')'}")
</template>
<script>
export default {
  props: {
    list: {
      default: [],
      type: Array
    }
  },
  mounted() {
    $('.carousel').slick({
      dots: false,
      autoplay: true
    })
  }
}
</script>

<style lang="scss">
.carousel {
  width: 1200px;
  height: 450px;
  margin: auto;
  padding: 0;
    .banner {
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      height: 100%;
      width: 100%;
    }

    .slick-track {
      height: 100%;
    }
}
</style>