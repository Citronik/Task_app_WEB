// Composables
import { useUserStore } from '@/store/UserStore'
import { createRouter, createWebHistory } from 'vue-router'
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const routes = [
  // { path: '/rooms', name: 'Rooms', component: () => import('@/views/room/Rooms.vue'),
  //   children: [
  //     { path: ':id/:slug', name: 'Room', component: () => import('@/views/room/Room.vue') },
  //   ],
  // },
  { path: ':id/:slug', name: 'Room', component: () => import('@/views/room/Room.vue') },
  { path: '', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/Registration.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/my-account', name: 'MyAccount', component: () => import('@/views/My-Account.vue') },
];

/* ts-ignore */
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
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
