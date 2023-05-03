import axios from 'axios'
import swal from 'sweetalert'
export default {
  state: {
    catalog: [],
    cart: [],
    total: null
  },
  getters: {
    catalog: (state) => state.catalog,
    cart: (state) => state.cart,
    Total: (state) => state.total
  },
  actions: {
    async setCatalog({ commit }) {
      await axios.get('http://localhost:8000/jajanan_pasar').then((response) => {
        commit('SET_CATALOG', response.data)
      })
    },
    addToCart({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    removeCartProduct({ commit }, index) {
      commit('REMOVE_ITEM', index)
    },
    clearCart({ commit }, payload) {
      commit('CLEAR_CART', payload)
    },
    getTotal({ commit }, payload) {
      commit('SET_TOTAL', payload)
    },
    handleStatus({ commit }, payload) {
      commit('SET_STATUS', payload)
    },
    checkOut({ commit }) {
      commit('CHECK_OUT')
    },
    async deleteData({ commit }, id) {
      try {
        const response = await axios.delete(`http://localhost:8000/jajanan_pasar/${id}`)
        commit('DELETE_DATA', id)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    async updateData({ commit }, id, newData) {
      await axios.put(`http://localhost:8000/${id}`, newData).then((response) => {
        commit('SET_CATALOG', response.data)
      })
    }
  },
  mutations: {
    SET_CATALOG: (state, payload) => (state.catalog = payload),
    SET_STATUS: (state, payload) => {
      state.cart[payload].status = true //untuk mengubah status checklist pada products
    },
    SET_TOTAL: (state, payload) => (state.total = payload), // untuk mengapdate state total
    DELETE_DATA: (state, id) => {
      state.catalog.find((item) => item.id !== id)
    },
    UPDATE_CART: (state, payload) => {
      //mutations untuk memasukkan product ke keranjang
      const addedItem = state.cart.find((item) => item.id === payload.id)
      const limitItem = payload.stock > 0
      if (limitItem) {
        payload.stock -= 1
        if (addedItem) {
          addedItem.quantity++
          addedItem.priceUser = payload.price * addedItem.quantity
        } else {
          state.cart.push({
            ...payload,
            quantity: 1,
            priceUser: payload.price
          })
        }
      }
    },
    CHECK_OUT: (state) => {
      //untuk menampilkan modal checkout
      swal(`Total Belanjaan Anda Rp.${state.total}\nBayar Sekarang ? `, {
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
            state.total = null
            const result = state.cart.filter((item) => item.status === false)
            state.cart = result
          })
        } else {
          swal('Batal di Bayar', {
            timer: 2000
          })
        }
      })
    },
    REMOVE_ITEM: (state, index) => {
      //untuk menghapus item product
      const product = state.cart[index]
      if (product.quantity === 1) {
        state.cart.splice(index, 1)
      } else {
        product.quantity--
        product.priceUser -= product.price
      }
      state.products.map((item) => {
        if (item.id === product.id) {
          item.stock++
        }
        return item
      })
      state.total -= product.price
      state.cart[index].status = false
    },
    CLEAR_CART: (state, index) => {
      //untuk menghapus semua product dari keranjang
      const product = state.cart[index]
      state.cart.splice(index, 1)
      state.products.map((item) => {
        if (item.id === product.id) {
          item.stock += product.quantity
        }
        return item
      })
      state.total -= product.priceUser
      state.cart[index].status = false
    }
  }
}
