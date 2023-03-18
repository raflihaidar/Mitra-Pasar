<template>
    <section class="w-2/5 text-white flex justify-start items-center gap-x-2" @click="goBack">
        <div class="bg-lime-700 flex justify-center items-center w-[50px] h-[50px] text-lg rounded-md font-semibold">
            <span class="">M</span><span>P</span>
        </div>
        <div class="text-xl font-bold">Mitra Pasar</div>
    </section>
</template>

<script>
export default {
    name: 'LogoIcon',
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>