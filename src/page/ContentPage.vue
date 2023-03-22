<template>
    <NavbarComponent />
    <div class="w-[80%] mx-auto font-openSans">
        <div class="w-full relative">
            <div class="w-[60%] mx-auto my-10 flex shadow-lg items-center px-3 py-5 rounded-lg">
                <input type="search" class="w-full border-none outline-none " placeholder="Mau Cari Apa ?">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="w-full h-auto">
                <img src="" alt="">
            </div>
            <p class="text-2xl font-semibold">Kategori Produk</p>
            <div class="w-full grid grid-cols-7 text-sm text-center text-white font-semibold mb-20 mt-5">
                <div v-for="(item, index) in category" :key="index">
                    <p
                        class="w-[100px] h-[100px] leading-[90px] px-2 py-3 bg-lime-600 mr-3 rounded-lg cursor-pointer shadow-lg">
                        {{ item }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-4 gap-y-10 my-5">
                <div v-for="(item, index) in catalog" :key="index">
                    <div class="w-[200px] h-[300px] bg-lime-600 text-white rounded-lg flex flex-col justify-between">
                        <div class="w-full h-auto rounded-lg">
                            <img :src="item.url_gambar" :alt="item.name" class="w-full">
                        </div>
                        <div class="text-left font-semibold py-2 px-3">
                            <p class="text-lg">{{ item.nama_produk }}</p>
                            <p>Rp.{{ item.harga }}</p>
                        </div>
                        <div class="flex justify-between w-full px-2 py-3">
                            <button class="bg-yellow-400 px-2 py-1 rounded-md text-sm" @click="addToCart(item)">Add to
                                Cart</button>
                            <button class="p-1 rounded-md bg-gray-400" @click="likeButton($event)"><svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                            <button class="bg-lime-500 p-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                <router-link to="/cart" class="fixed w-[40px] h-[40px] p-1 z-10 bg-lime-700 rounded-full bottom-5 right-16">
                    <CartIcon />
                    <span class="absolute bottom-7 -right-1 text-sm px-1  bg-red-600 text-white rounded-full">{{
                        totalItems
                    }}</span>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import CartIcon from '../assets/icon/CartIcon.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'ContentPage',
    components: {
        NavbarComponent,
        CartIcon
    },
    data() {
        return {
            category: ['Jajanan Pasar', 'Sayur', 'Mainan Anak', 'Pakaian', 'Warteg Food', 'Barang Elektronik', 'E-Becak'],
            likeStatus: false
        }
    },
    methods: {
        addToCart(item) {
            this.$store.dispatch('addToCart', item)
        },
        likeButton(event) {
            event.target.parentElement.style.backgroundColor = 'red'
        }
    },
    computed: {
        ...mapGetters(['catalog', 'cart']),
        totalItems() {
            return this.cart.reduce((a, b) => a + b.kuantitas, 0)
        }
    },
}
</script>