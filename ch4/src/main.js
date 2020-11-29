import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddPhotoFormPage from './components/AddPhotoFormPage';
import EditPhotoFormPage from './components/EditPhotoFormPage';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

const beforeEnter = (to, from, next) => {
  const loggedIn = localStorage.getItem('logged-in') === 'true';
  if (!loggedIn) {
    return next({ path: 'login' });
  }
  next();
}

const routes = [
  { path: '/add-photo-form', component: AddPhotoFormPage, beforeEnter },
  { path: '/edit-photo-form/:id', component: EditPhotoFormPage, beforeEnter },
  { path: '/search', component: SearchPage, beforeEnter },
  { path: '/login', component: LoginPage },
  { path: '/', component: HomePage, beforeEnter },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router);
app.mount('#app')
