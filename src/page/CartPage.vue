<template>
    <NavbarComponent />
    <div class="container my-5 pt-20 bg-gray-100 w-full h-full" v-if="cart.length !== 0">
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
                    class="text-sm font-semibold bg-lime-200 bg-opacity-25 text-center border-b-2">
                    <td class="align-middle">
                        <input type="checkbox" :checked="item.isChecked" :name="item.product_name" :v-model="item.status"
                            @click="setStatus(index)">
                    </td>
                    <td>
                        <div class="m-auto w-[200px]">
                            <img :src="`data:image/png;base64,${item.image}`" alt="gambar produk" style="width: inherit;">
                        </div>
                    </td>
                    <td class="px-5 py-3 whitespace-nowrap">{{ item.product_name }}</td>
                    <td class="px-5 py-3 whitespace-nowrap">{{ item.quantity }}</td>
                    <td class="px-5 py-3 whitespace-nowrap">Rp.{{ item.total.toLocaleString('id-ID') }}</td>
                    <td class="text-white text center px-5 py-3 whitespace-nowrap">
                        <button aria-label="delete cart item" class="bg-red-500 py-1 px-2 mr-3 rounded-md"
                            @click="removeItem(index, item)">Delete</button>
                        <button aria-label="delete all cart item" class="bg-red-500 py-1 px-2 rounded-md"
                            @click="clearAll(index)">Delete All</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="Total"
            class="w-[80%] flex left-[10%] rounded-lg fixed justify-between items-center bottom-0 text-sm text-center font-semibold bg-lime-200  px-5">
            <div class="flex">
                <p class="font-bold text-lg">Total : </p>
                <p class="font-bold text-lg">Rp.{{ Total }}</p>
            </div>
            <div class="text-white text center px-5 py-7 whitespace-nowrap">
                <router-link to="cart/shipment" class="bg-lime-600 px-10 py-2 text-cente rounded-md"
                    aria-label="checkout cart item">Beli</router-link>
            </div>
        </div>
    </div>

    <div v-else
        class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-red-600 w-[60%] text-white text-3xl font-bold py-10 text-center mt-5">
        <div class="">
            <h3>Tidak Ada Produk storeTotal</h3>
        </div>
    </div>
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue';
import { reactive, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCartStore } from '../store/cart';

const router = useRoute()
const cartStore = useCartStore();
const { cart, Total } = storeToRefs(cartStore)
const selectedValues = reactive([])

const removeItem = async (index, item) => {
    cartStore.removeItem(index, item)
}

const clearAll = (item) => {
    selectedValues.fill(0)
    cartStore.clearCart(item)
}

const setStatus = (index) => {
    cartStore.handleStatus(index)
}
watchEffect(() => {
    cartStore.getCartByIdUser(router.query.id)
})

</script>