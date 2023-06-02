<template>
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
                <div v-for="(item, index) in catalog" :key="index" class="group">
                    <div class="z-10 w-[200px] h-[300px] bg-lime-600 text-white rounded-xl cursor-pointer shadow-xl group-hover:ring-4 ring-offset-1 ring-lime-600 transition-all"
                        :class="item.stock === 0 ? 'grayscale' : null">
                        <div class="h-[75%] flex flex-col justify-between">
                            <div class="w-full h-auto rounded-lg">
                                <img :src="item.img" :alt="item.product_name" class="w-full rounded-xl">
                            </div>
                            <div class="text-left font-semibold py-2 px-3">
                                <p class="text-lg">{{ item.product_name }}</p>
                                <p>Rp.{{ item.price }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between w-full px-2 py-3 mt-5 z-20">
                            <button
                                class="bg-yellow-500 px-2 py-1 rounded-md text-sm focus:bg-yellow-400 focus:ring-2 ring-white transition-all"
                                @click="addToCart(item)">Add to
                                Cart</button>
                            <div @click="likeButton($event)">
                                <FavoriteIcon />
                            </div>
                            <router-link :to="'/product/detail/' + item.id">
                                <button class="bg-lime-500 p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </router-link>
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
            <div v-else class="bg-red-600 w-[60%] mx-auto text-white text-3xl font-bold py-10 text-center mt-5">
                <p>Produk Belum Tersedia</p>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import CartIcon from '../assets/icon/CartIcon.vue'
import FavoriteIcon from '../assets/icon/favoriteIcon.vue';
import { mapGetters } from 'vuex';
import SearchBar from '../components/SearchBar.vue';
import axios from 'axios';
export default {
    name: 'ContentPage',
    components: {
        NavbarComponent,
        CartIcon,
        SearchBar,
        FavoriteIcon
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
        async addToCart(item) {
            this.$store.dispatch('addToCart', item)
            await axios.patch(`http://localhost:8000/jajanan_pasar/${item.id}`, { stock: item.stock })
        },
        likeButton(event) {
            if (event.target.style.color != 'gold') {
                event.target.style.color = 'gold'
            } else {
                event.target.style.color = ''
            }
        },
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