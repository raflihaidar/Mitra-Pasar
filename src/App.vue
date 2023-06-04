<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element'

import { defineAsyncComponent } from 'vue'
const ContentPage = defineAsyncComponent(() => import('./page/ContentPage.vue'))

defineElement(lottie.loadAnimation)

export default {
  name: 'App',
  components: {
    ContentPage
  },
  mounted() {
    this.$store.dispatch('setCatalog', 'jajanan_pasar')
  }
}
</script>
