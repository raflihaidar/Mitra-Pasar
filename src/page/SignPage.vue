<template>
    <div class="h-screen  font-openSans">
        <NavbarComponent />
        <div
            class="absolute left-[50%] top-[55%] -translate-x-1/2 -translate-y-1/2 md:w-[40%] w-full  h-[96] py-10 bg-lime-600 rounded-lg">
            <div class="text-center text-2xl font-semibold leading-3 mb-10 text-white">
                <!-- <lord-icon src="https://cdn.lordicon.com/gqqykmqo.json" trigger="hover"
                    colors="outline:#121331,primary:#545454,secondary:#ad6836,tertiary:#4faef9,quaternary:#f3c3ba"
                    style="width:150px;height:150px">
                </lord-icon> -->
                <p>Buat Akun Baru</p>
            </div>
            <div class="flex flex-col gap-y-5">
                <div class="w-4/5 mx-auto">
                    <label name="nama lengkap" class="text-white">Nama Lengkap</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <UserIcon />
                        <span>|</span>
                        <input type="text" class="bg-white w-full outline-none" name="username" v-model="data.username"
                            placeholder="Masukkan Nama Lengkap Anda">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="nama lengkap" class="text-white">Alamat</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <UserIcon />
                        <span>|</span>
                        <input type="text" class="bg-white w-full outline-none" name="Alamat" v-model="data.address"
                            placeholder="Masukkan Alamat Anda">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="password" class="text-white">Password</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <LockIcon />
                        <span>|</span>
                        <input type="password" class="bg-white w-full outline-none" name="password" v-model="data.password"
                            placeholder="Masukkan Password">
                    </div>
                </div>
            </div>


            <div @click="handleSignUp"
                class="bg-lime-700 w-56 py-4 mt-16 rounded-full mx-auto text-white text-center text-lg font-semibold cursor-pointer">
                Daftar
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
                username: '',
                address: '',
                password: '',
            }
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