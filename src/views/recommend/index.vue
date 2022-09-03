<template>
  <div class="recommend" v-loading:[lText]="loading">
    <Scroll class="scroll-comp">
      <div>
        <Slider v-if="sliders.length" :sliders="sliders"></Slider>
        <div class="recommend-list">
          <h1 v-if="albums.length" class="list-title">热门歌单推荐</h1>
          <div
            class="album-item"
            :key="item.id"
            v-for="item in albums"
            @click="playSong(item)"
          >
            <img width="50" height="50" v-lazy="item.pic" />
            <div class="album-info">
              <div class="album-name">
                {{ item.username }}
              </div>
              <p class="album-title">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/Slider/index.vue'
import Scroll from '@/components/Scroll/index.vue'

const albums = ref([])
const sliders = ref([])

const lText = '加载中...'

const loading = computed(
  () => albums.value.length <= 0 || sliders.value.length <= 0
)

onMounted(async () => {
  const result = await getRecommend()
  albums.value = result.albums
  sliders.value = result.sliders
})

const playSong = (song) => {
  console.log('song', song)
}
</script>
<style lang="scss" scoped>
.scroll-comp {
  height: 100%;
}
.recommend-list {
  .list-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-theme;
  }
  .album-item {
    padding: 5px 10px;
    img {
      border-radius: 50%;
    }
    display: flex;
    .album-info {
      padding: 0 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .album-name {
        color: $color-text;
        font-size: $font-size-medium-x;
      }
      .album-title {
        color: $color-text-d;
      }
    }
  }
}
</style>
