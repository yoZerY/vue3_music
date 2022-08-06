<template>
  <div class="right-nav">
    <div
      class="item"
      v-for="(item, index) in navList"
      :key="item"
      :class="{ current: currentIndex === index }"
    >
      {{ item }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  navList: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})
</script>
<style lang="scss" scoped>
.right-nav {
  position: fixed;
  right: 6px;
  top: 20%;
  .item {
    color: $color-text-ll;
    padding: 3px;
    &.current {
      color: $color-sub-theme;
    }
  }
}
</style>
