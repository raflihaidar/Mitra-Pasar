<template>
  <NavbarComponent />
  <main class="w-[80%] flex justify-between gap-x-5 items-center mx-auto my-20 px-3 py-4 text-left mb-10">
    <div class="w-[60%]">
      <section>
        <p class="text-xl font-semibold">Checkout</p>
      </section>
      <section>
        <div>
          <p class="text-lg py-5">Alamat Pengiriman</p>
        </div>
        <div class="border-gray-400 border-y py-5">
          <p class="font-semibold">{{ dataFiltered.name }}</p>
          <p class="text-sm">{{ dataFiltered.telephone }}</p>
          <span class="text-sm text-gray-500">
            {{ dataFiltered.address }}
          </span>
        </div>
        <div>
          <button
            class="px-3 py-2 my-5 border border-gray-300 hover:border-gray-400 transition-colors  font-semibold text-md rounded-lg">Pilih
            Alamat
            Lain</button>
        </div>
      </section>

      <section class="w-full border-gray-400 border-y py-5">
        <div>
          <p class="font-semibold text-md">Mitra Pasar Store</p>
          <p class="text-sm">Surabaya Jawa Timur</p>
        </div>
        <div class="w-full flex justify-between items-start">
          <section class="w-[50%] ">
            <span v-for="(item, index) in selectedItem" :key="index"
              class=" flex justify-start items-center py-3 gap-x-3">
              <img :src="`data:image/png;base64,${item.image}`" alt="product image" class="w-[30%]">
              <span>
                <p>{{ item.product_name }}</p>
                <p>{{ item.quantity }} barang</p>
                <p class="font-semibold">Rp{{ item.total }}</p>
              </span>
            </span>
          </section>
          <section class="w-[50%]">
            <span class="font-semibold text-md">Pilih Durasi</span>
            <select class="bg-lime-800 border-none outline-none w-full px-3 py-2 text-white font-semibold">
              <option value="volvo">Reguler</option>
            </select>
            <p>Kurir Pilihan</p>
            <p>J&T (Rp16.000)</p>
            <p>Estimasi tiba 19 - 21 Oct</p>
          </section>
        </div>
      </section>

      <section class="my-5 flex justify-between font-semibold text-lg">
        <p>Subtotal</p>
        <p>Rp{{ Total }}</p>
      </section>
    </div>

    <section class="w-[35%] shadow-lg p-4">
      <section class="border-b border-gray-300">
        <p class="font-semibold text-md">Ringkasan Belanja</p>
        <span class="flex justify-between items-center py-1">
          <p>Total Harga</p>
          <p>Rp12.000</p>
        </span>
        <span class="flex justify-between items-center pb-1">
          <p>Total ongkos kirim</p>
          <p>Rp12.000</p>
        </span>
        <span class="flex justify-between items-center pb-1">
          <p>Asuransi Pengiriman</p>
          <p>Rp12.000</p>
        </span>
        <span class="flex justify-between items-center pb-1">
          <p>Biaya Proteksi produk</p>
          <p>Rp12.000</p>
        </span>
        <span class="flex justify-between items-center pb-1">
          Biaya Jasa Aplikasi
        </span>
      </section>
      <section class="text-lg font-semibold flex justify-between">
        <p>Total Belanja</p>
        <p>Rp200.000</p>
      </section>
      <button class="w-full my-3 bg-lime-800 px-3 py-2 rounded-lg text-white font-semibold">Pilih Pembayaran</button>
    </section>
  </main>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import NavbarComponent from '../components/NavbarComponent.vue';
import { useUserStore } from '../store/users';
import { useProductStore } from '../store/products'
import { onMounted } from 'vue';

const userStore = useUserStore()
const productStore = useProductStore()
const { dataFiltered } = storeToRefs(userStore)
const { selectedItem, Total } = storeToRefs(productStore)

onMounted(() => productStore.setSelectedItem(dataFiltered.value.id_cart))
</script>