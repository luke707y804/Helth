import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/UserCreation.vue') },
      { path: '/bmi', component: () => import('pages/BMI.vue') },
      { path: '/test', component: () => import('pages/BMITest.vue') },
      { path: '/train', component: () => import('pages/TrainingTimer.vue') },
      { path: '/', component: () => import('pages/GeoTest.vue') },
      { path: '/vib', component: () => import('pages/VibrateTest.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
