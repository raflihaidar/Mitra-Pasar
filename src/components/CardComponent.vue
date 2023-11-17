<template>
    <div class="z-10 capitalize md:w-[200px] w-full mx-auto md:h-[300px] text-black rounded-xl cursor-pointer shadow-xl group-hover:ring-4 ring-offset-1 ring-lime-600 transition-all"
        :class="item.stock === 0 ? 'grayscale' : null">
        <div class="h-[75%] grid">
            <router-link :to="'/product/detail/' + item.id">
                <div class="w-full h-auto rounded-lg">
                    <img :src="`data:image/png;base64,${item.image}`" :alt="item.product_name"
                        class="w-full h-full rounded-xl">
                </div>
            </router-link>
            <div class="text-left font-semibold py-2 px-3">
                <p class="text-sm" v-if="item.product_name.length > 20">{{ truncatedText }}</p>
                <p class="text-sm" v-else>{{ item.product_name }}</p>
                <p>Rp{{ productStore.getPriceProduct(item.price) }}</p>
            </div>
        </div>
        <div class="flex justify-between items-center w-full px-2 py-3 mt-5 z-20">
            <AddToCartBtn :item="item" />
            <WishlistBtn />
        </div>
    </div>
</template>

<script setup>
import WishlistBtn from './WishlistBtn.vue'
import AddToCartBtn from './AddToCartBtn.vue';
import { useProductStore } from '../store/products';
import { toRefs, ref } from 'vue';

const productStore = useProductStore()
const props = defineProps({
    item: Object
})
const { item } = toRefs(props)
let truncatedText = ref("")
let maxLength = 20;
let productName = item.value.product_name
truncatedText.value = productName.substring(0, maxLength) + "...";

</script>