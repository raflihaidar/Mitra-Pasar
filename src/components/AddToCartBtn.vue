<template>
  <button aria-label="add to cart"
    class="bg-lime-700 text-white font-semibold px-2 py-1 rounded-md text-sm focus:bg-yellow-400 focus:ring-2 ring-white transition-all"
    @click="addToCart">Add to
    Cart</button>
</template>

<script setup>
import { useCartStore } from '../store/cart';
import { useUserStore } from '../store/users';
import { storeToRefs } from 'pinia';

const props = defineProps({
  item: Object
})

const cartStore = useCartStore()
const userStore = useUserStore()
const { dataFiltered } = storeToRefs(userStore)

const addToCart = async () => {
  await cartStore.addToCart(props.item, dataFiltered.value)
}
</script>