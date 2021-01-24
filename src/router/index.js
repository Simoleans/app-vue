import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import firebase from "firebase/app";
import 'firebase/app';
import 'firebase/auth';

const routes = [
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      requiresAuth: false
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    },
  },
  {
    path: '/dasboard',
    name: 'Dasboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    },
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router

/*
***funcion nativa de vue-router para revisar todas las rutas y aqui le agregamos la validación del login
*** https://router.vuejs.org/api/#router-start-location
*/
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if(requiresAuth) {
    firebase.auth().onAuthStateChanged( (user) => {
      if (!user) next('/')
      else next();
    })
  } else next()
});

