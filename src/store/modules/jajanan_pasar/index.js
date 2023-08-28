import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'
import { ref } from 'vue'

export const useJajananStore = defineStore(
  'jajanan_pasar',
  () => {
    const catalog = ref([])
    const filteredCatalog = ref([])
    const cart = ref([])
    const total = ref(0)

    // axios.defaults.baseURL = ''

    const setCatalog = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/${url}`)
        catalog.value = response.data
        console.log(response.data)
      } catch (error) {
        console.log(error)
        console.log(url)
      }
    }

    const handleBuy = (payload) => {
      total.value = payload.price
    }

    const addToCart = (payload) => {
      let addedItem = cart.value.find((item) => item.id === payload.id)
      let limitItem = payload.stock > 0
      if (limitItem) {
        payload.stock -= 1
        if (addedItem) {
          addedItem.quantity++
          addedItem.stock--
          addedItem.priceUser = payload.price * addedItem.quantity
        } else {
          cart.value.push({
            ...payload,
            quantity: 1,
            priceUser: payload.price
          })
        }
      }
    }

    const removeCartProduct = (index) => {
      let product = cart.value[index]
      if (product.quantity === 1) {
        cart.value.splice(index, 1)
      } else {
        product.quantity--
        product.priceUser -= product.price
      }

      cart.value.forEach((item) => {
        if (item.id === product.id) item.stock++
        return item
      })

      total.value -= product.price
      product.status = false
    }

    const clearCart = (index) => {
      let product = cart.value[index]

      cart.value.splice(index, 1)
      catalog.value.forEach((item) => {
        if (item.id === product.id) item.stock += product.quantity
        return item
      })
      total.value -= product.priceUser
      product.status = false
    }

    const handleStatus = (index) => {
      cart.value[index].status = !cart.value[index].status
    }

    const checkOut = () => {
      swal(`Total Belanjaan Anda Rp.${total.value}\nBayar Sekarang ? `, {
        buttons: {
          cancel: 'Batal',
          confirm: 'Bayar'
        }
      }).then((bayar) => {
        if (bayar) {
          swal(`Berhasil di Bayar`, {
            icon: 'success',
            button: false,
            timer: 2000
          }).then(() => {
            total.value = null
            const result = cart.value.filter((item) => !item.status)
            cart.value = result
          })
        } else {
          swal('Batal di Bayar', {
            timer: 2000
          })
        }
      })
    }

    const removeItem = async (index, item) => {
      try {
        let result = item.stock + 1
        await axios.patch(`http://localhost:8000/jajanan_pasar/${item.id}`, { stock: result })
        setCatalog('jajanan_pasar')
        removeCartProduct(index)
      } catch (err) {
        console.log(err)
      }
    }

    const deleteData = async (payload) => {
      try {
        await axios.delete(`http://localhost:8000/jajanan_pasar/${payload.id}`)
        let deletedItem = catalog.value.find((item) => item.id === payload.id)
        if (deletedItem) {
          const index = catalog.value.indexOf(deletedItem)
          catalog.value.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      catalog,
      filteredCatalog,
      cart,
      total,
      setCatalog,
      clearCart,
      handleStatus,
      handleBuy,
      addToCart,
      checkOut,
      removeItem,
      deleteData
    }
  },
  {
    persist: true
  }
)
