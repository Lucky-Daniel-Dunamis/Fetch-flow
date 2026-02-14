// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// We'll import views later — for now just a placeholder home
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')  // lazy-loaded
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.View.vue')  
  }
  // We'll add /posts soon
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router