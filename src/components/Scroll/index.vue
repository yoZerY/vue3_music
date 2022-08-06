<template>
  <div ref="scrollRef">
    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted, onActivated, onDeactivated } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)
const scrollRef = ref(null)
const scroll = ref(null)

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['onScroll'])

onMounted(() => {
  scroll.value = new BScroll(scrollRef.value, {
    observeDOM: true,
    probeType: props.probeType,
    click: props.click
  })
  if (props.probeType > 0) {
    scroll.value.on('scroll', (pos) => {
      emits('onScroll', pos)
    })
  }
})
onUnmounted(() => {
  scroll.value.destroy()
})

onActivated(() => {
  scroll.value.enable()
  scroll.value.refresh()
})

onDeactivated(() => {
  scroll.value.disable()
})
defineExpose(['scroll'])
</script>
<style lang="scss" scoped></style>
