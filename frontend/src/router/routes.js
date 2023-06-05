
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'signup', component: () => import('pages/Cadastro.vue') },
      { path: 'signin', component: () => import('pages/Login.vue') },
      { path: 'game/:gameId', component: () => import('pages/Jogo.vue'), props: { gameId: '' } },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
