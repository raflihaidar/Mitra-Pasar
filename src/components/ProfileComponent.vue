<template>
    <div class="flex justify-between gap-x-1 mt-10">
        <div class="shadow-lg w-1/5 flex flex-col justify-center items-center gap-y-2">
            <div class="bg-gray-200 w-32 h-32 rounded-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                    alt="image profile" class="w-full h-full">
            </div>
            <!-- <p>{{ dataFiltered.username }}</p> -->
        </div>

        <div class="bg-white mx-auto p-3 shadow-lg w-3/5">
            <p class="text-lg font-semibold">Detail</p>
            <div v-for="(item, index) in data.content" :key="index" class="flex gap-x-3 items-center">
                <div class="grid gap-y-3 mt-5">
                    <label :for="index" class="text-right w-1/5">{{ item.nama }}</label>
                    <div class="w-[300px] h-auto bg-white px-3 py-2">
                        {{ item.data }}
                    </div>
                </div>
            </div>
        </div>
        <div class="shadow-lg w-2/5">
            <p>Kontak</p>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, onMounted } from 'vue';
import { mapGetters } from 'vuex';

const props = defineProps({
    isActive: Boolean
});

mapGetters(['dataFiltered']);

const data = {
    nama: 'Profil Saya',
    content: [
        { nama: 'Nama', data: '', inputType: 'text' },
        { nama: 'Alamat', data: '', inputType: 'text' },
        { nama: 'Email', data: '', inputType: 'email' },
        { nama: 'Nomor HP', data: '', inputType: 'text' }
    ]
};

onMounted(() => {
    data.content.forEach((value) => {
        switch (value.nama) {
            case 'Nama':
                value.data = dataFiltered.name;
                break;
            case 'Alamat':
                value.data = dataFiltered.address;
                break;
            case 'Email':
                value.data = dataFiltered.email;
                break;
            case 'Nomor HP':
                value.data = dataFiltered.nomor_hp;
                break;
        }
    });
});
</script>
  