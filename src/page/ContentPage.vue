<template>
    <NavbarComponent />
    <div class="w-[80%] mx-auto">
        <div class="w-full">
            <p>Category</p>
            <div class="grid grid-cols-4 gap-y-2">
                <div v-for="(item, index) in catalog" :key="index">
                    <div class="bg-lime-700 w-3/5 text-center text-white">
                        <p>{{ item.nama }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'ContentPage',
    components: {
        NavbarComponent
    },
    computed: {
        ...mapGetters(['catalog'])
    },
    mounted() {
        this.$store.dispatch('setCatalog')
    }
}
</script>