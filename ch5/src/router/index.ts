import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/currency-converter',
    component: () => import('../views/CurrencyConverter.vue')
  },
  {
    path: '/tips-calculator',
    component: () => import('../views/TipsCalculator.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
