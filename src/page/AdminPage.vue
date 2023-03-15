<template>
    <!-- <NavbarComponent /> -->
    <div class="w-full font-openSans">
        <div class="w-full  bg-lime-700 py-5 text-white font-bold">
            <p class="ml-6">Admin Dashboard</p>
        </div>

        <div class="w-[80%] mx-auto my-10 flex justify-between text-white">
            <div class="w-1/5 flex flex-col bg-lime-600 px-3 py-6 rounded-lg">
                <CartIcon />
                <p class="font-semibold">Overall Sale</p>
                <p>{{ catalog.length }}</p>
            </div>
            <div class="w-1/5 flex flex-col  bg-lime-600 px-3 py-6 rounded-lg">
                <lord-icon src="https://cdn.lordicon.com/hbvyhtse.json" trigger="hover" colors="primary:#ffffff">
                </lord-icon>
                <p>Overall Visited</p>
                <p>3,925</p>
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
    </div>
</template>

<script>
// import NavbarComponent from '../components/NavbarComponent.vue';
import CartIcon from '../assets/icon/CartIcon.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'AdminPage',
    components: {
        // NavbarComponent
        CartIcon
    },
    computed: {
        ...mapGetters(['catalog'])
    },
    mounted() {
        this.$store.dispatch('setCatalog')
    }
}
</script>