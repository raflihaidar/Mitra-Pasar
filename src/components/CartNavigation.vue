<template>
  <router-link :to="`/cart?id=${dataFiltered.id}`" v-if="dataFiltered"
    class="fixed w-[40px] h-[40px] p-1 z-10 bg-lime-700 rounded-full bottom-5 right-16">
    <span class="absolute bottom-7 -right-1 text-sm px-1  bg-red-600 text-white rounded-full">{{
      cartAmount
    }}
    </span>
    <CartIcon class="text-xl mx-auto my-2" />
  </router-link>
</template>

<script setup>
import CartIcon from '../assets/icon/CartIcon.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/users';
import { useCartStore } from '../store/cart';
const userStore = useUserStore()
const cartStore = useCartStore()
const { dataFiltered } = storeToRefs(userStore)
const { cartAmount } = storeToRefs(cartStore)
</script>