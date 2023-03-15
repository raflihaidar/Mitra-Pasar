<template>
    <div class="h-screen bg-lime-700 font-openSans">
        <div
            class="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[96] py-10 bg-lime-600 rounded-lg">
            <div class="text-center text-2xl font-semibold leading-3 mb-10 text-white">
                <lord-icon src="https://cdn.lordicon.com/vusrdugn.json" trigger="hover"
                    colors="primary:#121331,secondary:#b26836,tertiary:#e8e230,quaternary:#f9c9c0,quinary:#ebe6ef"
                    style="width:150px;height:150px">
                </lord-icon>
                <p>Login User</p>
            </div>
            <div class="flex flex-col gap-y-5">
                <div class="w-4/5 mx-auto">
                    <label name="username" class="text-white">Username</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <UserIcon />
                        <span>|</span>
                        <input type="text" class="bg-white w-full outline-none" name="username" placeholder="username">
                    </div>
                </div>
                <div class="w-4/5 mx-auto">
                    <label name="password" class="text-white">Password</label>
                    <div class="flex items-center justify-evenly py-2 px-3 bg-white">
                        <LockIcon />
                        <span>|</span>
                        <input type="password" class="bg-white w-full outline-none" name="password" placeholder="password">
                    </div>
                </div>
            </div>
            <div
                class="bg-lime-700 w-56 py-4 mt-16 rounded-full mx-auto text-white text-center text-lg font-semibold cursor-pointer">
                Login</div>
        </div>
    </div>
</template>

<script>
import UserIcon from '../assets/icon/userIcon.vue'
import LockIcon from '../assets/icon/LockIcon.vue'
export default {
    name: 'AdminPage',
    components: {
        UserIcon,
        LockIcon
    }
}
</script>