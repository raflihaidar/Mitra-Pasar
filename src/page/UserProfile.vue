<template>
    <NavbarComponent />
    <div class="bg-slate-200 w-[60%] mx-auto p-3">
        <p class="font-semibold text-xl border-b-2 border-black pb-2">Profil Saya</p>
        <form class="grid gap-y-3 mt-5">

            <div class="flex gap-x-3">
                <label for="name" class="text-right w-1/5">
                    Username
                </label>
                <input type="text" :value="dataFiltered.username" id="name"
                    class="w-3/5 border-none outline-none bg-inherit">
            </div>

            <div class="flex gap-x-3">
                <label for="alamat" class="text-right w-1/5">
                    Alamat
                </label>
                <textarea :value="dataFiltered.address" class="w-2/5"></textarea>
            </div>
        </form>
    </div>
</template>
  
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'UserProfile',
    components: {
        NavbarComponent
    },
    computed: {
        ...mapGetters(['dataUser', 'dataFiltered'])
    },
}
</script>