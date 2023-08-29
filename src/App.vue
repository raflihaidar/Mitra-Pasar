<template>
  <router-view></router-view>
</template>

<script setup>
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element'
import { useJajananStore } from './store/modules/jajanan_pasar'

const store = useJajananStore()

defineElement(lottie.loadAnimation)

store.setCatalog("jajanan_pasar")
</script>
