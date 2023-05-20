<template>
    <NavbarComponent />
    <div v-for="(item, index) in product" :key="index">
        <div class="w-[80%] mx-auto my-16 bg-lime-600 p-20">
            <div class="flex gap-x-28">
                <div class="w-[40%]">
                    <img :src="item.img" alt="gambar product" class="mx-auto w-[500px]">
                </div>
                <div class="w-[60%]">
                    <p class="text-4xl bold">{{ item.product_name }}</p>
                    <div class="text-2xl my-5">Rp.{{ item.price }}</div>
                    <div class="text-xl">{{ item.description }}</div>
                    <div class="flex my-10 gap-x-5">
                        <button class="bg-lime-500 px-2 py-3 rounded-md" @click="addToCart(item)">Masukkan
                            Keranjang</button>
                        <button class="bg-lime-500 px-2 py-3 rounded-md" @click="buyNow(item)">Beli Sekarang</button>
                    </div>
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
</template>

<script>
import axios from 'axios'
import CartIcon from '../assets/icon/CartIcon.vue';
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';
import swal from 'sweetalert';
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
        CartIcon
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
            if (data.stock !== 0) {
                this.$store.dispatch('addToCart', item)
            } else {
                swal('Mohon Maaf, Stock Habis', {
                    icon: 'info'
                })
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
        ...mapGetters(['cart', 'catalog']),
        totalItems() {
            return this.cart.reduce((a, b) => a + b.quantity, 0)
        }
    },
}
</script>