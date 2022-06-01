
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('pages/AboutPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin', component: () => import('pages/Admin/AdminStart.vue') },
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/Admin/HomeNow.vue') },
      { path: '/home2', component: () => import('pages/AboutPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
