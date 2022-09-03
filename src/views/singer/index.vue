<template>
  <div class="singer" v-loading="loading">
    <Scroll @onScroll="onScroll" class="scroll-comp" :probeType="3">
      <div ref="singersRef" class="singer-list">
        <div class="singer-item" v-for="item in singers" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div
            class="one-singer"
            @click="querySingerInfo(singer)"
            v-for="singer in item.list"
            :key="singer.id"
          >
            <img width="50" height="50" v-lazy="singer.pic" alt="" />
            <div class="name">{{ singer.name }}</div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="top-title" v-if="showTitle" :style="titleStyle">
      <div class="text">{{ currentTitle }}</div>
    </div>
    <RigthNav :currentIndex="currentIndex" :navList="navList"></RigthNav>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { getSingerList } from '@/service/singer'
import storage from 'good-storage'
import Scroll from '@/components/Scroll/index.vue'
import RigthNav from './RigthNav.vue'
import { SINGER_KEY } from '@/constant'
import useSingerScroll from './useSingerScroll'
import { useRouter } from 'vue-router'
const router = useRouter()
const singers = ref([])
const navList = ref([])

const loading = computed(() => singers.value.length <= 0)

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
  navList.value = singers.value.map((item) => item.title)
})
const currentTitle = computed(() => {
  const title = navList.value[currentIndex.value]
  return title
})
const querySingerInfo = (singer) => {
  router.push({ path: `/singer/${singer.mid}` })
  storage.session.set(SINGER_KEY, singer)
}
const { onScroll, singersRef, currentIndex, titleStyle, showTitle } =
  useSingerScroll(singers)
</script>
<style lang="scss" scoped>
.singer {
  position: relative;
  height: 100%;
  overflow: hidden;
  .top-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .text {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
.scroll-comp {
  height: 100%;
}
.singer-item {
  .one-singer {
    padding: 10px 20px;
    display: flex;

    .name {
      margin-left: 20px;
      display: flex;
      align-items: center;
      font-size: $font-size-medium;
      color: $color-text-ll;
    }
  }
  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
    background: $color-highlight-background;
  }
}
</style>
