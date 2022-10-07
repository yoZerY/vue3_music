<template>
  <div class="player">
    <transition name="slide">
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.name }}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <img ref="cdImageRef" class="image" :src="currentSong.pic" />
          </div>
        </div>
      </div>
    </transition>
  </div>
  <audio ref="audioRef"></audio>
</template>
<script setup>
import { computed, watch, ref } from 'vue'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()

const audioRef = ref(null)

const fullScreen = computed(() => playerStore.fullScreen)
const playing = computed(() => playerStore.playing)
const currentSong = computed(() => playerStore.currentSong)

watch(currentSong, (song) => {
  if (!song.id || !song.url) {
    return
  }
  audioRef.value.src = song.url
  audioRef.value.play()
})

const goBack = () => {
  playerStore.fullScreen = false
}
</script>
<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
  }
  .top {
    position: relative;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
    }
    .icon-back {
      display: block;
      padding: 9px;
      font-size: $font-size-large-x;
      color: $color-theme;
      transform: rotate(-90deg);
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      @include no-wrap();
      font-size: $font-size-large;
      color: $color-text;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
  .middle {
    .middle-l {
      img {
        width: 75%;
        border-radius: 50%;
        border: 10px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
