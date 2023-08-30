<template>
    <div class="absolute z-20 w-[50%] left-10 top-2">
        <LogoIcon />
    </div>
    <div class="flex justify-between items-center">
        <div class="bg-white w-[50%] mt-20 flex flex-col gap-5">
            <div class="text-center leading-3 mb-10">
                <p class="text-8xl text-black font-bold">Halo Rek!</p>
                <p class="text-gray-400 text-sm mt-5">Selamat Datang di Mitra Pasar</p>
            </div>
            <div class="w-3/5 border-2 mx-auto flex justify-center items-center gap-x-2 py-3 px-3 text-center rounded-md">
                <img src="../assets/icon/google 24.png" alt="icon" class="w-[16px] h-[16px]">
                <p>Log in with Google</p>
            </div>
            <div class="flex items-center justify-center w-3/5 mx-auto">
                <span class="border border-gray-400 w-1/4 mx-4"></span>
                <span>or</span>
                <span class="border border-gray-400 w-1/4 mx-4"></span>
            </div>
            <div class="flex flex-col gap-y-5">
                <div class="w-3/5 mx-auto border-2 rounded-md py-3 px-3" :class="failed ? 'border-red-500' : 'border-2'">
                    <div class="flex items-center justify-evenly  bg-white">
                        <input type="text" class="bg-white w-full outline-none" name="username" placeholder="Your email"
                            v-model="username">
                    </div>
                </div>
                <div class="w-3/5 mx-auto border-2 rounded-md py-3 px-3" :class="failed ? 'border-red-500' : 'border-2'">
                    <div class="flex items-center justify-evenly bg-white">
                        <input type="password" class="bg-white w-full outline-none" name="password"
                            placeholder="Your password" v-model="password">
                    </div>
                </div>
            </div>
            <div class="w-3/5 mx-auto text-right text-lime-700 font-semibold">
                <p>Lupa Password ?</p>
            </div>
            <div class="bg-lime-700 w-3/5 py-3 rounded-full mx-auto text-white text-center text-md font-semibold cursor-pointer"
                @click="handleLogin">
                Log in
            </div>

            <div class="text-center text-black font-semibold">
                <span>Belum Punya Akun ?</span><router-link to="/sign" class="text-lime-700"> Daftar</router-link>
            </div>
        </div>
        <div
            class="w-[50%] h-screen bg-[url('../assets/img/img-4.jpg')] bg-cover bg-center flex flex-col justify-end items-end">
        </div>
    </div>
</template>

<script setup>
import swal from 'sweetalert'
import { onMounted, ref } from "vue"
import LogoIcon from '../assets/icon/LogoIcon.vue'
import { useUserStore } from '../store/modules/users';
import router from '../router';

const username = ref("")
const password = ref("")
const failed = ref(false)
const store = useUserStore()

const handleLogin = () => {
    const adminAuth = username.value == 'admin' && password.value == 'adminlogin'
    store.dataUser.data.forEach(item => {
        const userAuth = item.username === username.value && item.password === password.value
        console.log(item)
        console.log(userAuth)
        if (userAuth) {
            store.handleLogin(username.value)
        } else if (adminAuth) {
            swal('Berhasil Login', {
                icon: 'success'
            }).then(() => {
                router.push({ name: 'admin dashboard' })
            })
        }
        else {
            swal('Gagal Login', {
                icon: 'warning'
            })
            failed.value = false
        }
    })
}

onMounted(async () => {
    await store.setDataUser()
})
</script>