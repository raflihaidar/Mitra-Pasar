import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/modules/users'
import swal from 'sweetalert'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../page/LandingPage.vue')
    },
    {
      path: '/login_user',
      name: 'login user',
      component: () => import('../page/LoginUser.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../page/SignPage.vue')
    },
    {
      path: '/admin',
      name: 'admin dashboard',
      component: () => import('../page/AdminPage.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../page/DashboradPage.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../page/UserPage.vue')
        }
      ]
    },
    {
      path: '/admin/new_data',
      name: 'add data',
      component: () => import('../page/NewData.vue')
    },
    {
      path: '/content',
      name: 'content page',
      component: () => import('../page/ContentPage.vue')
    },
    {
      path: '/product/detail/:productId',
      name: 'detail product',
      component: () => import('../page/DetailProduct.vue')
    },
    {
      path: '/cart',
      name: 'cart page',
      component: () => import('../page/CartPage.vue')
    },
    {
      path: '/user/akun/profil',
      name: 'user profile',
      component: () => import('../page/UserProfile.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  let status = store.dataFiltered.length !== 0
  if (to.name === 'cart page' && !status) {
    swal('Anda Belum Login\nSilahkan Login Terlebih Dahulu', {
      buttons: {
        cancel: 'Batal',
        confirm: 'Login'
      }
    }).then((login) => {
      if (login) next({ name: 'login user' })
      else next({ name: 'content page' })
    })
  } else if (to.name === 'login user' && status) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
