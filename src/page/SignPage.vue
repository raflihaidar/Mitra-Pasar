<template>
    <div class="font-openSans">
        <NavbarComponent />
        <div class=" w-3/5 my-10 mx-auto py-10 bg-lime-600 rounded-lg">
            <div class="text-center text-2xl font-semibold leading-3 mb-10 text-white">
                <p>Buat Akun Baru</p>
            </div>
            <div class="flex flex-col gap-y-5">
                <div class="w-4/5 mx-auto">
                    <label name="nama lengkap" class="text-white">Nama Lengkap</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <input type="text" class="bg-white w-full outline-none" name="username" v-model="data.name"
                            placeholder="Masukkan Nama Lengkap Anda">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="nama lengkap" class="text-white">Username</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <input type="text" class="bg-white w-full outline-none" name="username" v-model="data.username"
                            placeholder="Masukkan Nama Lengkap Anda">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="nama lengkap" class="text-white">Nomor HP</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <input type="text" class="bg-white w-full outline-none" name="Alamat" v-model="data.nomor_hp"
                            placeholder="Masukkan Nomor HP Anda">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="password" class="text-white">Password</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <input type="password" class="bg-white w-full outline-none" name="password" v-model="data.password"
                            placeholder="Masukkan Password">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="password" class="text-white">Konfigurasi Password</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <input type="password" class="bg-white w-full outline-none" name="password" v-model="configure"
                            placeholder="Masukkan Kembali Password">
                    </div>
                </div>
            </div>


            <div @click="handleSignUp"
                class="bg-lime-700 w-56 py-4 mt-16 rounded-full mx-auto text-white text-center text-lg font-semibold cursor-pointer">
                Daftar
            </div>

            <div class="text-center text-white mt-5">
                <span>Sudah Punya Akun ?</span><router-link to="/login_user"> Masuk</router-link>
            </div>

        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import axios from 'axios';
export default {
    name: 'SignPage',
    components: {
        NavbarComponent
    },
    data() {
        return {
            data: {
                name: '',
                username: '',
                nomor_hp: '',
                password: '',
            },
            configure: ''
        }
    },
    methods: {
        async handleSignUp() {
            await axios.post('http://localhost:8000/user', this.data).then(() => {
                alert("Berhasil")
            })
        }
    }
}
</script>