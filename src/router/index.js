import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main-layout'},
    component: () => import('../views/Home.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/inbox',
    name: 'Inbox',
    meta: {layout: 'main-layout'},
    component: () => import('../views/Inbox.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/material-icons',
    name: 'MaterialIcons',
    meta: {layout: 'main-layout'},
    component: () => import('../views/MaterialIcons.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main-layout'},
    component: () => import('../views/user/Profile.vue'),
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
