<template>
    <NavbarComponent />
    <main class="bg-gray-100 w-full h-full">
        <SearchBar />
        <router-view></router-view>
    </main>
    <FooterPage />
</template>

<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterPage from '../components/FooterPage.vue';
import SearchBar from '../components/SearchBar.vue';
</script>