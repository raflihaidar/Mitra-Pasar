<template>
    <div>
        <p class="text-2xl font-semibold">{{ title }}</p>
    </div>
    <div class="flex justify-between gap-x-7 mt-10">
        <div class="shadow-md w-1/5 flex flex-col justify-center items-center gap-y-2 border-b-8 border-lime-600">
            <div class="bg-gray-200 w-32 h-32 rounded-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                    alt="image profile" class="w-full h-full">
            </div>
            <!-- <p>{{ dataFiltered.username }}</p> -->
        </div>

        <div class="bg-white mx-auto p-3 shadow-md w-3/5 border-b-8 border-lime-600">
            <p class="text-lg font-semibold">Detail</p>
            <div v-for="(item, index) in content" :key="index" class="flex gap-x-3 items-center">
                <div class="items-center gap-x-5 mt-5 w-full" v-if="item.nama === 'Nama' || item.nama === 'Alamat'">
                    <label :for="index" class="text-right text-md text-gray-500 w-full">
                        {{ item.nama }}
                    </label>
                    <div class="w-full h-auto border-b-2 border-black bg-white text-lg py-2">
                        {{ item.data }}
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white mx-auto p-3 shadow-md w-2/5 border-b-8 border-lime-600">
            <p class="text-lg font-semibold">Kontak</p>
            <div v-for="(item, index) in content" :key="index" class="flex gap-x-3 items-center">
                <div class="items-center gap-x-2 mt-5 w-full" v-if="item.nama === 'Email' || item.nama === 'Nomor HP'">
                    <label :for="index" class="text-right text-md text-gray-500 w-full">
                        {{ item.nama }}
                    </label>
                    <div class="w-full h-auto border-b-2 border-black bg-white text-lg py-2">
                        {{ item.data }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            title: "Profil Saya",
            content: [
                { nama: 'Nama', data: '', inputType: 'text' },
                { nama: 'Alamat', data: '', inputType: 'text' },
                { nama: 'Email', data: '', inputType: 'email' },
                { nama: 'Nomor HP', data: '', inputType: 'text' }
            ]
        }
    },
    computed: {
        ...mapGetters(['dataFiltered'])
    },
    created() {
        this.content.forEach((value) => {
            switch (value.nama) {
                case 'Nama':
                    value.data = this.dataFiltered.name;
                    break;
                case 'Alamat':
                    value.data = this.dataFiltered.address;
                    break;
                case 'Email':
                    value.data = this.dataFiltered.email;
                    break;
                case 'Nomor HP':
                    value.data = this.dataFiltered.nomor_hp;
                    break;
            }
        })
    }
}
</script>