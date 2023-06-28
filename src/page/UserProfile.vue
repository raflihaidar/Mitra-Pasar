<template>
    <div>
        <NavbarComponent />
        <main class="flex">
            <div class="bg-slate-100 text-center px-5 py-3 leading-10 h-screen w-1/5">
                <ul class="cursor-pointer" v-for="(item, index) in category" :key="index">
                    <li @click="selectCategory(item)">{{ item.nama }}</li>
                </ul>
            </div>
            <div class="px-8 py-3 w-4/5">
                <div>
                    <p class="text-2xl font-semibold">{{ title }}</p>
                </div>
                <!-- <div class="flex justify-between gap-x-1 mt-10">
                    <div class="shadow-lg w-1/5 flex flex-col justify-center items-center gap-y-2">
                        <div class="bg-gray-200 w-32 h-32 rounded-full">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                                alt="image profile" class="w-full h-full">
                        </div>
                        <p>{{ dataFiltered.username }}</p>
                    </div>

                    <div class="bg-white mx-auto p-3 shadow-lg w-3/5">
                        <p class="text-lg font-semibold">Detail</p>
                        <div v-for="(item, index) in category" :key="index" v-show="item.isActive">
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
                    <div class="shadow-lg w-2/5">
                        <p>Kontak</p>
                    </div>
                </div> -->
                <div v-if="title === 'Profil Saya'">
                    <ProfileComponent/>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'UserProfile',
    components: {
        NavbarComponent,
        ProfileComponent
    },
    computed: {
        ...mapGetters(['dataUser', 'dataFiltered'])
    },
    data() {
        return {
            title: '',
            category: [
                {
                    nama: 'Profil Saya',
                    isActive: true
                },
                {
                    nama: 'Wishlist',
                    // content: [
                    //     { nama: 'Jajanan Pasar', data: '', inputType: 'text' }
                    // ],
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
            if (item.nama === 'Profil Saya') {
                // item.content.forEach((value) => {
                //     switch (value.nama) {
                //         case 'Nama':
                //             value.data = this.dataFiltered.name;
                //             break;
                //         case 'Alamat':
                //             value.data = this.dataFiltered.address;
                //             break;
                //         case 'Email':
                //             value.data = this.dataFiltered.email;
                //             break
                //         case 'Nomor HP':
                //             value.data = this.dataFiltered.nomor_hp;
                //             break;
                //     }
                // });
                this.title = item.nama
            }
        });
    }
}
</script>