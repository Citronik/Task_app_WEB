// Composables
import { useUserStore } from '@/store/UserStore'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import NotFound from '@/views/main/NotFound.vue'
import Room from '@/views/room/Room.vue'
import Rooms from '@/views/room/Rooms.vue'
import CreateRoom from '@/views/room/CreateRoom.vue'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: () => import('@/views/main/Login.vue') },
  { path: '/', name: 'Home', component: () => import('@/views/main/Home.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/main/Registration.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/main/About.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/main/Contact.vue') },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: () => import('@/views/account/MyAccount.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/my-account/edit',
        name: 'EditAccount',
        component: () => import('@/components/Main/TheEditAccount.vue'),
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/my-account/change-password',
    name: 'ChangePassword',
    component: () => import('@/views/account/ChangePassword.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/rooms',
    name: 'Rooms', component: Rooms,
    meta: { requiresAuth: true },
  },
  {
    path: '/rooms/create',
    name: 'createRoom',
    component: CreateRoom,
    meta: { requiresAuth: true },
  },
  {
    path: '/rooms/:id',
    component: Room,
    props: route => ({ query: route.query.room_tab }),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound
  },
];

/* ts-ignore */
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
})

router.beforeEach( async (to: RouteLocationNormalized,
                    from: RouteLocationNormalized,
                    next: NavigationGuardNext
                  ) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userStore = useUserStore();
    //userStore.initialize();
    //const publicPages = ['Login', 'Register', 'Home', 'About'];
    //const authRequired = !publicPages.includes(to.name as string);
    try {
      const isValid = await userStore.isValidSession();
      console.log('router validation', isValid)
      if (!isValid) {
        return next({ name: 'Login' });
      }
    } catch (error) {
      console.error("Error during session validation:", error);
      next();
    }
  }
  next();
})
export default router
