<template>
  <main class="md:w-[80%] mx-auto font-openSans mt-10">
    <section class="w-full text-sm px-10">
      <p v-if="productFiltered.length > 0">Menampilkan 1 - 60 barang dari total 2.2jt+ untuk
        <span class="font-bold">"{{ $route.query.keyword }}"</span>
      </p>
      <div v-else class="p-5 w-full border-lime-700 border-2 rounded-lg">
        <p class="text-xl font-bold">Barang Tidak Ditemukan</p>
        <p>Coba kata kunci lain</p>
        <button class="w-1/5 py-2 rounded-md bg-lime-800 text-white text-center font-bold text-lg">Coba kata kunci
          lain</button>
      </div>
    </section>
    <section class="w-full grid md:grid-cols-4 grid-cols-2 justify-center items-center md:gap-10 my-5 gap-5 px-3">
      <CatalogComponent v-for="(item, index) in productFiltered" :key="index" :item="item" />
    </section>
  </main>
</template>

<script setup>
import CatalogComponent from '../components/CardComponent.vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../store/products';
const productStore = useProductStore()
const { productFiltered } = storeToRefs(productStore)
</script>