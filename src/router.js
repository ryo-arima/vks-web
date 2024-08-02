// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import RootPage from '@/pages/RootPage.vue';
import JavaPage from '@/pages/JavaPage.vue';

const routes = [
  {
    path: '/',
    name: 'RootPage',
    component: RootPage
  },
  {
    path: '/java',
    name: 'JavaPage',
    component: JavaPage
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;