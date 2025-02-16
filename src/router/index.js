import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    children: [
      {
        name: 'Home',
        path: '/',
        component: HomeView,
        meta: {
          title: 'Home',
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
