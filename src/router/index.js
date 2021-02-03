import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/NotFound.vue'
import Calculate from '../views/Calculate.vue'
import Pagos from '../views/Pagos.vue'
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children : [{
      path : 'calculate',
      name : 'calculate',
      component : Calculate
    },
    {
      path : 'pagos',
      name : 'pagos',
      component : Pagos
    }],
    meta: {
      requiresAuth: false
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

