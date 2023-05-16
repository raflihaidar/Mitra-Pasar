<template>
    <div class="w-[60%] mx-auto my-10 flex shadow-lg items-center px-3 py-5 rounded-lg">
        <input type="search" class="w-full border-none outline-none " placeholder="Mau Cari Apa ?" @change="handleFilter"
            v-model="searchWord">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clip-rule="evenodd" />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            filteredData: [],
            wordEntered: "",
        }
    },
    methods: {
        handleFilter() {
            console.log(this.wordEntered)
        }
    }
}
</script>