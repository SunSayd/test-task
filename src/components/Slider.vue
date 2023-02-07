<template>
  <div ref="slider" class="swiper slider">
    <div class="swiper-wrapper">
        <div v-for="(slide, index) in slides"
             :key="index"
             class="swiper-slide"
        >
          <img
              :src="slide"
              :alt="`Собака номер ${index}`"
              loading="lazy"
              class="slider__image"
          >
          <div class="swiper-lazy-preloader"/>
        </div>
    </div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script lang="ts">
import Swiper, {Navigation, Pagination} from 'swiper'

export default {
  name: 'Slider',
  props: {
    slides: Array,
  },
  mounted() {
    new Swiper(this.$refs.slider, {
      modules: [Navigation, Pagination],
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      // Enable lazy loading
      lazy: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        834: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    })
  }
}
</script>

<style lang="scss">
.slider__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
