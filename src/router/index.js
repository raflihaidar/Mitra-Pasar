import { createRouter, createWebHistory } from 'vue-router'
import DetailProduct from '../page/DetailProduct.vue'
import LandingPage from '../page/LandingPage.vue'
import LoginUser from '../page/LoginUser.vue'
import LoginAdmin from '../page/LoginAdmin.vue'
import SignPage from '../page/SignPage.vue'
import ContentPage from '../page/ContentPage.vue'
import AdminPage from '../page/AdminPage.vue'
import NewDataPage from '../page/NewData.vue'
import CartComponent from '../page/CartPage.vue'
import UserProfile from '../page/UserProfile.vue'
import Store from '../store/modules/users/index'
import swal from 'sweetalert'

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
      path: '/product/detail/:productId',
      name: 'detail product',
      component: DetailProduct
    },
    {
      path: '/cart',
      name: 'cart page',
      component: CartComponent
    },
    {
      path: '/user/akun/profil',
      name: 'user profile',
      component: UserProfile
    }
  ]
})

router.beforeEach((to, from, next) => {
  let status = Store.state.isAuthenticated
  if (to.name !== 'login user' && !status && to.name === 'content page') {
    swal('Anda Belum Login\nSilahkan Login Terlebih Dahulu', {
      buttons: {
        cancel: 'Batal',
        confirm: 'Login'
      }
    }).then((login) => {
      if (login) next({ name: 'login user' })
      else next({ name: 'home' })
    })
  } else if (to.name === 'login user' && status) {
    alert('Anda Sudah Login')
  } else {
    next()
  }
})

export default router
