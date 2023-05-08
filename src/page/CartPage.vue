<template>
    <NavbarComponent />
    <div class="container my-5" v-if="cart.length !== 0">
        <table class="w-[80%] mx-auto my-10 px-3 py-4 text-left table-auto mb-10 shadow-lg">
            <thead class="bg-lime-500">
                <tr class="text-white text-center">
                    <th class="px-5 py-3"></th>
                    <th class="px-5 py-3">Gambar</th>
                    <th class="px-5 py-3">Nama Produk</th>
                    <th class="px-5 py-3">Kuantitas</th>
                    <th class="px-5 py-3">Harga</th>
                    <th class="px-5 py-3"></th>
                </tr>
            </thead>
            <tbody class="">
                <tr v-for=" (item, index) in cart" :key="item.id"
                    class="text-sm font-semibold bg-lime-200 bg-opacity-25 text-center">
                    <td>
                        <input type="checkbox" v-model="selectedValues" :value="item.priceUser" @change="viewTotal"
                            @click="setStatus(index)">
                    </td>
                    <td>
                        <div style="width: 200px;" class="m-auto">
                            <img :src="item.img" alt="gambar produk" style="width: inherit;">
                        </div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">{{ item.product_name }}</td>
                    <td class="px-5 py-3 whitespace-nowrap">{{ item.quantity }}</td>
                    <td class="px-5 py-3 whitespace-nowrap">Rp.{{ item.priceUser }}</td>
                    <td class="text-white text center px-5 py-3 whitespace-nowrap">
                        <button class="bg-red-500 py-1 px-2 mr-3 rounded-md" @click="removeItem(index)">Delete</button>
                        <button class="bg-red-500 py-1 px-2 rounded-md" @click="clearAll(index)">Delete All</button>
                    </td>
                </tr>
                <tr v-if="selectedValues.length > 0 && Total > 0" class="text-sm font-semibold bg-lime-200 bg-opacity-25">
                    <td></td>
                    <td class="font-bold text-lg">Total :</td>
                    <td></td>
                    <td></td>
                    <td class="font-bold">Rp.{{ Total }}</td>
                    <td v-if="Total > 0" class="text-white text center px-5 py-3 whitespace-nowrap" @click="handleCheckOut">
                        <button class="bg-lime-600 px-2 py-1 text-cente rounded-md">Check Out</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-else
        class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-red-600 w-[60%] text-white text-3xl font-bold py-10 text-center mt-5">
        <div class="">
            <h3>Tidak Ada Produk Disini</h3>
        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'CartComponent',
    components: {
        NavbarComponent
    },
    data() {
        return {
            selectedValues: [],
            priceUser: null,
            id: null
        }
    },
    methods: {
        removeItem(index) {
            this.selectedValues.fill(0)
            this.$store.dispatch("removeCartProduct", index);
            this.$store.dispatch("getTotal", 0)
        },
        clearAll(item) {
            this.selectedValues.fill(0)
            this.$store.dispatch("clearCart", item);
            this.$store.dispatch("getTotal", 0)
        },
        handleCheckOut() {
            this.$store.dispatch("checkOut")
        },
        viewTotal() {
            let amount = this.selectedValues.reduce((a, b) => a + b, 0)
            console.log(amount)
            this.$store.dispatch("getTotal", amount)
        },
        setStatus(index) {
            console.log("ini index", index);
            this.$store.dispatch("handleStatus", index)
        }
    },
    computed: {
        ...mapGetters(["cart", "Total"]),
    },
    mounted() {
        this.selectedValues = this.cart.filter(item => item.status).map(item => item.priceUser);
        this.viewTotal();
    },
    watch: {
        selectedValues: {
            handler: function (newVal) {
                this.cart.forEach((item) => {
                    item.status = newVal.includes(item.priceUser);
                });
            },
            deep: true
        }
    }
}
</script>