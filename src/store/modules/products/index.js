import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'
import { computed, ref } from 'vue'

export const useJajananStore = defineStore(
  'products',
  () => {
    const catalog = ref([])
    const filteredCatalog = ref([])
    const category = ref([])
    const cart = ref([])
    const total = ref(0)
    const Total = computed(() => {
      return cart.value.reduce((amount, item) => {
        if (item.status) {
          amount += item.priceUser
          total.value = amount
        }
        return amount
      }, 0)
    })

    const setCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category')
        const { data } = response.data
        category.value = data
      } catch (error) {
        console.log(error)
      }
    }

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

    const setCatalogByCategory = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/products?category=${url}`)
        catalog.value = response.data
        console.log(response.data)
      } catch (error) {
        console.log(error)
        console.log(url)
      }
    }

    const getCartByIdUser = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/cart?id=${id}`)
        const { data } = response.data
        cart.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const handleBuy = (payload) => {
      total.value = payload.price
    }

    const addToCart = async (payload, id_cart) => {
      try {
        let addedItem = cart.value.find((item) => item.id === payload.id)
        let limitItem = payload.stock > 0
        let quantity = 0
        if (limitItem) {
          payload.stock -= 1
          if (addedItem) {
            quantity++
            await axios.patch(`http://localhost:8000/cart`, {
              quantity,
              id_cart,
              id_product: payload.id
            })
          } else {
            const response = await axios.put(`http://localhost:8000/cart`, {
              id_cart,
              id_product: payload.id,
              total: payload.price
            })
            cart.value.push(response.data)
          }
        }
      } catch (error) {
        console.log(error)
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
      catalog.value.data.forEach((item) => {
        if (item.id === product.id) {
          item.stock += product.quantity
        }
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
        await axios.patch(`http://localhost:8000/products/${item.id}`, { stock: result })
        setCatalog('products')
        removeCartProduct(index)
      } catch (err) {
        console.log(err)
      }
    }

    const deleteData = async (payload) => {
      try {
        swal('Apakah anda ingin menghapus ?', {
          icon: 'warning',
          buttons: {
            cancel: 'Batal',
            confirm: 'Hapus'
          }
        }).then(async (bayar) => {
          if (bayar) {
            await axios.delete(`http://localhost:8000/products/${payload.id}`).then(() => {
              setCatalog('products')
            })
            let deletedItem = catalog.value.data.find((item) => item.id === payload.id)
            if (deletedItem) {
              const index = catalog.value.data.indexOf(deletedItem)
              catalog.value.splice(index, 1)
            }
          } else {
            swal('batal')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      catalog,
      filteredCatalog,
      cart,
      total,
      Total,
      category,
      setCategory,
      getCartByIdUser,
      setCatalog,
      setCatalogByCategory,
      clearCart,
      handleStatus,
      handleBuy,
      addToCart,
      checkOut,
      removeItem,
      removeCartProduct,
      deleteData
    }
  },
  {
    persist: true
  }
)
