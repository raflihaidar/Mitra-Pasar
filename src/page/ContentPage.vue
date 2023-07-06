<template>
    <div class="bg-gray-100 w-full h-full">
        <NavbarComponent />
        <SearchBar />
        <div class="w-[80%] mx-auto font-openSans mt-10">
            <div class="w-full relative">
                <p class="text-2xl font-semibold">Kategori Produk</p>
                <div class="w-4/5 mx-auto grid grid-cols-5 text-sm text-center text-white font-semibold mb-20 mt-5">
                    <div v-for="(item, index) in category" :key="index" class="group">
                        <div class="w-[100px] h-[100px] leading-[90px] px-2 py-3 mr-3 rounded-lg cursor-pointer shadow-lg group-hover:scale-110 transition-all"
                            :class="item.status ? 'bg-lime-500' : 'bg-lime-600'" @click="selectCategory(item)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-y-10 my-5" v-if="catalogs.length !== 0">
                    <Suspense v-if="catalogs.length != 0">
                        <template #default>
                            <productComponent v-for="(item, index) in catalog" :key="index" class="group" :item="item" />
                        </template>
                        <template #fallback>
                            <div class="text-8xl">Loading</div>
                        </template>
                    </Suspense>

                    <router-link to="/cart"
                        class="fixed w-[40px] h-[40px] p-1 z-10 bg-lime-700 rounded-full bottom-5 right-16">
                        <CartIcon />
                        <span class="absolute bottom-7 -right-1 text-sm px-1  bg-red-600 text-white rounded-full">{{
                            totalItems
                        }}</span>
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

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import CartIcon from '../assets/icon/CartIcon.vue'
import FooterPage from './FooterPage.vue';
import { mapGetters } from 'vuex';
import SearchBar from '../components/SearchBar.vue';
import { defineAsyncComponent } from 'vue';

const productComponent = defineAsyncComponent({
    loader: () => import('./CatalogComponent.vue' /* webpackChunkName: "productComponent" */),
})

export default {
    name: 'ContentPage',
    components: {
        NavbarComponent,
        CartIcon,
        SearchBar,
        productComponent,
        FooterPage
    },
    data() {
        return {
            category: [
                {
                    name: "Jajanan Pasar",
                    url: "jajanan_pasar",
                    status: true
                },
                {
                    name: "Pakaian",
                    url: "pakaian",
                    status: false
                },
                {
                    name: "Mainan",
                    url: "mainan",
                    status: false
                },
                {
                    name: "Transportasi",
                    url: "transportasi",
                    status: false
                },
                {
                    name: "E-Warteg",
                    url: 'warteg',
                    status: false
                }
            ],
        }
    },
    methods: {
        selectCategory(item) {
            this.$store.dispatch('setCatalog', item.url)
            this.category.forEach((data) => {
                if (data == item) {
                    data.status = true;
                } else {
                    data.status = false
                }
            })
        }
    },
    computed: {
        ...mapGetters(['catalog', 'catalogs', 'cart']),
        totalItems() {
            return this.cart.reduce((a, b) => a + b.quantity, 0)
        }
    },
}
</script>