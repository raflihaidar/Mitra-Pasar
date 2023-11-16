<template>
    <div class="bg-gray-100 w-full h-screen">
        <NavbarComponent />
        <div class="w-[90%] mx-auto flex flex-col md:flex-row md:justify-evenly justify-center md:mt-20 py-20"
            v-for="(item, index) in product" :key="index">
            <div class="md:w-[40%] md:h-[40%] w-full mb-5 md:mb-0">
                <img :src="`data:image/png;base64,${item.image}`" alt="gambar" class="md:w-[80%] md:h-[80%] w-full mx-auto">
            </div>
            <div class="flex flex-col gap-y-5 md:w-[40%]">
                <p class="md:text-5xl text-xl font-bold capitalize leading-3">{{ item.product_name }}</p>
                <p class="text-gray-600">{{ item.description }}</p>
                <div class="bg-white w-full h-4/5 rounded-lg">
                    <div class="border-b-2 border-gray w-full p-5 flex justify-between items-center">
                        <p class="font-bold text-xl">Rp {{ productStore.getPriceProduct(item.price) }}</p>
                        <div class="flex justify-between items-center gap-x-5">
                            <WishlishBtn />
                            <AddtoCartBtn :item="item" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CartNavigation />
    </div>
</template>

<script setup>
import WishlishBtn from '../components/WishlistBtn.vue'
import AddtoCartBtn from '../components/AddToCartBtn.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import CartNavigation from '../components/CartNavigation.vue';
import { useProductStore } from '../store/products';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const productStore = useProductStore()
const productId = useRoute()
const { product } = storeToRefs(productStore)

productStore.getDetailProduct(productId)
</script>