import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/scss/index.scss'
import './styles/index.scss'
import 'lib-flexible'

import loadingDir from '@/directives/loading/loading'

const app = createApp(App)
app.use(createPinia())
app.use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
})
app.directive('loading', loadingDir)
app.use(router)
app.mount('#app')
