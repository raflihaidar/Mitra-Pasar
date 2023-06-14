<template>
    <NavbarComponent />
    <main class="flex">
        <div class="bg-lime-300 text-center px-5 py-3 leading-10 h-full">
            <ul class="cursor-pointer" v-for="(item, index) in category" :key="index">
                <li class="border-b border-black" @click="selectCategory(item)">{{ item.nama }}</li>
            </ul>
        </div>
        <div class="bg-lime-300 w-[60%] mx-auto p-3 h-full" v-for="(item, index) in category" :key="index"
            v-show="item.isActive">
            <p class="font-semibold text-xl border-b-2 border-black pb-2">{{ item.nama }}</p>
            <form class="grid gap-y-3 mt-5">

                <div class="flex gap-x-3">
                    <label for="name" class="text-right w-1/5">
                        Name
                    </label>
                    <input type="text" :value="dataFiltered.name" id="name"
                        class="w-3/5 border-none outline-none bg-inherit">
                </div>

                <div class="flex gap-x-3">
                    <label for="name" class="text-right w-1/5">
                        Email
                    </label>
                    <input type="text" :value="dataFiltered.email" id="name"
                        class="w-3/5 border-none outline-none bg-inherit">
                </div>

                <div class="flex gap-x-3">
                    <label for="name" class="text-right w-1/5">
                        Nomor HP
                    </label>
                    <input type="text" :value="dataFiltered.nomor_hp" id="name"
                        class="w-3/5 border-none outline-none bg-inherit">
                </div>

                <div class="flex gap-x-3">
                    <label for="alamat" class="text-right w-1/5">
                        Alamat
                    </label>
                    <div class="w-[300px] h-auto bg-white px-3 py-2">
                        {{ dataFiltered.address }}
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>
  
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'UserProfile',
    components: {
        NavbarComponent
    },
    data() {
        return {
            category: [
                {
                    nama: 'Informasi pribadi',
                    isActive: true
                },
                {
                    nama: 'Informasi akun',
                    isActive: false
                },
                {
                    nama: 'Wishlist',
                    isActive: false,
                    data: 
                },
                {
                    nama: 'Informasi sosial media',
                    isActive: false
                },
                {
                    nama: 'Pengaturan dan Preferensi',
                    isActive: false
                },
                {
                    nama: 'Aktivitas dan Interaksi',
                    isActive: false
                },
                {
                    nama: 'Riwayat Transaksi',
                    isActive: false
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['dataUser', 'dataFiltered'])
    },
    methods: {
        selectCategory(item) {
            this.category.forEach((data) => {
                if (data == item) {
                    data.isActive = true;
                } else {
                    data.isActive = false
                }
            })
        }
    }
}
</script>