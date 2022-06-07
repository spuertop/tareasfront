
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
      { path: '/api/login', component: () => import('src/pages/Admin/AdminLogin.vue') },
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
      { path: '/api/customers', component: () => import('pages/Admin/Settings/CustomersPage.vue') },
      { path: '/api/tasks', component: () => import('pages/Admin/Settings/TasksPage.vue') },

      //TESTING

    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
