<template>
  <router-view></router-view>
</template>

<script setup>
import { useJajananStore } from './store/modules/products'
import { useUserStore } from './store/modules/users'
const store = useJajananStore()
const usersStore = useUserStore()
store.setCatalog("products")
usersStore.setDataUser()
</script>
