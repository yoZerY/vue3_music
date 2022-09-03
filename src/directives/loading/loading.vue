<template>
  <div class="loading-dir">
    <div class="title">{{ title }}</div>
    <img width="20" src="../../assets/images/loading.gif" alt="" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const title = ref('loading')
const setTitle = (value) => {
  console.log('value', value)
  title.value = value
}
defineExpose({ setTitle })
</script>
<style lang="scss" scoped>
.loading-dir {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.7);
  .title {
    padding-bottom: 6px;
  }
}
</style>
