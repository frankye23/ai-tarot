import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import HomeView from '@/views/HomeView.vue'
import Reading from '@/views/reading/index.vue'

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
      {
        name: 'Reading',
        path: '/reading',
        component: Reading,
        meta: {
          title: 'Reading',
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
