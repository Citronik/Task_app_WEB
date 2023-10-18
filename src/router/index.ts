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
    children: [
      {
        path: '/my-account/edit', name: 'EditAccount', component: () => import('@/components/Main/TheEditAccount.vue')
      }
    ],
  },
  { path: '/my-account/change-password', name: 'ChangePassword', component: () => import('@/views/account/ChangePassword.vue') },
  {
    path: '/rooms', name: 'Rooms', component: Rooms},
  { path: '/rooms/create', name: 'createRoom', component: CreateRoom},
      {
        path: '/rooms/:id',
        component: Room,
        props: route => ({ query: route.query.room_tab })
      },
  { path: '/rooms/:id/edit', component: () => import('@/views/room/EditRoom.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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
