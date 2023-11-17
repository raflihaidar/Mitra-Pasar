import { createRouter, createWebHistory } from 'vue-router'

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
          component: () => import('../page/ProductDashboardPage.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../page/UserDashboardPage.vue')
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
      component: () => import('../page/ContentPage.vue'),
      children: [
        {
          path: 'catalog',
          name: 'catalog page',
          component: () => import('../page/CatalogPage.vue')
        },
        {
          path: 'search',
          name: 'search page',
          component: () => import('../page/SearchPage.vue'),
          props: true
        }
      ]
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
      path: '/cart/shipment',
      name: 'shipment page',
      component: () => import('../page/ShipmentPage.vue')
    },
    {
      path: '/user/akun/profil',
      name: 'user profile',
      component: () => import('../page/UserProfile.vue')
    }
  ]
})

export default router
