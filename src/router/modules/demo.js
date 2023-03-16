export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/PingView.vue'),
  },
  {
    path: '/ping',
    name: 'ping',
    component: () => import('@/views/PingView.vue'),
  },
  {
    path: '/port',
    name: 'port',
    component: () => import('@/views/PortView.vue'),
  },
  {
    path: '/domain',
    name: 'domain',
    component: () => import('@/views/DomainView.vue'),
  },
];
