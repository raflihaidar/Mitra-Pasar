import axios from 'axios'
export default {
  state: {
    catalog: []
  },
  getters: {
    catalog: (state) => state.catalog
  },
  actions: {
    async setCatalog({ commit }) {
      await axios.get('http://localhost:3000/jajanan_pasar').then((response) => {
        commit('SET_CATALOG', response.data)
      })
    },
    async deleteData({ commit }, id) {
      try {
        const response = await axios.delete(`http://localhost:3000/jajanan_pasar/${id}`)
        commit('DELETE_DATA', id)
        commit('SET_CATALOG', response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    SET_CATALOG: (state, payload) => (state.catalog = payload),
    DELETE_DATA: (state, id) => {
      state.data = state.data.filter((item) => item.id !== id)
    }
  }
}
