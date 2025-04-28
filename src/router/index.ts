import { createRouter, createWebHistory } from 'vue-router';

// Import views
import Dashboard from '../views/Dashboard.vue';
import Users from '../views/Users.vue';
import NotFound from '../views/NotFound.vue';
import Reports from '../views/Reports.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard' }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { title: 'User Management' }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/Analytics.vue'),
    meta: { title: 'Analytics' }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    meta: { title: 'Notifications' }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { title: 'Reports' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { title: 'Settings' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Page Not Found' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(
    // @ts-expect-error 未使用的参数
    to, 
    // @ts-expect-error 未使用的参数
    from, 
    savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Update page title
router.beforeEach((to, 
  // @ts-expect-error 未使用的参数
  from, 
  next) => {
  document.title = to.meta.title ? `${to.meta.title} | Admin Console` : 'Admin Console';
  next();
});

export default router;