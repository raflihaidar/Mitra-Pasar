<template>
    <div class="absolute z-20 w-[50%] left-10 top-2">
        <LogoIcon />
    </div>
    <div class="flex">
        <div class=" w-[50%] bg-white mt-20 flex flex-col gap-5">
            <div class="text-center text-8xl font-bold text-black mb-10">
                <p>Buat Akun</p>
            </div>

            <div class="flex flex-col gap-y-5">
                <div class="w-3/5 mx-auto border-2 rounded-md py-3 px-3" :class="failed ? 'border-red-500' : 'border-2'">
                    <input type="text" class="bg-white w-full outline-none" name="username" v-model="data.username"
                        placeholder="Masukkan Username" autocomplete="off">
                </div>
                <div class="w-3/5 mx-auto border-2 rounded-md py-3 px-3 flex"
                    :class="failed ? 'border-red-500' : 'border-2'">
                    <input :type="show ? 'text' : 'password'" class="bg-white w-full outline-none" name="password"
                        v-model="data.password" placeholder="Masukkan Password">
                    <span class="cursor-pointer">
                        <component :is="EyeIcon" :show="show" @click="show = !show" />
                    </span>
                </div>
            </div>

            <div @click="handleSignUp"
                class="bg-lime-700 w-3/5 py-3 rounded-full mx-auto text-white text-center text-md font-semibold cursor-pointer">
                Daftar
            </div>

            <div class="text-center font-semibold text-black mt-5">
                <span>Sudah Punya Akun ? </span><router-link to="/login_user" class="text-lime-700">Masuk</router-link>
            </div>

            <div class="flex items-center justify-center w-3/5 mx-auto">
                <span class="border border-gray-400 w-1/4 mx-4"></span>
                <span>or</span>
                <span class="border border-gray-400 w-1/4 mx-4"></span>
            </div>

            <div class="w-3/5 border-2 mx-auto flex justify-center items-center gap-x-2 py-3 px-3 text-center rounded-md">
                <img src="../assets/icon/google 24.png" alt="icon" class="w-[16px] h-[16px]">
                <p>Log in with Google</p>
            </div>
        </div>
        <div
            class="w-[50%] h-screen bg-[url('../assets/img/img-5.jpg')] bg-cover bg-center flex flex-col justify-center items-center">
        </div>
    </div>
</template>

<script setup>
import LogoIcon from '../assets/icon/LogoIcon.vue';
import { useUserStore } from '../store/modules/users';
import EyeIcon from "../assets/icon/EyeIcon.vue"
import { ref } from 'vue';

const userStore = useUserStore()
const show = ref(false)
const data = {
    username: '',
    password: '',
    failed: false
}

const handleSignUp = async () => {
    await userStore.handleSignUp(data)
}
</script>