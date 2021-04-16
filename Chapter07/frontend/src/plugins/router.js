import { createRouter, createWebHashHistory } from 'vue-router'
import Shop from '@/views/Shop'
import OrderForm from '@/views/OrderForm'
import Success from '@/views/Success'

const routes = [
  { path: '/', component: Shop },
  { path: '/order-form', component: OrderForm },
  { path: '/success', component: Success },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
