<template>
  <router-view></router-view>
</template>

<script setup>
import { useProductStore } from './store/products'
import { useUserStore } from './store/users'
const productStore = useProductStore()
const usersStore = useUserStore()
productStore.setCatalog("products")
usersStore.setDataUser()
</script>
