<template>
    <div class="h-screen bg-[url('../assets/img/img1.jpg')] bg-cover bg-center font-display">
        <nav class="w-[90%] mx-auto flex justify-between items-center">
            <LogoIcon />
            <section class="w-2/5 text-md flex justify-end gap-x-10 text-white font-bold">
                <router-link to='/sign' class="transition-all" v-show="!isAuthenticated">
                    Daftar
                </router-link>
                <div v-if="!isAuthenticated">
                    <router-link to="/login_user" class="relative transition-all pointer">Login</router-link>
                </div>
                <div v-else>
                    <p class="relative transition-all" @click="handleLogout">Log out</p>
                </div>
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
import { mapGetters } from 'vuex'
import LogoIcon from '../assets/icon/LogoIcon.vue'
import swal from 'sweetalert'
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
        },
        handleLogout() {
            swal("Apakah Anda Ingin Logout", {
                icon: 'warning',
                buttons: {
                    cancel: 'Batal',
                    confirm: 'Logout'
                }
            }).then((confirm) => {
                if (confirm) this.$store.dispatch('handleLogin')
            })
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated'])
    }
}
</script>