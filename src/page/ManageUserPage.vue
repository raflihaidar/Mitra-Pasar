<template>
  <div>

    <p class="text-3xl text-center font-semibold text-black">Overall Sale</p>
    <router-link to="/admin/new_data">
      <button class="bg-lime-500 px-2 py-2 text-sm rounded-md text-white font-semibold my-2">Tambah Data</button>
    </router-link>

    <table class="border-2 border-lime-700  w-full mb-10">
      <thead class="border-2 border-lime-700 bg-lime-500 w-full text-left">
        <tr class="text-white">
          <th class="px-5 py-3">No</th>
          <th class="px-5 py-3">Nama</th>
          <th class="px-5 py-3">Deskripsi</th>
          <th class="px-5 py-3">Harga</th>
          <th class="px-5 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in catalog.data" :key="index" class="border-2 border-lime-700 relative mx-auto">
        <tr
          class="text-sm font-semibold bg-lime-200 bg-opacity-25 w-screen text-left hover:bg-lime-100 transition-colors">
          <td class="px-5 py-3 whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-5 py-3 whitespace-nowrap">{{ item.product_name }}</td>
          <td class="px-5 py-3 whitespace-nowrap">{{ item.description }}</td>
          <td class="px-5 py-3 whitespace-nowrap">Rp.{{ item.price }}</td>
          <td>
            <div class="flex items-center justify-start gap-x-3">
              <span class="cursor-pointer" @click="activyActive(item)">
                <EditIconVue />
              </span>
              <button class="cursor-pointer" @click="deleteData(item)">
                <DeleteIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      <div class="fixed top-0 left-0 z-10 bg-black-rgba w-full h-full flex justify-center items-center"
        :class="modalModify ? 'block' : 'hidden'">
        <div
          class="bg-white w-2/5 px-10 py-5 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 opacity-100 font-semibold border-4 border-lime-600 rounded-xl">
          <section class="flex flex-col gap-y-1 mb-5">
            <label>Nama Produk</label>
            <input type="text" class="border-2 border-lime-600 px-2 py-2 rounded-lg outline-none"
              v-model="modalContent.product_name">
          </section>
          <section class="flex flex-col gap-y-1 mb-5">
            <label>Stok</label>
            <input type="text" class="border-2 border-lime-600 px-2 py-2 rounded-lg outline-none"
              v-model="modalContent.stock">
          </section>
          <section class="flex flex-col mb-5">
            <label>Harga</label>
            <input type="text" class="border-2 border-lime-600 px-2 py-2 rounded-lg outline-none"
              v-model="modalContent.price">
          </section>
          <section class="flex flex-col mb-5">
            <label>Url Gambar</label>
            <input type="text" v-model="modalContent.img"
              class="border-2 border-lime-600 px-2 py-2 rounded-lg outline-none">
          </section>
          <section class="flex flex-col mb-5">
            <label>Deskripsi</label>
            <textarea name="" id="" cols="25" rows="8"
              class="border-2 border-lime-600 px-2 py-2 rounded-lg resize-none outline-none"
              v-model="modalContent.description"></textarea>
          </section>
          <section class="flex justify-end gap-x-5">
            <button aria-label="cancel" class="bg-blue-300 rounded-md px-3 py-2" @click="cancelButton">Batal</button>
            <button aria-label="save" class="bg-green-600 rounded-md px-3 py-2"
              @click="saveNewData(modalContent.id)">Simpan</button>
          </section>
        </div>
      </div>
    </table>
  </div>
</template>

<script setup>
import { useJajananStore } from '../store/modules/jajanan_pasar';
import EditIconVue from '../assets/icon/EditIcon.vue'
import DeleteIcon from '../assets/icon/DeleteIcon.vue';
import { reactive, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const modalDelete = ref(false);
const modalModify = ref(false);
const store = useJajananStore()
let modalContent = reactive({
  id: 0,
  product_name: '',
  stock: 0,
  description: '',
  price: 0,
  img: ''
})

const { catalog } = storeToRefs(store)

const deleteData = (item) => {
  store.deleteData(item)
  modalDelete.value = false;
}

const saveNewData = async (id) => {
  await axios.put(`http://localhost:8000/jajanan_pasar/${id}`, modalContent).then(() => {
    modalModify.value = false
    store.setCatalog("jajanan_pasar")
  })
}

const cancelButton = () => {
  modalDelete.value = false
  modalModify.value = false
}

const activyActive = (item) => {
  modalModify.value = true
  Object.assign(modalContent, item)
}

watchEffect(() => {
  store.setCatalog("jajanan_pasar")
})
</script>