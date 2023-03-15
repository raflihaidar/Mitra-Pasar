<template>
  <router-view></router-view>
</template>

<script>
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element'

defineElement(lottie.loadAnimation)

export default {
  name: 'App',
}
</script>

