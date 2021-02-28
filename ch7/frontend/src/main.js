import { createApp } from 'vue'
import App from './App.vue'
import router from '@/plugins/router'
import store from '@/plugins/vuex'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
