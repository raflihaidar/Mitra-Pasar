<template>
    <div class="h-screen  font-openSans">
        <NavbarComponent />
        <div
            class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 md:w-[40%] w-full  h-[96] py-10 bg-lime-600 rounded-lg">
            <div class="text-center text-2xl font-semibold leading-3 mb-10 text-white">
                <lord-icon src="https://cdn.lordicon.com/gqqykmqo.json" trigger="hover"
                    colors="outline:#121331,primary:#545454,secondary:#ad6836,tertiary:#4faef9,quaternary:#f3c3ba"
                    style="width:150px;height:150px">
                </lord-icon>
                <p>Login Admin</p>
            </div>
            <div class="flex flex-col gap-y-5">
                <div class="w-4/5 mx-auto">
                    <label name="username" class="text-white">Username</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <UserIcon />
                        <span>|</span>
                        <input type="text" class="bg-white w-full outline-none" name="username" placeholder="username"
                            @change="inputUsername($event)">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="password" class="text-white">Password</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <LockIcon />
                        <span>|</span>
                        <input type="password" class="bg-white w-full outline-none" name="password" placeholder="password"
                            @change="inputPassword($event)">
                    </div>
                </div>
            </div>


            <div @click="login"
                class="bg-lime-700 w-56 py-4 mt-16 rounded-full mx-auto text-white text-center text-lg font-semibold cursor-pointer">
                Login
            </div>

        </div>
    </div>
</template>

<script>
import UserIcon from '../assets/icon/UserIcon.vue'
import LockIcon from '../assets/icon/LockIcon.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
// import { useRouter } from 'vue-router'
export default {
    name: 'AdminPage',
    components: {
        UserIcon,
        LockIcon,
        NavbarComponent
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        inputUsername(e) {
            this.username = e.target.value
        },
        inputPassword(e) {
            this.password = e.target.value
        },
        login() {
            if (this.username === 'admin' && this.password === 'adminlogin') {
                this.$router.push({ name: 'admin dashboard' })
            } else {
                alert('Check kembali username dan password anda!')
            }
        }
    }
}
</script>