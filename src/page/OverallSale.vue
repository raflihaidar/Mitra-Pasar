<template>
    <div>
        <ul v-for="(item, index) in catalog" :key="index">
            <li>{{ item.nama }}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'OverallSale',
    computed: {
        ...mapGetters(['catalog'])
    }
}
</script>