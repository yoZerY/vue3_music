<template>
  <div v-loading="loading" class="singer-detail" v-if="singerInfo">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <div class="title">{{ singerInfo.name }}</div>
    <img width="300" :src="singerInfo.pic" alt="" />
  </div>
</template>
<script setup>
import { computed, watch, ref } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'

import storage from 'good-storage'
import { SINGER_KEY } from '@/constant'

const songList = ref([])
const singerInfo = computed(() => storage.session.get(SINGER_KEY))
const loading = computed(() => songList.value.length <= 0)

watch(
  singerInfo,
  async (val) => {
    if (val?.mid) {
      const singerDetail = await getSingerDetail(val)
      const result = await processSongs(singerDetail.songs)
      console.log('result', result)
      songList.value = result
    }
  },
  { immediate: true, deep: true }
)
</script>
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
