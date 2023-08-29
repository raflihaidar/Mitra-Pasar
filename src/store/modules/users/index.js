import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

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

    return {
      dataUser,
      dataFiltered,
      setDataUser,
      handleLogin,
      handleLogOut
    }
  },
  {
    persist: true
  }
)
