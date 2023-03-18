<template>
    <NavbarComponent />
    <table class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] text-left">
        <thead>
            <tr>
                <th></th>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Kuantitas</th>
                <th>Harga</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cart" :key="index">
                <td class="">
                    <input type="checkbox" v-model="selectedValues" :value="item.priceUser" @change="viewTotal"
                        @click="setStatus(index)">
                </td>
                <td>
                    <div style="width: 200px;">
                        <img :src="item.gambar" alt="gambar produk" style="width: inherit;">
                    </div>
                </td>
                <td>{{ item.nama }}</td>
                <td>{{ item.kuantitas }}</td>
                <td>{{ item.harga }}</td>
                <td class="">
                    <button class="btn btn-danger" @click="removeItem(index)">Delete</button>
                    <button class="btn btn-danger" @click="clearAll(index)">Delete All</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'CartComponent',
    components: {
        NavbarComponent
    },
    computed: {
        ...mapGetters(['cart'])
    }
}
</script>