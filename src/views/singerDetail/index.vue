<template>
  <transition appear name="slide">
    <div v-loading="loading" class="singer-detail" v-if="singerInfo">
      <div class="details">
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back"></i>
          </div>
          <div class="title">{{ singerInfo.name }}</div>
          <div></div>
        </div>
        <div class="bg" ref="bgImage" :style="bgStyle">
          <div class="play-btn-wrapper" :style="playBtnStyle">
            <div v-show="songList.length > 0" class="play-btn" @click="random">
              <i class="icon-play"></i>
              <span class="text">随机播放全部</span>
            </div>
          </div>
        </div>
        <Scroll
          class="song-scroll"
          :style="scrollStyle"
          :probeType="3"
          @onScroll="onScroll"
        >
          <div class="song-list">
            <div
              class="song-info"
              @click="onPlaySong(song)"
              v-for="song in songList"
              :key="song.id"
            >
              <div>
                <img width="50" v-lazy="song.pic" alt="" />
              </div>
              <div class="info">{{ song.name }} -{{ song.album }}</div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '@/constant'
import Scroll from '@/components/Scroll/index.vue'
import { usePlayerStore } from '@/stores/player'
const slayerStore = usePlayerStore()
const router = useRouter()

const maxTranslateY = ref(0)
const scrollY = ref(0)
const bgImageHeight = ref(0)
const bgImage = ref(null)
const songList = ref([])
const singerInfo = computed(() => storage.session.get(SINGER_KEY))
const loading = computed(() => songList.value.length <= 0)

onMounted(() => {
  let bgH = bgImage.value.clientHeight
  bgImageHeight.value = bgH
  maxTranslateY.value = bgImageHeight.value - 40
  console.log(' maxTranslateY.value', maxTranslateY.value)
})

const bgStyle = computed(() => {
  let paddingTop = '70%'
  let zIndex = 0
  let height = 0
  let translateZ = 0

  if (scrollY.value > maxTranslateY.value) {
    paddingTop = 0
    height = '40px'
    translateZ = 1
    zIndex = 10
  }
  let scale = 1
  if (scrollY.value < 0) {
    scale = 1 + Math.abs(scrollY.value / bgImageHeight.value)
  }

  return {
    paddingTop,
    zIndex,
    height,
    backgroundImage: `url(${singerInfo.value.pic})`,
    transform: `scale(${scale})translateZ(${translateZ}px)`
  }
})
const playBtnStyle = computed(() => {
  let display = ''
  if (scrollY.value >= maxTranslateY.value) {
    display = 'none'
  }
  return {
    display
  }
})
const scrollStyle = computed(() => {
  return {
    top: `${bgImageHeight.value}px`
  }
})

watch(
  singerInfo,
  async (val) => {
    if (val?.mid) {
      const singerDetail = await getSingerDetail(val)
      const result = await processSongs(singerDetail.songs)
      songList.value = result
    }
  },
  { immediate: true, deep: true }
)

const goBack = () => {
  router.back()
}
const onScroll = (pos) => {
  scrollY.value = -pos.y
  console.log('scrollY.value', scrollY.value)
}
const random = () => {}
const onPlaySong = (song) => {
  console.log('song', song)
  slayerStore.playSong(song)
}
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
  .details {
    position: relative;
    height: 100%;
    .top {
      position: absolute;
      z-index: 11;
      width: 100%;
      height: 40px;
      align-items: center;
      display: flex;
      justify-content: space-between;
      .icon-back {
        margin-left: 12px;
        color: $color-theme;
        font-size: 18px;
      }
      .title {
        color: $color-text-ll;
        font-size: 16px;
      }
    }
    .bg {
      position: relative;
      width: 100%;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
    .song-info {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      .info {
        margin-left: 12px;
      }
    }
  }
  .song-scroll {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%;
    .song-list {
      background: $color-background;
    }
  }
}
</style>
