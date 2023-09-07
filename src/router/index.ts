// Composables
import { useUserStore } from '@/store/UserStore'
import { createRouter, createWebHistory } from 'vue-router'
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const routes = [
  // { path: '/rooms', name: 'Rooms', component: () => import('@/views/room/Rooms.vue'),
  //   children: [
  //     { path: '/:id/:slug', name: 'Room', component: () => import('@/views/room/Room.vue') },
  //   ],
  // },
  { path: '', name: 'Home', component: () => import('@/views/main/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/main/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/main/Registration.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/main/About.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/main/Contact.vue') },
  { path: '/my-account', name: 'MyAccount', component: () => import('@/views/account/My-Account.vue') },
  { path: '/my-account/edit', name: 'EditAccount', component: () => import('@/views/account/Edit-Account.vue') },
  { path: '/my-account/change-password', name: 'ChangePassword', component: () => import('@/views/account/Change-Password.vue') },
  { path: '/rooms/create', name: 'CreateRoom', component: () => import('@/views/room/Create-Room.vue') },
  { path: '/rooms/:id', name: 'Room', component: () => import('@/views/room/Room.vue') },
  { path: '/rooms/:id/edit', name: 'EditRoom', component: () => import('@/views/room/Edit-Room.vue') },
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
