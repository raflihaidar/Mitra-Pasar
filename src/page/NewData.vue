<template>
    <NavbarComponent />
    <div
        class="bg-lime-700 absolute left-[50%] top-[55%] -translate-x-1/2 -translate-y-1/2 border-2 border-lime-700 md:w-2/5 px-10 py-8 w-full">
        <form class="grid gap-y-2" method="POST" action="http://localhost:8000/products" enctype="multipart/form-data">
            <section class="flex flex-col gap-y-1">
                <label name="product_name" class="text-white">Name</label>
                <input name="product_name" type="text" class="p-2 rounded-md outline-none border-none">
            </section>
            <section class="flex flex-col gap-y-1">
                <label name="stock" class="text-white">Stok Barang</label>
                <input name="stock" type="text" class="p-2 rounded-md outline-none border-none">
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white" name="price">Harga</label>
                <input type="text" class="p-2 rounded-md outline-none border-none" name="price">
            </section>
            <section class="flex flex-col gap-y-1 w-2/5">
                <label class="text-white" name="price">Category</label>
                <select name="id_category" class="border-lime-600 px-2 py-2 rounded-lg outline-none">
                    <option :value="item.id" v-for="(item, index) in category" :key="index">{{ item.name }}</option>
                </select>
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white" name="image">Url Gambar</label>
                <input type="file" class="p-2 rounded-md outline-none border-none" name="image">
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white" name="description">Deskripsi Produk</label>
                <textarea cols="30" rows="5" class="p-2 rounded-md outline-none border-none" name="description"></textarea>
            </section>
            <button aria-label="add data" class="bg-lime-600 px-3 py-2 rounded-md">Tambah</button>
        </form>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import NavbarComponent from '../components/NavbarComponent.vue';
import { useProductStore } from '../store/products';

const productStore = useProductStore()

const { category } = storeToRefs(productStore)
</script>