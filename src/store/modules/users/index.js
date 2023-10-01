import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import swal from 'sweetalert'
import router from '../../../router/index'

axios.defaults.baseURL = 'http://localhost:8000/users'

export const useUserStore = defineStore(
  'users',
  () => {
    let dataUser = ref([])
    let dataFiltered = ref(null)

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

    const getUserLogged = async () => {
      const response = await axios.get('/logged')
      if (response.data.data) dataFiltered.value = response.data.data
      else dataFiltered.value = null
    }

    const handleLogin = async (payload) => {
      try {
        await axios.put(`/${payload}`, { isAuthenticated: true })
        await getUserLogged()

        swal('Berhasil Login', {
          icon: 'success'
        }).then(() => {
          router.push({ name: 'content page' })
        })
      } catch (err) {
        console.error(err)
      }
    }

    const handleSignUp = async (payload) => {
      try {
        await axios.post('/', payload)
        swal('Berhasil Sign Up', {
          icon: 'success'
        }).then(() => {
          router.push({ name: 'login user' })
        })
      } catch (error) {
        console.log(error.message)
        console.log(payload)
      }
    }

    const handleLogOut = async (item) => {
      try {
        await axios.put(`${item}`, { isAuthenticated: false })
        dataFiltered.value = null
      } catch (err) {
        console.log(err.message)
      }
    }

    const editProfileUser = async (item, id) => {
      try {
        await axios.patch(`/${id}`, item, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        await setDataUser()
        for (const data of dataUser.value.data) {
          if (data.username === item.username) {
            dataFiltered.value = data
            swal('Berhasil Mengubah Profil', {
              icon: 'success',
              buttons: {
                confirm: 'OK'
              }
            })
          }
        }
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
      getUserLogged,
      handleLogin,
      handleSignUp,
      handleLogOut,
      editProfileUser,
      deleteDataUser
    }
  },
  {
    persist: true
  }
)
