<template>
  <HeaderVue></HeaderVue>
  <TabVue></TabVue>
  <router-view class="top-page"></router-view>
  <Player></Player>
</template>
<script setup>
import HeaderVue from './components/Header/Header.vue'
import TabVue from './components/Tab/Tab.vue'
import Player from './components/Player/index.vue'
</script>
<style lang="scss" scoped></style>
