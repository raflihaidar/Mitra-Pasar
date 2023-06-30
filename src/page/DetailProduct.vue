<template>
    <div class="bg-gray-100 w-full h-screen">
        <NavbarComponent />
        <div class="flex justify-evenly mt-20 py-20" v-for="(item, index) in product" :key="index">
            <div class="w-[40%] h-[40%]">
                <img :src="item.img" alt="gambar" class="w-[80%] h-[80%]">
            </div>
            <div class="flex flex-col gap-y-5 w-[40%]">
                <p class="text-5xl font-bold capitalize">{{ item.product_name }}</p>
                <p class="text-gray-600">{{ item.description }}</p>
                <div class="bg-white w-full h-4/5 rounded-lg">
                    <div class="border-b-2 border-gray w-full p-5 flex justify-between items-center">
                        <p class="font-bold text-xl">Rp.{{ item.price }}</p>
                        <div class="flex justify-between items-center gap-x-5">
                            <div @click="likeButton($event)" class="w-6 h-6 text-lime-600">
                                <FavoriteIcon />
                            </div>
                            <div @click="addToCart(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-lime-600">
                                    <path
                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                            </div>
                            <div class="bg-lime-600  py-3 px-3 rounded-full text-white text-sm font-semibold cursor-pointer"
                                @click="buyNow(item)">
                                Beli
                                Sekarang
                            </div>
                        </div>
                    </div>
                    <div class="p-5">
                        <p class="font-semibold">Apa yang termasuk dalam kotak?</p>
                    </div>
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
    <FooterPage />
</template>

<script>
import axios from 'axios'
import CartIcon from '../assets/icon/CartIcon.vue';
import FavoriteIcon from '../assets/icon/favoriteIcon.vue';
import FooterPage from './FooterPage.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';
import router from '../router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
export default {
    name: "DetailProduct",
    data() {
        return {
            product: [],
            checkStock: this.catalog
        };
    },
    components: {
        NavbarComponent,
        CartIcon,
        FavoriteIcon,
        FooterPage
    },
    methods: {
        async getDetailProduct(id) {
            try {
                const response = await axios.get(`http://localhost:8000/jajanan_pasar/product/${id}`);
                this.product = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        addToCart(item) {
            let data = this.catalog.find((p) => p.id === item.id)
            if (data.stock !== 0 && this.isAuthenticated) {
                this.$store.dispatch('addToCart', item)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil dimasukkan Keranjang',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data.stock === 0) {
                swal('Mohon Maaf, Stock Habis', {
                    icon: 'info'
                })
            } else if (!this.isAuthenticated) {
                swal('Anda Belum Login\nSilahkan Login Terlebih Dahulu', {
                    buttons: {
                        cancel: 'Batal',
                        confirm: 'Login'
                    }
                }).then(() => {
                    router.push({ name: 'login user' })
                })
            }
        },
        likeButton(event) {
            if (event.target.style.color != 'gold') {
                event.target.style.color = 'gold'
            } else {
                event.target.style.color = ''
            }
        },
        buyNow(item) {
            let data = this.catalog.find((p) => p.id === item.id)
            if (data.stock !== 0) {
                this.$store.dispatch('handleBuy', item)
                this.$store.dispatch("checkOut")
            } else {
                swal('Mohon Maaf, Stock Habis', {
                    icon: 'info'
                })
            }
        }
    },
    mounted() {
        const { productId } = this.$route.params;
        this.getDetailProduct(productId);
    },
    computed: {
        ...mapGetters(['cart', 'catalog', 'isAuthenticated']),
        totalItems() {
            return this.cart.reduce((a, b) => a + b.quantity, 0)
        }
    },
}
</script>