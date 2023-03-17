<template>
    <NavbarComponent />
    <div class="w-[80%] mx-auto">
        <div class="w-full">
            <p>Category</p>
            <div class="grid grid-cols-4 gap-y-2">
                <div v-for="(item, index) in catalog" :key="index">
                    <div class="bg-lime-700 w-3/5 text-center text-white">
                        <div class="max-w-full h-auto">
                            <img :src="item.gambar" :alt="item.name" class="w-full">
                        </div>
                        <div>
                            <p>{{ item.nama }}</p>
                            <p>Rp.{{ item.harga }}</p>
                        </div>
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
}
</script>