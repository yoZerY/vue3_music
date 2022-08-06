<template>
  <div class="banner-wrapper">
    <div class="slide-banner-wrapper" ref="slideRef">
      <div class="slide-banner-content">
        <div v-for="slider in sliders" class="slide-page" :key="slider.id">
          <img :src="slider.pic" alt="slider.pic" />
        </div>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(slider, index) in sliders"
        :key="slider.id"
        :class="{ active: currentPageIndex === index }"
      ></span>
    </div>
  </div>
</template>
<script setup>
import {
  defineProps,
  ref,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated
} from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

defineProps({
  sliders: {
    type: Array,
    default: () => []
  }
})

const slideRef = ref(null)
const slide = ref(null)
const currentPageIndex = ref(0)

onMounted(() => {
  slide.value = new BScroll(slideRef.value, {
    scrollX: true,
    scrollY: false,
    slide: true,
    momentum: false,
    bounce: false,
    probeType: 3
  })
  slide.value.on('slidePageChanged', (page) => {
    currentPageIndex.value = page.pageX
  })
})
onUnmounted(() => {
  slide.value.destroy()
})
onActivated(() => {
  slide.value.enable()
  slide.value.refresh()
})
onDeactivated(() => {
  slide.value.disable()
})
</script>
<style lang="scss" scoped>
.banner-wrapper {
  position: relative;
  .slide-banner-wrapper {
    min-height: 1;
    overflow: hidden;
  }

  .slide-banner-content {
    .slide-page {
      display: inline-block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #eee;
      &.active {
        background-color: $color-theme;
      }
    }
  }
}
</style>
