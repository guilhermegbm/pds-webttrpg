
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'signup', component: () => import('pages/Cadastro.vue') },
      { path: 'signin', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/create_game',
    component: () => import('pages/CriarJogo.vue')
  },
  {
    path: '/game',
    component: () => import('pages/Jogo.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
