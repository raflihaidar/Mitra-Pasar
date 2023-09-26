<template>
  <router-view></router-view>
</template>

<script setup>
import { useJajananStore } from './store/modules/products'

const store = useJajananStore()


store.setCatalog("products")
</script>
