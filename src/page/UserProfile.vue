<template>
    <div>
        <NavbarComponent />
        <main class="flex pt-20">
            <div class="bg-slate-100 text-center px-5 py-3 leading-10 h-screen w-1/5">
                <ul class="cursor-pointer" v-for="(item, index) in category" :key="index">
                    <li @click="selectCategory(item)">{{ item.nama }}</li>
                </ul>
            </div>
            <div class="px-8 py-3 w-4/5">
                <div v-for="(item, index) in category" :key="index">
                    <div v-if="item.isActive">
                        <component :is="item.component"></component>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue';
import WishlistComponent from '../components/WishlistComponent.vue';
import { ref } from 'vue';
const category = ref([
    {
        nama: 'Profil Saya',
        isActive: true,
        component: ProfileComponent
    },
    {
        nama: 'Wishlist',
        isActive: false,
        component: WishlistComponent
    }
])

const selectCategory = (item) => {
    category.value.forEach((data) => {
        data.isActive = data === item;
    })
}
</script>