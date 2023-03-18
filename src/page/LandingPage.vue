<template>
    <div class="h-screen bg-hero bg-cover bg-center font-openSans">
        <nav class="w-[90%] mx-auto flex justify-between items-center">
            <LogoIcon />
            <section class="w-2/5 text-md flex justify-end gap-x-10 text-white font-bold">
                <router-link to='/sign' class="hover:-mt-2 transition-all">
                    Daftar
                </router-link>
                <p @click="switchActive" class="relative hover:-mt-2 transition-all">Login</p>
                <ul class="absolute text-center grid bg-white text-lime-700 font-medium w-[110px] right-10 top-10 rounded-lg"
                    :class="isActive ? 'block' : 'hidden'">
                    <router-link to="/login_user">
                        <li class=" hover:bg-lime-700 py-3 hover:text-white">
                            User
                        </li>
                    </router-link>
                    <router-link to="/login_admin">
                        <li class="hover:bg-lime-700 py-3 hover:text-white">
                            Admin
                        </li>
                    </router-link>
                </ul>
            </section>
        </nav>
        <div class="mt-56 text-center tracking-widest">
            <p class="text-4xl font-semibold text-white animate-slideIn mb-10">Bersama Mitra Pasar, Menjual Apapun Menjadi
                Lebih
                Mudah</p>
            <router-link to="/content"
                class="py-3 px-4 rounded-full bg-white hover:bg-lime-700 hover:text-white font-semibold text-center text-black text-lg transition animate-fadein">Coba
                Sekarang</router-link>
        </div>
    </div>
</template>

<script>
import LogoIcon from '../assets/icon/LogoIcon.vue'
export default {
    name: 'LandingPage',
    components: {
        LogoIcon
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        switchActive() {
            this.isActive = !this.isActive
        }
    }
}
</script>