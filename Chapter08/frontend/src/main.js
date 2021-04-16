import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.interceptors.request.use((config) => {
  if (config.url.includes('login') || config.url.includes('register')) {
    return config;
  }
  return {
    ...config, headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const { data: { status } } = response;
  if (status === 'Token is Expired') {
    router.push('/login');
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

createApp(App).use(router).mount('#app')
