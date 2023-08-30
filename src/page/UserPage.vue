<template>
  <div>

    <p class="text-3xl mb-5 text-center font-semibold text-black">Manage Users</p>
    <!-- <router-link to="/admin/new_data">
      <button class="bg-lime-500 px-2 py-2 text-sm rounded-md text-white font-semibold my-2">Tambah Data</button>
    </router-link> -->

    <table class="border-2 border-lime-700  w-full mb-10">
      <thead class="border-2 border-lime-700 bg-lime-500 w-full text-left">
        <tr class="text-white">
          <th class="px-5 py-3">No</th>
          <th class="px-5 py-3">Nama</th>
          <th class="px-5 py-3">Email</th>
          <th class="px-5 py-3">Id</th>
          <th class="px-5 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in dataUser.data" :key="index" class="border-2 border-lime-700 relative mx-auto">
        <tr
          class="text-sm font-semibold bg-lime-200 bg-opacity-25 w-screen text-left hover:bg-lime-100 transition-colors">
          <td class="px-5 py-3 whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-5 py-3 whitespace-nowrap">{{ item.name }}</td>
          <td class="px-5 py-3 whitespace-nowrap">{{ item.email }}</td>
          <td class="px-5 py-3 whitespace-nowrap">{{ item.id }}</td>
          <td>
            <div class="text-left">
              <button class="cursor-pointer pl-5" @click="deleteData(item.id)">
                <DeleteIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/modules/users';
// import EditIconVue from '../assets/icon/EditIcon.vue'
import DeleteIcon from '../assets/icon/DeleteIcon.vue';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

const modalDelete = ref(false);
const store = useUserStore()

const { dataUser } = storeToRefs(store)

const deleteData = (id) => {
  store.deleteDataUser(id)
  modalDelete.value = false;
}

watchEffect(() => {
  store.setDataUser()
})
</script>