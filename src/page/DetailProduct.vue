<template>
    <div class="bg-gray-100 w-full h-screen">
        <NavbarComponent />
        <div class="flex justify-evenly mt-20 py-20" v-for="(item, index) in product" :key="index">
            <div class="w-[40%] h-[40%]">
                <img :src="`data:image/png;base64,${item.image}`" alt="gambar" class="w-[80%] h-[80%]">
            </div>
            <div class="flex flex-col gap-y-5 w-[40%]">
                <p class="text-5xl font-bold capitalize">{{ item.product_name }}</p>
                <p class="text-gray-600">{{ item.description }}</p>
                <div class="bg-white w-full h-4/5 rounded-lg">
                    <div class="border-b-2 border-gray w-full p-5 flex justify-between items-center">
                        <p class="font-bold text-xl">Rp {{ productStore.getPriceProduct(item.price) }}</p>
                        <div class="flex justify-between items-center gap-x-5">
                            <WishlishBtn />
                            <AddtoCartBtn :item="item" />
                            <!-- <div
                                class="bg-lime-600  py-3 px-3 rounded-full text-white text-sm font-semibold cursor-pointer">
                                Beli
                                Sekarang
                            </div> -->
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