<template>
  <router-view></router-view>
</template>

<script setup>
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element'
import { useJajananStore } from './store/modules/jajanan_pasar'
import { onMounted } from 'vue'

const store = useJajananStore()

defineElement(lottie.loadAnimation)

onMounted(() => {
  new Promise((resolve) => setTimeout(resolve, 10000))
  store.setCatalog("jajanan_pasar")
})
</script>
