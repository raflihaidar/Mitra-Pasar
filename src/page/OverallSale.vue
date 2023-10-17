<template>
    <div>
        <ul v-for="(item, index) in catalog" :key="index">
            <li>{{ item.nama }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProductStore } from '../store/products';
const productStore = useProductStore()
const catalog = computed(() => productStore.catalog)
</script>