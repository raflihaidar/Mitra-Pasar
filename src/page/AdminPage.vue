<template>
    <div class="relative w-full font-openSans">
        <div class="w-full flex items-center gap-x-4 bg-lime-600 py-5 text-white font-bold pl-16">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-8 h-8" @click="sideBarView">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <LogoIcon />
        </div>

        <div class="absolute z-10 w-[250px] h-screen bg-lime-500 text-center text-white font-semibold"
            :class="sideBar ? '-translate-x-[250px]' : ''">
            <div class=" py-5 px-2">
                <p>Dashboard</p>
            </div>
            <div class="py-5">
                <p>Event</p>
            </div>
            <div class="py-5">
                <p>Customer</p>
            </div>
            <div class="py-5">
                <p>Transfer</p>
            </div>
            <div class="py-5">
                <p>Settings</p>
            </div>
        </div>

        <div class="w-[80%] mx-auto my-10 flex justify-between text-white">
            <div class="w-1/5 flex flex-col px-3 py-6 rounded-lg shadow-xl"
                :class="overallSale ? 'bg-lime-700' : 'bg-lime-600 '" @click="viewOverallSale">
                <CartIcon />
                <p class="font-semibold">Overall Sale</p>
                <p>{{ catalog.length }}</p>
            </div>
            <div class="w-1/5 flex flex-col  bg-lime-600 px-3 py-6 rounded-lg">
                <lord-icon src="https://cdn.lordicon.com/hbvyhtse.json" trigger="hover" colors="primary:#ffffff">
                </lord-icon>
                <p>Overall Visited</p>
                <p>3,925</p>
            </div>
            <div class=" w-1/5 flex flex-col  bg-lime-600 px-3 py-6 rounded-lg">
                <lord-icon src="https://cdn.lordicon.com/zchxlapl.json" trigger="hover" colors="primary:#ffffff">
                </lord-icon>
                <p>Overall Growth</p>
                <p>605</p>
            </div>
            <div class=" w-1/5 flex flex-col bg-lime-600 px-3 py-6 rounded-lg">
                <lord-icon src="https://cdn.lordicon.com/gsvbkwao.json" trigger="hover" colors="primary:#ffffff">
                </lord-icon>
                <p>Overall Profit</p>
                <p>6,275</p>
            </div>
        </div>

        <div :class="overallSale ? 'block' : 'hidden'" class="w-[80%] mx-auto">
            <p class="text-3xl text-center font-semibold text-black">Overall Sale</p>
            <router-link to="/admin/new_data">
                <button class="bg-lime-500 px-2 py-2 text-sm rounded-md text-white font-semibold my-2">Tambah Data</button>
            </router-link>


            <!-- Table -->
            <table class="border-2 border-lime-700 table-auto mb-10">
                <thead class="border-2 border-lime-700 bg-lime-500">
                    <tr class="text-white">
                        <th class="px-5 py-3">No</th>
                        <th class="px-5 py-3">Nama</th>
                        <th class="px-5 py-3 text-center">Deskripsi</th>
                        <th class="px-5 py-3">Harga</th>
                        <th class="px-5 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in catalog" :key="index" class="border-2 border-lime-700 relative">
                    <tr class="text-sm font-semibold bg-lime-200 bg-opacity-25">
                        <td class="px-5 py-3 whitespace-nowrap">{{ index + 1 }}</td>
                        <td class="px-5 py-3 whitespace-nowrap">{{ item.product_name }}</td>
                        <td class="px-5 py-3 whitespace-nowrap">{{ item.description }}</td>
                        <td class="px-5 py-3 whitespace-nowrap">Rp.{{ item.price }}</td>
                        <td>
                            <div class="flex items-center justify-center gap-x-1">
                                <span class="cursor-pointer" @click="activyActive(item)">
                                    <EditIconVue />
                                </span>
                                <span class="cursor-pointer" @click="modalsActive(item)">
                                    <DeleteIcon />
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <!-- Modals -->
                <div :class="modalDelete ? 'block' : 'hidden'"
                    class="fixed top-0 left-0 z-10 bg-black-rgba w-full h-full flex justify-center items-center"
                    @click="cancelButton">
                    <div
                        class="bg-white w-2/5 px-10 py-5 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 opacity-100 font-semibold text-center">
                        <p class="text-2xl">Yakin Ingin Menghapus</p>
                        <div class="mt-10 flex gap-x-10 justify-end text-lg">
                            <button class="bg-blue-300 p-3" @click="cancelButton">Batal</button>
                            <button class="bg-red-500 p-3" @click="deleteData(modalContent)">Hapus</button>
                        </div>
                    </div>
                </div>

                <div class="fixed top-0 left-0 z-10 bg-black-rgba w-full h-full flex justify-center items-center"
                    :class="modalModify ? 'block' : 'hidden'">
                    <div
                        class="bg-white w-2/5 px-10 py-5 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 opacity-100 font-semibold border-4 border-lime-600">
                        <section class="flex flex-col gap-y-1 mb-5">
                            <label>Nama Produk</label>
                            <input type="text" class="border-2 border-black px-2 py-1 rounded-md"
                                v-model="modalContent.product_name">
                        </section>
                        <section class="flex flex-col gap-y-1 mb-5">
                            <label>Stok</label>
                            <input type="text" class="border-2 border-black px-2 py-1 rounded-md"
                                v-model="modalContent.stock">
                        </section>
                        <section class="flex flex-col mb-5">
                            <label>Harga</label>
                            <input type="text" class="border-2 border-black px-2 py-1 rounded-md"
                                v-model="modalContent.price">
                        </section>
                        <section class="flex flex-col mb-5">
                            <label>Url Gambar</label>
                            <input type="text" v-model="modalContent.img"
                                class="border-2 border-black px-2 py-1 rounded-md">
                        </section>
                        <section class=" flex flex-col mb-5">
                            <label>Deskripsi</label>
                            <textarea name="" id="" cols="25" rows="8" class="border-2 border-black px-2 py-1 rounded-md"
                                v-model="modalContent.description"></textarea>
                        </section>
                        <section class="flex justify-end gap-x-5">
                            <button class="bg-blue-300 rounded-md px-3 py-2" @click="cancelButton">Batal</button>
                            <button class="bg-green-600 rounded-md px-3 py-2"
                                @click="saveNewData(modalContent.id)">Simpan</button>
                        </section>
                    </div>
                </div>
            </table>
        </div>
    </div>
</template>

<script>
import CartIcon from '../assets/icon/CartIcon.vue'
import EditIconVue from '../assets/icon/EditIcon.vue'
import LogoIcon from '../assets/icon/LogoIcon.vue';
import DeleteIcon from '../assets/icon/DeleteIcon.vue';
import { mapGetters } from 'vuex';
import axios from 'axios'
export default {
    name: 'AdminPage',
    data() {
        return {
            overallSale: true,
            modalDelete: false,
            modalModify: false,
            sideBar: true,
            modalContent: {
                id: 0,
                nama: '',
                stok: 0,
                deskripsi: '',
                harga: 0,
                gambar: ''
            }
        }
    },
    components: {
        CartIcon,
        EditIconVue,
        DeleteIcon,
        LogoIcon,
    },
    methods: {
        viewOverallSale() {
            this.overallSale = !this.overallSale
        },
        deleteData(id) {
            this.$store.dispatch('deleteData', id)
            console.log(this.modalContent)
            this.modalDelete = false
        },
        async saveNewData(id) {
            await axios.put(`http://localhost:8000/jajanan_pasar/${id}`, this.modalContent).then(() => {
                this.modalModify = false
            })
        },
        cancelButton() {
            this.modalDelete = false
            this.modalModify = false
        },
        modalsActive(item) {
            this.modalDelete = true
            this.modalContent = item
        },
        activyActive(item) {
            this.modalModify = true
            this.modalContent = item
        },
        sideBarView() {
            this.sideBar = !this.sideBar
        }
    },
    computed: {
        ...mapGetters(['catalog'])
    },
    mounted() {
        this.$store.dispatch('setCatalog')
        this.modalContent;
    }
}
</script>