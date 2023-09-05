// Composables
import { useUserStore } from '@/store/UserStore'
import { createRouter, createWebHistory } from 'vue-router'
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Registration.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "home" */ '@/views/About.vue'),
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: () => import(/* webpackChunkName: "home" */ '@/views/My-Account.vue'),
  },
  {
    path: '/rooms',
    component: () => import('@/views/room/Rooms.vue'),
    children: [
      {
        path: '',
        name: 'Rooms',
        component: () => import('@/views/room/Rooms.vue'),
      },
      {
        path: ':id',
        name: 'Room',
        component: () => import('@/views/room/Room.vue'),

      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach( async (to: RouteLocationNormalized,
                    from: RouteLocationNormalized,
                    next: NavigationGuardNext
                    ) => {
  const userStore = useUserStore();
  userStore.initialize();
  const publicPages = ['Login', 'Register', 'Home', 'About'];
  const authRequired = !publicPages.includes(to.name as string);

  if ( authRequired ) {
    try {
      const isValid = await userStore.isValidSession();
      if (!isValid) {
        next({ name: 'Login' });
      } else {
        //Maybe create alert!!
        next();
      }
    } catch (error) {
      next(false);
    }
  } else {
    next();
  }
})

export default router
