import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../page/LandingPage.vue'
import LoginUser from '../page/LoginUser.vue'
import LoginAdmin from '../page/LoginAdmin.vue'
import SignPage from '../page/SignPage.vue'
import ContentPage from '../page/ContentPage.vue'
import AdminPage from '../page/AdminPage.vue'
import NewDataPage from '../page/NewData.vue'
import CartComponent from '../page/CartPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/login_user',
      name: 'login user',
      component: LoginUser
    },
    {
      path: '/login_admin',
      name: 'login admin',
      component: LoginAdmin
    },
    {
      path: '/sign',
      name: 'sign',
      component: SignPage
    },
    {
      path: '/admin',
      name: 'admin dashboard',
      component: AdminPage
    },
    {
      path: '/admin/new_data',
      name: 'add data',
      component: NewDataPage
    },
    {
      path: '/content',
      name: 'content page',
      component: ContentPage
    },
    {
      path: '/cart',
      name: 'cart page',
      component: CartComponent
    }
  ]
})

export default router
