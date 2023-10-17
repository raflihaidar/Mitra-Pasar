<template>
  <div>

    <p class="text-3xl mb-5 text-center font-semibold text-black">Manage Users</p>
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
              <button aria-label="delete data" class="cursor-pointer pl-5" @click="deleteData(item.id)">
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
import { useUserStore } from '../store/users';
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