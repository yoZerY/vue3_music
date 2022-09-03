import { createApp } from 'vue'
import Loading from './loading.vue'
const loadingDir = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      appendEl(el)
    }
    if (binding?.arg) {
      const title = binding.arg || 'loading'
      instance.setTitle(title)
    }
  },
  updated(el, binding) {
    if (binding?.arg) {
      const title = binding.arg || 'loading'
      el.instance.setTitle(title)
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? appendEl(el) : removeEl(el)
    }
  }
}

function appendEl(el) {
  const styles = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].indexOf(styles.position) === -1) {
    el.classList.add('g-relative')
  }
  el.appendChild(el.instance.$el)
}
function removeEl(el) {
  el.removeChild(el.instance.$el)
  el.classList.remove('g-relative')
}
export default loadingDir
