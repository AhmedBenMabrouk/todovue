import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import todo from '../views/todo.vue'
import account from '../views/account.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/todo/:email',
    name: 'todo',
    component: todo
  },
  {
    path: '/account/:email',
    name: 'account',
    component: account
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
