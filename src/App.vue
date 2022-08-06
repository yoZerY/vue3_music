<template>
  <HeaderVue></HeaderVue>
  <TabVue></TabVue>
  <router-view class="top-page"></router-view>
</template>
<script setup>
import HeaderVue from './components/Header/Header.vue'
import TabVue from './components/Tab/Tab.vue'
</script>
<style lang="scss" scoped></style>
