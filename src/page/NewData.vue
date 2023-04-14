<template>
    <NavbarComponent />
    <div
        class="bg-lime-700 absolute left-[50%] top-[55%] -translate-x-1/2 -translate-y-1/2 border-2 border-lime-700 md:w-2/5 px-10 py-8 w-full">
        <form class="grid gap-y-2">
            <section class="flex flex-col gap-y-1">
                <label name="nama" class="text-white">Name</label>
                <input name="nama" type="text" class="p-2 rounded-md outline-none border-none" v-model="data.nama">
            </section>
            <section class="flex flex-col gap-y-1">
                <label name="stok" class="text-white">Stok Barang</label>
                <input name="stok" type="text" class="p-2 rounded-md outline-none border-none" v-model="data.stok">
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white">Harga</label>
                <input type="text" class="p-2 rounded-md outline-none border-none" v-model="data.harga">
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white">Url Gambar</label>
                <input type="url" class="p-2 rounded-md outline-none border-none" v-moel="data.gambar">
            </section>
            <section class="flex flex-col gap-y-1">
                <label class="text-white">Deskripsi Produk</label>
                <textarea cols="30" rows="5" class="p-2 rounded-md outline-none border-none"
                    v-model="data.deskripsi"></textarea>
            </section>
        </form>
        <button class="bg-lime-600 px-3 py-2 rounded-md" @click="addData">Tambah</button>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarComponent from '../components/NavbarComponent.vue';
export default {
    name: 'NewDataPage',
    data() {
        return {
            data: {
                nama: '',
                deskripsi: '',
                stok: '',
                harga: null,
                gambar: ''
            }
        }
    },
    components: {
        NavbarComponent
    },
    methods: {
        async addData() {
            await axios.post('http://localhost:8000/jajanan_pasar', this.data).then(() => {
                this.$router.push({ name: 'admin dashboard' })
            })
        }
    }
}
</script>