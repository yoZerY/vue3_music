import { ref, watch, nextTick, computed } from 'vue'
export default function useSingerScroll(singers) {
  const TITLE_HEIGHT = 30
  const singersRef = ref(null)
  const listHeights = ref([])
  const distance = ref(0)
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const showTitle = ref(true)

  watch(singers, async () => {
    await nextTick()
    const list = singersRef.value.children
    let height = 0
    listHeights.value.length = []
    listHeights.value.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeights.value.push(height)
    }
  })
  watch(scrollY, (y) => {
    showTitle.value = y > 0
    for (let i = 0; i < listHeights.value.length; i++) {
      const heightTop = listHeights.value[i]
      const heightBottom = listHeights.value[i + 1]
      if (y >= heightTop && y <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - y
      }
    }
  })
  const titleStyle = computed(() => {
    const diff =
      distance.value > 0 && distance.value < TITLE_HEIGHT
        ? distance.value - TITLE_HEIGHT
        : 0
    return {
      transform: `translateY(${diff}px)`
    }
  })
  function onScroll(pos) {
    scrollY.value = -pos.y
  }
  return { singersRef, onScroll, currentIndex, titleStyle, showTitle }
}
