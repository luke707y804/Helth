import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/UserCreation.vue') },
      { path: '/bmi', component: () => import('pages/BMI.vue') },
      { path: '/test', component: () => import('pages/BMITest.vue') },
      //{ path: '/train', component: () => import('pages/TrainingTimer.vue') },
      {
        path: '/overview',
        component: () => import('pages/FunctionsOverview.vue'),
      },
      { path: '/geotest', component: () => import('pages/GeoTest.vue') },
      { path: '/vib', component: () => import('pages/CameraTest.vue') },
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
