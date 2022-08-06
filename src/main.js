import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/scss/index.scss'
import './styles/index.scss'
import 'lib-flexible'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
