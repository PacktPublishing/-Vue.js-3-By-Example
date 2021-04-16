import { createWebHashHistory, createRouter } from 'vue-router'
import Catalog from '../views/Catalog.vue'

const routes = [
  { path: '/', component: Catalog },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
