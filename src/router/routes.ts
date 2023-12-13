import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/UserCreation.vue') },
      { path: '/bmi', component: () => import('pages/BMI.vue') },
      { path: '/test', component: () => import('pages/BMITest.vue') },
      //{ path: '/train', component: () => import('pages/TrainingTimer.vue') },
      { path: '/overview', component: () => import('pages/FunctionsOverview.vue') },
      { path: '/', component: () => import('pages/GeoTest.vue') },
    ],
  },
  // Julian stinkt
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
