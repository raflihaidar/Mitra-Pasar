<template>
    <div>
        <ul v-for="(item, index) in catalog" :key="index">
            <li>{{ item.nama }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useJajananStore } from '../store/modules/products';
const store = useJajananStore()
const catalog = computed(() => store.catalog)
</script>