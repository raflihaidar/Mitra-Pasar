import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'
import { computed, ref } from 'vue'
import router from '../../router/index.js'

export const useProductStore = defineStore(
  'products',
  () => {
    const catalog = ref([])
    const category = ref([])
    const cart = ref([])
    const cartAmount = ref(0)
    const selectedItem = ref([])
    const total = ref(0)

    const Total = computed(() => {
      return cart.value.reduce((amount, item) => {
        if (item.isChecked) {
          amount += item.total
          total.value = amount
        }
        return amount
      }, 0)
    })

    const setCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category')
        category.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    // const getCartAmount = async (id) => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/cart/totalData?id=${id}`)
    //     const { amount } = response.data.data[0]
    //     if (amount) cartAmount.value = amount
    //     else cartAmount.value = 0
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const setCatalog = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/${url}`)
        catalog.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const getPriceProduct = (item) => {
      return item.toLocaleString('id-ID')
    }

    // const setSelectedItem = async (id_cart) => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/cart/shipment?id_cart=${id_cart}`)
    //     selectedItem.value = response.data.data
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const setCatalogByCategory = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/products?category=${url}`)
        catalog.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const updateProduct = async (payload) => {
      try {
        await axios.put(`http://localhost:8000/products/${payload.id}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    // const getCartByIdUser = async (id) => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/cart?id=${id}`)
    //     cart.value = response.data.data
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const handleBuy = (payload) => {
      total.value = payload.price
    }

    // const addToCart = async (payload, userData) => {
    //   try {
    //     if (!userData) {
    //       swal('Anda Belum Login\nSilahkan Login Terlebih Dahulu', {
    //         buttons: {
    //           cancel: 'Batal',
    //           confirm: 'Login'
    //         }
    //       }).then((login) => {
    //         if (login) router.push({ name: 'login user' })
    //       })
    //     } else {
    //       const addedItem = cart.value.find((item) => item.id === payload.id)
    //       const limitItem = payload.stock > 0

    //       if (limitItem) {
    //         if (addedItem) {
    //           await axios.patch(`http://localhost:8000/cart`, {
    //             quantity: 1,
    //             id_cart: userData.id_cart,
    //             id_product: payload.id
    //           })
    //         } else {
    //           const response = await axios.post(`http://localhost:8000/cart`, {
    //             id_cart: userData.id_cart,
    //             id_product: payload.id,
    //             total: payload.price
    //           })
    //           cart.value.push(response.data.body)
    //         }

    //         await axios.patch(`http://localhost:8000/products/${payload.id}`, {
    //           stock: payload.stock - 1
    //         })
    //         await getCartAmount(userData.id)
    //         await getCartByIdUser(userData.id)

    //         payload.stock -= 1
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // const removeCartProduct = (index) => {
    //   let cartItem = cart.value[index]
    //   let product = catalog.value.find((item) => item.id === cartItem.id)
    //   if (cartItem.quantity === 1) {
    //     cart.value.splice(index, 1)
    //   } else {
    //     cartItem.quantity--
    //     cartItem.total -= product.price
    //   }
    // }

    // const clearCart = async (index) => {
    //   try {
    //     let product = cart.value[index]
    //     await axios.delete(`http://localhost:8000/cart/${product.id_cart}&${product.id}`)
    //     cart.value.splice(index, 1)
    //     catalog.value.forEach(async (item) => {
    //       if (item.id === product.id) {
    //         await axios.patch(`http://localhost:8000/products/${product.id}`, {
    //           stock: (item.stock += product.quantity)
    //         })
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // const handleStatus = async (index) => {
    //   try {
    //     let cartItem = cart.value[index]
    //     await axios.patch(`http://localhost:8000/cart/isChecked/${cartItem.id_cart}&${cartItem.id}`)
    //     setSelectedItem(cartItem.id_cart)
    //     cartItem.isChecked = !cartItem.isChecked
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

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
        await axios.patch(`http://localhost:8000/cart/${item.id_cart}&${item.id}`)
        if (item.quantity === 1) {
          await axios.delete(`http://localhost:8000/cart/${item.id_cart}&${item.id}`)
        }
        removeCartProduct(index)
        setCatalog('products')
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
      cart,
      total,
      Total,
      category,
      selectedItem,
      cartAmount,
      setCategory,
      setSelectedItem,
      updateProduct,
      getPriceProduct,
      getCartByIdUser,
      getCartAmount,
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
