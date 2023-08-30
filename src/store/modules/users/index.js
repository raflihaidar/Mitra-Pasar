import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import swal from 'sweetalert'
import router from '../../../router/index'

axios.defaults.baseURL = 'http://localhost:8000/user'

export const useUserStore = defineStore(
  'users',
  () => {
    let dataUser = ref([])
    const dataFiltered = ref([])

    const setDataUser = async () => {
      try {
        const res = await axios.get()
        dataUser.value = res.data
        console.log(res.data)
        console.log(dataUser)
      } catch (err) {
        console.log(err)
      }
    }

    const handleLogin = async (payload) => {
      try {
        for (const item of dataUser.value.data) {
          if (item.username === payload) {
            await axios.put(`/${item.id}`, { isAuthenticated: true })
            dataFiltered.value = item
            swal('Berhasil Login', {
              icon: 'success'
            }).then(() => {
              router.push({ name: 'content page' })
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    const handleLogOut = async (item) => {
      try {
        await axios.put(`${item}`, { isAuthenticated: false })
        dataFiltered.value = []
      } catch (err) {
        console.log(err.message)
      }
    }

    const editProfileUser = async (item, id) => {
      try {
        await axios.patch(`/${id}`, {
          username: item.username,
          address: item.address,
          email: item.email,
          nomor_hp: item.nomor_hp
        })
        alert('success')
      } catch (error) {
        console.log(error)
        console.log(item)
      }
    }

    const deleteDataUser = (id) => {
      swal('Hapus Data User', {
        icon: 'warning',
        buttons: {
          confirm: 'Hapus',
          cancel: 'Batal'
        }
      }).then(async (hapus) => {
        if (hapus) {
          await axios.delete(`/${id}`).then(() => setDataUser())
        } else {
          swal('Batal')
        }
      })
    }

    return {
      dataUser,
      dataFiltered,
      setDataUser,
      deleteDataUser,
      editProfileUser,
      handleLogin,
      handleLogOut
    }
  },
  {
    persist: true
  }
)
