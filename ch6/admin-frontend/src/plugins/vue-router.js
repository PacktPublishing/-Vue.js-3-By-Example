import { createWebHashHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import Bookings from '../views/Bookings.vue'
import Catalog from '../views/Catalog.vue'

const beforeEnter = (to, from, next) => {
  try {
    const token = localStorage.getItem('token')
    if (to.fullPath !== '/' && !token) {
      return next({ fullPath: '/' })
    }
    return next()
  } catch (error) {
    return next({ fullPath: '/' })
  }
}

const routes = [
  { path: '/', component: Login },
  { path: '/bookings', component: Bookings, beforeEnter },
  { path: '/catalog', component: Catalog, beforeEnter },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
