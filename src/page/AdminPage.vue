<template>
    <!-- <NavbarComponent /> -->
    <div class="w-full font-openSans">
        <div class="w-full  bg-lime-700 py-5 text-white font-bold">
            <p class="ml-6">Admin Dashboard</p>
        </div>

        <div class="w-[80%] mx-auto my-10 flex justify-between text-white">
            <div class="w-1/5 flex flex-col bg-lime-600 px-3 py-6 rounded-lg" @click="viewOverallSale">
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
            <p class="text-xl font-semibold text-black">Overall Sale</p>
            <table class="border-2 border-lime-700">
                <thead class="border-2 border-lime-700">
                    <!-- <th>Gambar</th> -->
                    <tr class="text-center">
                        <th class="px-5 py-3">No</th>
                        <th class="px-5 py-3">Nama</th>
                        <th class="px-5 py-3">Deskripsi</th>
                        <th class="px-5 py-3">Harga</th>
                        <th class="px-5 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in catalog" :key="index" class="border-2 border-lime-700">
                    <tr>
                        <td class="px-5 py-3">{{ index + 1 }}</td>
                        <td class="px-5 py-3">{{ item.nama }}</td>
                        <td class="px-5 py-3 truncate">{{ item.deskripsi }}</td>
                        <td class="px-5 py-3">{{ item.harga }}</td>
                        <td>
                            <div class="flex items-center justify-center gap-x-1">
                                <span class="cursor-pointer">
                                    <EditIconVue />
                                </span>
                                <span class="cursor-pointer" @click="modalsActive">
                                    <DeleteIcon />
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import CartIcon from '../assets/icon/CartIcon.vue'
import EditIconVue from '../assets/icon/EditIcon.vue'
import DeleteIcon from '../assets/icon/DeleteIcon.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'AdminPage',
    data() {
        return {
            overallSale: true,
        }
    },
    components: {
        CartIcon,
        EditIconVue,
        DeleteIcon,
    },
    methods: {
        viewOverallSale() {
            this.overallSale = !this.overallSale
        },
        deleteData(id) {
            this.$store.dispatch('deleteData', id)
        },
        modalsActive() {
            this.disabled = true
            console.log(this.disabled)
        }
    },
    computed: {
        ...mapGetters(['catalog'])
    },
}
</script>