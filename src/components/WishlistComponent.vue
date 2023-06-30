<template>
    <div>
        <p class="text-2xl font-semibold">{{ title }}</p>
        <div v-for="(item, index) in content" :key="index">
            {{ item.nama }}
        </div>
    </div>
</template>

<script>
export default {
    name: "WishlistComponent",
    data() {
        return {
            title: 'Wishlist',
            content: [
                { nama: 'Jajanan Pasar', data: '', inputType: 'text' }
            ],
        }
    }
}
</script>