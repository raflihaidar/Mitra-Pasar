<template>
    <div class="z-10 capitalize w-[200px] h-[300px] text-black rounded-xl cursor-pointer shadow-xl group-hover:ring-4 ring-offset-1 ring-lime-600 transition-all"
        :class="item.stock === 0 ? 'grayscale' : null">
        <div class="h-[75%] grid">
            <div class="w-full h-auto rounded-lg">
                <img :src="`data:image/png;base64,${item.image}`" :alt="item.product_name" class="w-full h-full rounded-xl">
            </div>
            <div class="text-left font-semibold py-2 px-3">
                <p class="text-sm" v-if="item.product_name.length > 20">{{ truncatedText }}</p>
                <p class="text-sm" v-else>{{ item.product_name }}</p>
                <p>Rp.{{ item.price }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center w-full px-2 py-3 mt-5 z-20">
            <button aria-label="add to cart"
                class="bg-lime-700 text-white font-semibold px-2 py-1 rounded-md text-sm focus:bg-yellow-400 focus:ring-2 ring-white transition-all"
                @click="addToCart(item)">Add to
                Cart</button>
            <div @click="likeButton($event)" class="w-6 h-6">
                <FavoriteIcon />
            </div>
            <router-link :to="'/product/detail/' + item.id">
                <button class="bg-lime-700 p-1 rounded-md" aria-label="to detail product">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import FavoriteIcon from '../assets/icon/favoriteIcon.vue';
import { useJajananStore } from '../store/modules/products';
import { useUserStore } from '../store/modules/users';
import { storeToRefs } from 'pinia';
import { toRefs, ref } from 'vue';

const storeJajanan = useJajananStore()
const userStore = useUserStore()
const { dataFiltered } = storeToRefs(userStore)
const props = defineProps({
    item: Object
})
const { item } = toRefs(props)
let truncatedText = ref("")
let maxLength = 20;
let productName = item.value.product_name
truncatedText.value = productName.substring(0, maxLength) + "...";

const addToCart = async (item) => {
    await storeJajanan.addToCart(item, dataFiltered.value.id_cart)
    await storeJajanan.getCartAmount(dataFiltered.value.id)
    await storeJajanan.getCartByIdUser(dataFiltered.value.id)
}

const likeButton = (event) => {
    if (event.target.style.color != 'gold') {
        event.target.style.color = 'gold'
    } else {
        event.target.style.color = ''
    }
}
</script>