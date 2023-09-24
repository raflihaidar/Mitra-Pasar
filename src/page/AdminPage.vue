<template>
    <div class="relative w-full font-openSans">
        <div class="w-full flex items-center gap-x-4 bg-lime-600 py-5 text-white font-bold pl-16">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-8 h-8" @click="sideBar = !sideBar">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <LogoIcon />
        </div>

        <div class="absolute z-10 w-[250px] h-screen bg-lime-500 text-center text-white font-semibold"
            :class="sideBar ? '-translate-x-[250px]' : ''">
            <div class="py-5 px-2 cursor-pointer" @click="$router.push({ name: 'dashboard' })">
                <p>Dashboard</p>
            </div>
            <div class="py-5 cursor-pointer" @click="$router.push({ name: 'user' })">
                <p>Manage Users</p>
            </div>
            <div class="py-5 cursor-pointer">
                <p>Customer</p>
            </div>
            <div class="py-5 cursor-pointer">
                <p>Transfer</p>
            </div>
            <div class="py-5 cursor-pointer">
                <p>Settings</p>
            </div>
        </div>

        <div class="w-[80%] mx-auto my-10 flex justify-between text-white">
            <div class="w-1/5 flex flex-col px-3 py-6 rounded-lg shadow-xl bg-lime-600">
                <CartIcon />
                <p class="font-semibold">Overall Sale</p>
                <p>{{ catalog.length }}</p>
            </div>
            <div class="w-1/5 flex flex-col  bg-lime-600 px-3 py-6 rounded-lg">
                <lord-icon src="https://cdn.lordicon.com/hbvyhtse.json" trigger="hover" colors="primary:#ffffff">
                </lord-icon>
                <p>Overall User</p>
                <p>{{ dataUser.data.length }}</p>
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

        <div class="w-[80%] mx-auto bg-gray-100 p-7" id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import CartIcon from '../assets/icon/CartIcon.vue'
import { useJajananStore } from '../store/modules/products';
import { useUserStore } from '../store/modules/users';
import { storeToRefs } from 'pinia';
import LogoIcon from '../assets/icon/LogoIcon.vue';
import { ref, watch } from 'vue';
import router from '../router';

const jajananStore = useJajananStore()
const userStore = useUserStore()
const { dataUser } = storeToRefs(userStore)
const { catalog } = storeToRefs(jajananStore)
const sideBar = ref(true);

router.push({ name: "dashboard" })

watch(catalog, () => {
    jajananStore.setCatalog("products")
    jajananStore.setCategory()
})
</script>

<style>
#content {
    box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
    -webkit-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
    -moz-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
}
</style>