<template>
    <div class="relative mt-10 pt-20">
        <div class="w-[60%] mx-auto flex border-2 items-center px-3 py-5 rounded-lg" id="search-container"
            :class="active ? 'border-lime-600' : null">
            <input type=" text" class="w-full h-full border-none outline-none bg-inherit" placeholder="Mau Cari Apa ?"
                v-model="wordEntered" @click="handleClick($event)" @keyup.enter="handleSearch(wordEntered)"
                ref="searchInput">
            <div v-if="wordEntered !== ''" @click="handleDelete">
                <CloseIcon />
            </div>
            <div v-else>
                <SearchIcon />
            </div>
        </div>
        <div v-if="filteredData.length !== 0 && wordEntered !== '' && active"
            class="w-[60%] mx-auto  text-center rounded-lg bg-gray-100 shadow-xl absolute overflow-hidden z-[999] left-[50%] -translate-x-1/2">
            <div v-for="( item, index ) in  filteredData " :key="index">
                <ul class="py-2" @click="handleSearch(item.product_name)">
                    <li>{{ item.product_name }}</li>
                </ul>
            </div>
        </div>
        <div v-else-if="filteredData.length === 0 && wordEntered !== '' && active"
            class="w-[60%] mx-auto text-center py-2 rounded-lg bg-gray-100 shadow-xl absolute overflow-hidden z-[999] left-[50%] -translate-x-1/2">
            <p>
                Tidak dapat menemukan "{{ wordEntered }}"
            </p>
        </div>
    </div>
</template>


<script setup>
import CloseIcon from '../assets/icon/CloseIcon.vue'
import SearchIcon from '../assets/icon/SearchIcon.vue'
import { ref, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../store/products';
import { useRouter } from 'vue-router';

const productStore = useProductStore()
const { catalog } = storeToRefs(productStore)
const filteredData = ref([])
const searchInput = ref(null)
const wordEntered = ref('')
const active = ref(false);
const router = useRouter()

const handleClick = (event) => {
    let elementClicked = event.target
    let elementSearching = document.querySelector('#search-container')
    if (!elementSearching.contains(elementClicked)) active.value = false
    else active.value = true
}

const handleFiltered = (wordEntered) => {
    let dataFilter = catalog.value.filter((item) => {
        return item.product_name.toLowerCase().includes(wordEntered.toLowerCase())
    })


    if (wordEntered.value === "") {
        filteredData.value = []
    } else {
        filteredData.value = dataFilter
    }
}

const handleDelete = () => {
    wordEntered.value = ''
}

const handleSearch = async (payload) => {
    router.push({ name: 'search page', query: { keyword: wordEntered.value } })
    await productStore.searchDataProduct(payload)
    active.value = false
    searchInput.value.blur();
}

watchEffect(() => {
    if (active.value) {
        document.addEventListener('click', handleClick);
    } else {
        document.removeEventListener('click', handleClick)
    }
})

watch(wordEntered, (newVal) => {
    handleFiltered(newVal)
})
</script>