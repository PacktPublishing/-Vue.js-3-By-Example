import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Chatrooms from '../views/Chatrooms.vue'
import Register from '../views/Register.vue'
import AddChatroomForm from '../views/AddChatroomForm.vue'
import EditChatroomForm from '../views/EditChatroomForm.vue'
import Echo from "laravel-echo";
window.io = require('socket.io-client');

const beforeEnter = (to, from, next) => {
  const hasToken = Boolean(localStorage.getItem('token'));
  if (!hasToken) {
    return next({ path: 'login' });
  }
  next();
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/chatroom/:id',
    name: 'chatroom',
    component: ChatRoom,
    beforeEnter
  },
  {
    path: '/',
    name: 'chatrooms',
    component: Chatrooms,
    beforeEnter
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/add-chatroom',
    name: 'add-chatroom',
    component: AddChatroomForm,
    beforeEnter
  },
  {
    path: '/edit-chatroom/:id',
    name: 'edit-chatroom/:id',
    component: EditChatroomForm,
    beforeEnter
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

window.Echo = new Echo({
  broadcaster: "socket.io",
  host: "http://localhost:6001",
});

export default router
