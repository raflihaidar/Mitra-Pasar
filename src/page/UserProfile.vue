<template>
    <div>
        <NavbarComponent />
        <main class="flex">
            <div class="bg-lime-300 text-center px-5 py-3 leading-10 h-full">
                <ul class="cursor-pointer" v-for="(item, index) in category" :key="index">
                    <li class="border-b border-black" @click="selectCategory(item)">{{ item.nama }}</li>
                </ul>
            </div>
            <div class="bg-lime-300 w-[60%] mx-auto p-3 h-full">
                <div v-for="(item, index) in category" :key="index" v-show="item.isActive">
                    <p class="font-semibold text-xl border-b-2 border-black pb-2">{{ item.nama }}</p>
                    <div class="grid gap-y-3 mt-5">
                        <div v-for="(value, index) in item.content" :key="index" class="flex gap-x-3 items-center">
                            <label :for="index" class="text-right w-1/5">{{ value.nama }}</label>
                            <div class="w-[300px] h-auto bg-white px-3 py-2">
                                {{ value.data }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'UserProfile',
    components: {
        NavbarComponent
    },
    computed: {
        ...mapGetters(['dataUser', 'dataFiltered'])
    },
    data() {
        return {
            category: [
                {
                    nama: 'Informasi pribadi',
                    content: [
                        { nama: 'Nama', data: '', inputType: 'text' },
                        { nama: 'Alamat', data: '', inputType: 'text' }
                    ],
                    isActive: true
                },
                {
                    nama: 'Informasi akun',
                    content: [
                        { nama: 'Email', data: '', inputType: 'email' },
                        { nama: 'Nomor HP', data: '', inputType: 'text' }
                    ],
                    isActive: false
                },
                {
                    nama: 'Wishlist',
                    content: [
                        { nama: 'Jajanan Pasar', data: '', inputType: 'text' }
                    ],
                    isActive: false,
                }
            ]
        }
    },
    methods: {
        selectCategory(item) {
            this.category.forEach((data) => {
                data.isActive = data === item;
            })
        }
    },
    created() {
        this.category.forEach((item) => {
            if (item.nama === 'Informasi pribadi') {
                item.content.forEach((value) => {
                    if (value.nama === 'Nama') {
                        value.data = this.dataFiltered.name;
                    } else if (value.nama === 'Alamat') {
                        value.data = this.dataFiltered.address;
                    }
                });
            } else if (item.nama === 'Informasi akun') {
                item.content.forEach((value) => {
                    if (value.nama === 'Email') {
                        value.data = this.dataFiltered.email;
                    } else if (value.nama === 'Nomor HP') {
                        value.data = this.dataFiltered.nomor_hp;
                    }
                });
            }
        });
    }
}
</script>  