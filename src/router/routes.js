
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
    path: '/api',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/api/login', component: () => import('pages/Admin/AdminStart.vue') },
    ]
  },
  {
    path: '/api/now',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/api/now', component: () => import('pages/Admin/HomeNow.vue') },
      { path: '/api/last', component: () => import('pages/AboutPage.vue') },

      //SETTINGS
      { path: '/api/workplaces', component: () => import('pages/Admin/Settings/WorkPlacesPage.vue') },

      //TESTING
      { path: '/api/test', component: () => import('pages/Admin/Settings/TESTw.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
