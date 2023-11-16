<template>
    <div class="bg-gray-100 w-full h-full">
        <NavbarComponent />
        <SearchBar />
        <div class="md:w-[80%] mx-auto font-openSans mt-10">
            <div class="w-full md:relative p-5">
                <p class="text-2xl font-semibold">Kategori Produk</p>
                <div
                    class="md:w-4/5 w-full md:mx-auto flex justify-between items-center text-sm text-center text-white font-semibold mb-20 mt-5 overflow-x-auto no-scrollbar">
                    <div v-for="(item, index) in category" :key="index">
                        <div class="flex justify-center items-center w-[100px] h-[100px] px-2 py-3 mr-3 rounded-lg cursor-pointer shadow-lg transition-all"
                            :class="item.status ? 'bg-lime-600' : 'bg-lime-700'" @click="selectCategory(item)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="w-full grid md:grid-cols-4 grid-cols-2 justify-center items-center md:gap-10 gap-5 my-5 px-3"
                    v-if="catalog.length !== 0">
                    <CatalogComponent v-for="(item, index) in catalog" :key="index" class="group" :item="item" />
                    <CartNavigation />
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
import CartNavigation from '../components/CartNavigation.vue';
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