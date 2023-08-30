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
            <p>{{ dataFiltered.username }}</p>
        </div>

        <div class="bg-white mx-auto p-3 shadow-md w-3/5 border-b-8 border-lime-600">
            <p class="text-lg font-semibold">Detail</p>
            <div v-for="(item, index) in content" :key="index" class="flex gap-x-3 items-center">
                <div class="items-center gap-x-5 mt-5 w-full" v-if="item.nama === 'Nama' || item.nama === 'Alamat'">
                    <label :for="index" class="text-right text-md text-gray-500 w-full">
                        {{ item.nama }}
                    </label>
                    <div class="w-full flex justify-between h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" :value="item.data" :disabled="item.edit"
                            class="w-[90%] bg-inherit outline-none p-2" />
                        <button v-if="item.edit">
                            <EditIcon @click="handleModify(item)" />
                        </button>
                        <button v-else>
                            <SaveIcon @click="handleModify(item)" />
                        </button>
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
                    <div class="w-full h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" :value="item.data" :disabled="item.edit"
                            class="w-[90%] bg-inherit outline-none p-2" />
                        <button v-if="item.edit">
                            <EditIcon @click="handleModify(item)" />
                        </button>
                        <button v-else>
                            <SaveIcon @click="handleModify(item)" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../store/modules/users';
import EditIcon from '../assets/icon/EditIcon.vue';
import SaveIcon from "../assets/icon/SaveIcon.vue"
import { onMounted, reactive, ref } from 'vue';
const title = "Profil Saya"
const store = useUserStore()

const payload = reactive({
    username: '',
    email: '',
    address: '',
    nomor_hp: '',
})

const content = ref([
    { nama: 'Nama', data: '', edit: true },
    { nama: 'Alamat', data: '', edit: true },
    { nama: 'Email', data: '', edit: true },
    { nama: 'Nomor HP', data: '', edit: true }
])

const dataFiltered = store.dataFiltered

const handleModify = (item) => {
    item.edit = !item.edit
    console.log(item.edit)
}
const handleSave = async () => {
    store.editProfileUser()
}
onMounted(() => {
    content.value.forEach((value) => {
        switch (value.nama) {
            case 'Nama':
                value.data = dataFiltered.name;
                payload.username = dataFiltered.username;
                break;
            case 'Alamat':
                value.data = dataFiltered.address;
                payload.address = dataFiltered.address
                break;
            case 'Email':
                value.data = dataFiltered.email;
                payload.email = dataFiltered.email
                break;
            case 'Nomor HP':
                value.data = dataFiltered.nomor_hp;
                payload.nomor_hp = dataFiltered.nomor_hp
                break;
        }
    })
})
</script>