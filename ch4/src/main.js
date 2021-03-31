import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PhotoFormPage from './components/PhotoFormPage';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';

const beforeEnter = (to, from, next) => {
  const loggedIn = localStorage.getItem('logged-in') === 'true';
  if (!loggedIn) {
    return next({ path: 'login' });
  }
  next();
}

const routes = [
  { path: '/add-photo-form', component: PhotoFormPage, beforeEnter },
  { path: '/edit-photo-form/:id', component: PhotoFormPage, beforeEnter },
  { path: '/search', component: SearchPage, beforeEnter },
  { path: '/', component: HomePage, beforeEnter },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router);
app.mount('#app')
