import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

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
            console.log(item)
            await axios.put(`/${item.id}`, { isAuthenticated: true })
            dataFiltered.value = item
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    return {
      dataUser,
      dataFiltered,
      setDataUser,
      handleLogin
    }
  },
  {
    persist: true
  }
)
