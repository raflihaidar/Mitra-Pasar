<template>
    <NavbarComponent />
    <div class="container my-5 pt-20 bg-gray-100 w-full h-screen" v-if="cart.length !== 0">
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
            <tbody>
                <tr v-for=" (item, index) in cart" :key="index"
                    class="text-sm font-semibold bg-lime-200 bg-opacity-25 text-center">
                    <td class="align-middle">
                        <input type="checkbox" :checked="item.status" :name="item.product_name" :v-model="item.status"
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
                        <button class="bg-red-500 py-1 px-2 mr-3 rounded-md"
                            @click="removeItem(index, item)">Delete</button>
                        <button class="bg-red-500 py-1 px-2 rounded-md" @click="clearAll(index)">Delete All</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="total > 0"
            class="w-[80%] flex left-[10%] fixed justify-between items-center bottom-0 text-sm text-center font-semibold bg-lime-200  px-5">
            <div class="flex">
                <p class="font-bold text-lg">Total : </p>
                <p class="font-bold text-lg">Rp.{{ total }}</p>
            </div>
            <div v-if="total > 0" class="text-white text center px-5 py-3 whitespace-nowrap" @click="handleCheckOut">
                <button class="bg-lime-600 px-2 py-1 text-cente rounded-md">Check Out</button>
            </div>
        </div>
    </div>

    <div v-else
        class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-red-600 w-[60%] text-white text-3xl font-bold py-10 text-center mt-5">
        <div class="">
            <h3>Tidak Ada Produk Disini</h3>
        </div>
    </div>
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue';
import axios from 'axios'
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const cart = computed(() => store.getters.cart)
const total = computed(() => store.getters.Total)
const selectedValues = reactive([])
const removeItem = async (index, item) => {
    let result = item.stock + 1;
    await axios.patch(`http://localhost:8000/jajanan_pasar/${item.id}`, { stock: result })
        .then(() => {
            store.dispatch("setCatalog", "jajanan_pasar")
        })
    selectedValues.fill(0)
    store.dispatch("removeCartProduct", index);
}
const clearAll = (item) => {
    selectedValues.fill(0)
    store.dispatch("clearCart", item);
    console.log("item from cart", item)
}

const handleCheckOut = () => {
    store.dispatch("checkOut")
}
const setStatus = (index) => {
    store.dispatch("handleStatus", index)
}
</script>