
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'signup', component: () => import('pages/Cadastro.vue') },
      { path: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/create_game',
    component: () => import('pages/CriarJogo.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
