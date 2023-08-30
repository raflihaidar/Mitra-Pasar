<template>
  <tr class="text-sm font-semibold bg-lime-200 bg-opacity-25 w-screen text-left hover:bg-lime-100 transition-colors">
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
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from "vue"
import EditIconVue from '../assets/icon/EditIcon.vue'
import DeleteIcon from '../assets/icon/DeleteIcon.vue';

const emit = defineEmits(['deleteData', 'activyActive'])

const props = defineProps({
  item: Object,
  index: Number
})

const { item, index } = toRefs(props)
</script>