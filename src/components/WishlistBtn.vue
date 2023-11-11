<template>
  <button @click="likeButton($event)" class="w-6 h-6">
    <FavoriteIcon />
  </button>
</template>

<script setup>
import FavoriteIcon from '../assets/icon/favoriteIcon.vue';
const likeButton = (event) => {
  if (event.target.style.color != 'gold') event.target.style.color = 'gold'
  else event.target.style.color = ''
}
</script>