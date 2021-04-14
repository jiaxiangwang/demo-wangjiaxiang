import Vue from 'vue'
import VueRouter from 'vue-router'
import demo from '../views/demo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: demo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
