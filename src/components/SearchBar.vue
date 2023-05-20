<template>
    <div class="w-[60%] mx-auto mt-10 flex items-center px-3 py-5 rounded-lg relative border-2">
        <input type="text" class="w-full border-none outline-none " placeholder="Mau Cari Apa ?" v-model="wordEntered">
        <div v-if="wordEntered !== ''" @click="handleDelete">
            <CloseIcon />
        </div>
        <div v-else>
            <SearchIcon />
        </div>
    </div>
    <div v-if="filteredData.length !== 0"
        class="w-3/5 mx-auto text-center rounded-lg bg-white shadow-xl absolute overflow-hidden overflow-y-auto z-[999] top-[28%] left-[50%] -translate-y-1/2 -translate-x-1/2">
        <div v-for="(item, index) in filteredData" :key="index">
            <ul class="py-2">
                <router-link :to="'/product/detail/' + item.id">
                    <li>{{ item.product_name }}</li>
                </router-link>
            </ul>
        </div>
    </div>
    <div v-else-if="filteredData.length === 0 && wordEntered !== ''"
        class="w-3/5 mx-auto text-center py-2 rounded-lg bg-white shadow-xl absolute z-[999] overflow-hidden top-[25%] left-[50%] -translate-y-1/2 -translate-x-1/2">
        <p>
            Tidak dapat menemukan "{{ wordEntered }}"
        </p>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CloseIcon from '../assets/icon/CloseIcon.vue'
import SearchIcon from '../assets/icon/SearchIcon.vue'
export default {
    name: 'SearchBar',
    data() {
        return {
            filteredData: [],
            wordEntered: "",
        }
    },
    components: {
        SearchIcon,
        CloseIcon
    },
    watch: {
        wordEntered(newVal) {
            this.handleFilter(newVal);
        }
    },
    methods: {
        handleFilter(wordEntered) {
            const dataFilter = this.catalog.filter((item) => {
                return item.product_name.toLowerCase().includes(wordEntered.toLowerCase())
            })

            if (wordEntered === "") {
                this.filteredData = []
            } else {
                this.filteredData = dataFilter
            }
        },
        handleDelete() {
            this.wordEntered = ''
        }
    },
    computed: {
        ...mapGetters(['catalog'])
    },
}
</script>