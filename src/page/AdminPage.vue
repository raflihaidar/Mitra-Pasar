<template>
    <main class="relative w-full font-openSans">
        <div class="flex items-center gap-x-4 bg-lime-700 py-5 text-white font-bold pl-16 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-8 h-8" @click="sideBar = !sideBar">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <LogoIcon />
        </div>

        <div class="absolute z-10 w-[250px] h-screen bg-lime-700 text-center text-white font-semibold"
            :class="sideBar ? '-translate-x-[250px] transition-all' : 'transition-all'">
            <div class="w-4/5 py-3 mx-auto rounded-r-full cursor-pointer" @click="handleClick(item)"
                :class="item.status ? 'bg-lime-600' : ''" v-for="(item, index) in sideBarData" :key="index">
                {{ item.name }}
            </div>
        </div>

        <section class="w-[80%] transition-all mx-auto" :class="sideBar ? 'translate-x-0' : 'translate-x-32'">

            <div class="w-[90%] mx-auto my-10 flex gap-x-5 text-white">
                <div class="w-1/5 flex flex-col px-3 py-6 rounded-lg shadow-xl bg-lime-700">
                    <p class="font-semibold">All Products</p>
                    <p>{{ catalog.length }}</p>
                </div>
                <div class="w-1/5 flex flex-col  bg-lime-700 px-3 py-6 rounded-lg">
                    <p>All Users</p>
                    <p>{{ dataUser.data.length }}</p>
                </div>
            </div>

            <div class="w-[90%] mx-auto bg-gray-100 p-7" id="content">
                <router-view></router-view>
            </div>
        </section>

    </main>
</template>

<script setup>
import { useProductStore } from '../store/products';
import { useUserStore } from '../store/users';
import { storeToRefs } from 'pinia';
import LogoIcon from '../assets/icon/LogoIcon.vue';
import { reactive, ref, watch } from 'vue';
import router from '../router';

const productStore = useProductStore()
const userStore = useUserStore()
const { dataUser } = storeToRefs(userStore)
const { catalog } = storeToRefs(productStore)
const sideBar = ref(true);

const sideBarData = reactive([
    {
        name: "Products",
        path: "dashboard",
        status: true
    },
    {
        name: "Users",
        path: "user",
        status: false
    }
])

router.push({ name: "dashboard" })

const handleClick = (item) => {
    router.push({ name: item.path })
    sideBarData.forEach((data) => {
        data.status = data === item
    })
}

watch(catalog, () => {
    productStore.setCatalog("products")
    productStore.setCategory()
})
</script>

<style>
#content {
    box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
    -webkit-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
    -moz-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
}
</style>