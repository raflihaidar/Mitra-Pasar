import axios from 'axios'
import swal from 'sweetalert'
export default {
  state: {
    catalog: [],
    filteredCatalog: [],
    cart: [],
    total: 0
  },
  getters: {
    catalog: (state) => state.catalog.data,
    catalogs: (state) => state.catalog,
    filteredCatalog: (state) => state.filteredCatalog,
    cart: (state) => state.cart,
    Total: (state) => {
      return state.cart.reduce((amount, item) => {
        if (item.status) {
          amount += item.priceUser
          state.total = amount
        }
        return amount
      }, 0)
    }
  },
  actions: {
    async setCatalog({ commit }, url) {
      await axios
        .get(`http://localhost:8000/${url}`)
        .then((response) => {
          commit('SET_CATALOG', response.data)
        })
        .catch(() => {
          commit('SET_CATALOG_ERR')
        })
    },
    handleBuy({ commit }, payload) {
      commit('BUY_NOW', payload)
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
    handleStatus({ commit }, payload) {
      commit('SET_STATUS', payload)
    },
    checkOut({ commit }) {
      commit('CHECK_OUT')
    },
    async removeItem(index, item) {
      let result = item.stock + 1
      await axios
        .patch(`http://localhost:8000/jajanan_pasar/${item.id}`, { stock: result })
        .then(() => {
          this.setCatalog('jajanan_pasar')
          this.removeCartProduct(index)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deleteData({ commit }, item) {
      try {
        await axios.delete(`http://localhost:8000/jajanan_pasar/${item.id}`)
        commit('DELETE_DATA', item)
      } catch (error) {
        console.log(item)
        console.log(error)
      }
    }
  },
  mutations: {
    SET_CATALOG: (state, payload) => (state.catalog = payload),
    SET_CATALOG_ERR: (state) => (state.catalog = []),
    SET_STATUS: (state, payload) => {
      state.cart[payload].status = !state.cart[payload].status //untuk mengubah status checklist pada products
    }, // untuk mengapdate state total
    DELETE_DATA: (state, payload) => {
      let deletedItem = state.catalog.find((item) => item.id === payload.id)
      console.log(deletedItem)
      if (deletedItem) {
        const index = state.catalog.indexOf(deletedItem)
        state.catalog.splice(index, 1)
      }
    },
    UPDATE_CART: (state, payload) => {
      //mutations untuk memasukkan product ke keranjang
      const addedItem = state.cart.find((item) => item.id === payload.id)
      const limitItem = payload.stock > 0
      if (limitItem) {
        payload.stock -= 1
        if (addedItem) {
          addedItem.quantity++
          addedItem.stock--
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
    BUY_NOW: (state, payload) => {
      state.total = payload.price
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
            const result = state.cart.filter((item) => !item.status)
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
      let product = state.cart[index]
      if (product.quantity === 1) {
        state.cart.splice(index, 1)
      } else {
        product.quantity--
        product.priceUser -= product.price
      }
      state.cart.map((item) => {
        if (item.id === product.id) {
          item.stock++
        }
        return item
      })
      state.total -= product.price
      product.status = false
    },
    CLEAR_CART: (state, index) => {
      //untuk menghapus semua product dari keranjang
      let product = state.cart[index]
      console.log(product)
      state.cart.splice(index, 1)
      state.catalog.data.map((item) => {
        if (item.id === product.id) {
          item.stock += product.quantity
        }

        return item
      })
      state.total -= product.priceUser
      product.status = false
    }
  }
}

// import { defineStore } from "pinia";

// export const useJajananStore = defineStore('jajanan_pasar', () => {
//   const
// })
