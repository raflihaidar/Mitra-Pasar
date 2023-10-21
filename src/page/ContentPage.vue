<template>
    <div class="bg-gray-100 w-full h-full">
        <NavbarComponent />
        <SearchBar />
        <div class="w-[80%] mx-auto font-openSans mt-10">
            <div class="w-full relative">
                <p class="text-2xl font-semibold">Kategori Produk</p>
                <div class="w-4/5 mx-auto grid grid-cols-5 text-sm text-center text-white font-semibold mb-20 mt-5">
                    <div v-for="(item, index) in category" :key="index" class="group">
                        <div class="w-[100px] h-[100px] flex items-center justify-center px-2 py-3 mr-3 rounded-lg cursor-pointer shadow-lg group-hover:scale-110 transition-all"
                            :class="item.status ? 'bg-lime-600' : 'bg-lime-700'" @click="selectCategory(item)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-y-10 my-5" v-if="catalog.length !== 0">
                    <CatalogComponent v-for="(item, index) in catalog" :key="index" class="group" :item="item" />
                    <router-link :to="`/cart?id=${dataFiltered.id}`" v-if="dataFiltered"
                        class="fixed w-[40px] h-[40px] p-1 z-10 bg-lime-700 rounded-full bottom-5 right-16">
                        <span class="absolute bottom-7 -right-1 text-sm px-1  bg-red-600 text-white rounded-full">{{
                            cartAmount
                        }}
                        </span>
                        <CartIcon class="text-xl mx-auto my-2" />
                    </router-link>
                </div>
                <div v-else class="bg-red-600 w-[60%] mx-auto text-white text-3xl font-bold py-10 text-center mt-5">
                    <p>Produk Belum Tersedia</p>
                </div>
            </div>
        </div>
        <FooterPage />
    </div>
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterPage from '../components/FooterPage.vue';
import SearchBar from '../components/SearchBar.vue';
import CartIcon from '../assets/icon/CartIcon.vue';
import { useUserStore } from '../store/users';
import { useProductStore } from '../store/products';
import { defineAsyncComponent, reactive, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../store/cart';

const CatalogComponent = defineAsyncComponent({
    loader: () => import('../components/CatalogComponent.vue' /* webpackChunkName: "productComponent" */),
})
const productStore = useProductStore()
const storeUsers = useUserStore()
const cartStore = useCartStore()
const { cartAmount } = storeToRefs(cartStore)
const { catalog } = storeToRefs(productStore)
const { dataFiltered } = storeToRefs(storeUsers)
const category = reactive([
    {
        name: "Semua Produk",
        url: "products",
        status: true
    },
    {
        name: "Makanan dan Minuman",
        url: 1,
        status: false
    },
    {
        name: "Bahan Pokok",
        url: 2,
        status: false
    },
    {
        name: "Elektronik",
        url: 3,
        status: false
    },
    {
        name: "Pakaian",
        url: 4,
        status: false
    }
],)

const selectCategory = (item) => {
    if (item.name === "Semua Produk") productStore.setCatalog(item.url)
    else productStore.setCatalogByCategory(item.url)

    category.forEach((data) => data.status = (data === item))
}
watchEffect(async () => {
    if (dataFiltered.value) {
        await cartStore.getCartByIdUser(dataFiltered.value.id)
        await cartStore.getCartAmount(dataFiltered.value.id)
    }
})

</script>