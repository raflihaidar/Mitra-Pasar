import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '../../router/index.js'
import swal from 'sweetalert'
import { useProductStore } from '../products/index.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    const productStore = useProductStore()
    const cart = ref([])
    const cartAmount = ref(0)
    const selectedItem = ref([])
    const total = ref(0)

    const Total = computed(() => {
      return cart.value
        .reduce((amount, item) => {
          if (item.isChecked) {
            amount += item.total
            total.value = amount
            console.log(total.value)
          }
          return amount
        }, 0)
        .toLocaleString('ID-id')
    })

    const getCartByIdUser = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/cart?id=${id}`)
        cart.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const getCartAmount = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/cart/totalData?id=${id}`)
        const { amount } = response.data.data[0]
        if (amount) cartAmount.value = amount
        else cartAmount.value = 0
      } catch (error) {
        console.log(error)
      }
    }

    const setSelectedItem = async (id_cart) => {
      try {
        const response = await axios.get(`http://localhost:8000/cart/shipment?id_cart=${id_cart}`)
        selectedItem.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const addToCart = async (payload, userData) => {
      try {
        if (!userData) {
          swal('Anda Belum Login\nSilahkan Login Terlebih Dahulu', {
            buttons: {
              cancel: 'Batal',
              confirm: 'Login'
            }
          }).then((login) => {
            if (login) router.push({ name: 'login user' })
          })
        } else {
          const addedItem = cart.value.find((item) => item.id === payload.id)
          const limitItem = payload.stock > 0

          if (limitItem) {
            if (addedItem) {
              await axios.patch(`http://localhost:8000/cart`, {
                quantity: 1,
                id_cart: userData.id_cart,
                id_product: payload.id
              })
            } else {
              const response = await axios.post(`http://localhost:8000/cart`, {
                id_cart: userData.id_cart,
                id_product: payload.id,
                total: payload.price
              })
              cart.value.push(response.data.body)
            }

            await axios.patch(`http://localhost:8000/products/${payload.id}`, {
              stock: payload.stock - 1
            })
            await getCartAmount(userData.id)
            await getCartByIdUser(userData.id)

            payload.stock -= 1
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const removeCartProduct = (index) => {
      let cartItem = cart.value[index]
      let product = productStore.catalog.find((item) => item.id === cartItem.id)
      if (cartItem.quantity === 1) {
        cart.value.splice(index, 1)
      } else {
        cartItem.quantity--
        cartItem.total -= product.price
      }
    }

    const clearCart = async (index) => {
      try {
        let product = cart.value[index]
        await axios.delete(`http://localhost:8000/cart/${product.id_cart}&${product.id}`)
        cart.value.splice(index, 1)
        productStore.catalog.forEach(async (item) => {
          if (item.id === product.id) {
            await axios.patch(`http://localhost:8000/products/${product.id}`, {
              stock: (item.stock += product.quantity)
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    const removeItem = async (index, item) => {
      try {
        await axios.patch(`http://localhost:8000/cart/${item.id_cart}&${item.id}`)
        if (item.quantity === 1) {
          await axios.delete(`http://localhost:8000/cart/${item.id_cart}&${item.id}`)
        }
        removeCartProduct(index)
        productStore.setCatalog('products')
      } catch (err) {
        console.log(err)
      }
    }

    const handleStatus = async (index) => {
      try {
        let cartItem = cart.value[index]
        await axios.patch(`http://localhost:8000/cart/isChecked/${cartItem.id_cart}&${cartItem.id}`)
        setSelectedItem(cartItem.id_cart)
        cartItem.isChecked = !cartItem.isChecked
      } catch (error) {
        console.log(error)
      }
    }

    return {
      cart,
      cartAmount,
      selectedItem,
      total,
      Total,
      getCartByIdUser,
      getCartAmount,
      setSelectedItem,
      addToCart,
      removeCartProduct,
      clearCart,
      removeItem,
      handleStatus
    }
  },
  {
    persist: true
  }
)
