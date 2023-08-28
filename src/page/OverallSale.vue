<template>
    <div>
        <ul v-for="(item, index) in catalog" :key="index">
            <li>{{ item.nama }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useJajananStore } from '../store/modules/jajanan_pasar';
const store = useJajananStore()
const catalog = computed(() => store.catalog)
</script>