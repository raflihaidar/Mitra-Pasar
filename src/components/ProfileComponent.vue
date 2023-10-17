<template>
    <div class="flex items-center gap-x-1">
        <p class="text-2xl font-semibold">Profil Saya</p>
        <span v-if="editStatus" @click="editStatus = !editStatus" class="cursor-pointer">
            <EditIcon />
        </span>
        <span v-else @click="handleSave" class="cursor-pointer">
            <SaveIcon />
        </span>
    </div>
    <div class="flex justify-between gap-x-7 mt-10">
        <div class="shadow-md w-1/5 flex flex-col justify-center items-center gap-y-2 border-b-8 border-lime-600">
            <div class="bg-gray-200 w-32 h-32 rounded-full">
                <div v-if="payload.image === null">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png?20220226140232"
                        alt="image profile" class="w-full h-full">
                </div>
                <div v-else class="w-32 h-32">
                    <img :src="`data:image/jpg;base64,${payload.image}`" alt="gambar" class="w-full h-full rounded-full">
                </div>
            </div>
            <div v-if="!editStatus">
                <input type="file" name="image" lass="w-full text-sm" @change="uploadImage($event)">
            </div>

            <input type="text" v-model="payload.username" class="w-full text-center bg-inherit outline-none p-2"
                :disabled="editStatus" />
        </div>

        <div class="bg-white mx-auto p-3 shadow-md w-3/5 border-b-8 border-lime-600">
            <p class="text-lg font-semibold">Detail</p>
            <div class="flex flex-col gap-x-3 items-center">
                <div class="items-center gap-x-5 mt-5 w-full">
                    <label class="text-right text-md text-gray-500 w-full">
                        Nama
                    </label>
                    <div class="w-full flex justify-between h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" v-model="payload.name" class="w-[90%] bg-inherit outline-none p-2"
                            :disabled="editStatus" />
                    </div>
                </div>
                <div class="items-center gap-x-5 mt-5 w-full">
                    <label class="text-right text-md text-gray-500 w-full">
                        Alamat
                    </label>
                    <div class="w-full flex justify-between h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" v-model="payload.address" class="w-[90%] bg-inherit outline-none p-2"
                            :disabled="editStatus" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white mx-auto p-3 shadow-md w-2/5 border-b-8 border-lime-600">
            <p class="text-lg font-semibold">Kontak</p>
            <div class="flex flex-col gap-x-3 items-center">
                <div class="items-center gap-x-2 mt-5 w-full">
                    <label class="text-right text-md text-gray-500 w-full">
                        Email
                    </label>
                    <div class="w-full h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" class="w-[90%] bg-inherit outline-none p-2" :disabled="editStatus"
                            v-model="payload.email" />
                    </div>
                </div>
                <div class="items-center gap-x-2 mt-5 w-full">
                    <label class="text-right text-md text-gray-500 w-full">
                        Nomor HP
                    </label>
                    <div class="w-full h-auto border-b-2 border-black bg-white text-sm py-2">
                        <input type="text" v-model="payload.telephone" class="w-[90%] bg-inherit outline-none p-2"
                            :disabled="editStatus" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../store/users';
import EditIcon from '../assets/icon/EditIcon.vue';
import SaveIcon from "../assets/icon/SaveIcon.vue"
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { dataFiltered } = storeToRefs(userStore)
const editStatus = ref(true)

const payload = ref({})

const uploadImage = (e) => {
    payload.value.image = e.target.files[0]
    console.log(e.target.files[0])
}

const handleSave = async () => {
    await userStore.editProfileUser(payload.value, payload.value.id)
    editStatus.value = true
}

watchEffect(() => {
    payload.value = { ...dataFiltered.value }
})

</script>