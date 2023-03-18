import axios from 'axios'
export default {
  state: {
    catalog: [],
    cart: []
  },
  getters: {
    catalog: (state) => state.catalog,
    cart: (state) => state.cart
  },
  actions: {
    async setCatalog({ commit }) {
      await axios.get('http://localhost:3000/jajanan_pasar').then((response) => {
        commit('SET_CATALOG', response.data)
      })
    },
    addToCart({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    async deleteData({ commit }, id) {
      try {
        const response = await axios.delete(`http://localhost:3000/jajanan_pasar/${id}`)
        commit('DELETE_DATA', id)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    async updateData({ commit }, id, newData) {
      await axios.put(`http://localhost:3000/jajanan_pasar/${id}`, newData).then((response) => {
        commit('SET_CATALOG', response.data)
        console.log(newData)
      })
    }
  },
  mutations: {
    SET_CATALOG: (state, payload) => (state.catalog = payload),
    DELETE_DATA: (state, id) => {
      state.catalog.find((item) => item.id !== id)
    },
    UPDATE_CART: (state, payload) => {
      //mutations untuk memasukkan product ke keranjang
      const addedItem = state.cart.find((item) => item.id === payload.id)
      const limitItem = payload.stok > 0
      if (limitItem) {
        payload.stok -= 1
        if (addedItem) {
          addedItem.kuantitas++
          addedItem.priceUser = payload.harga * addedItem.kuantitas
        } else {
          state.cart.push({
            ...payload,
            kuantitas: 1,
            priceUser: payload.harga
          })
        }
      }
    }
  }
}
