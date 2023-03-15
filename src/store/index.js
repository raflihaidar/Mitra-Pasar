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
      await axios.get('http://localhost:3333/produk_jajanan').then((response) => {
        console.log(response.data)
        commit('SET_CATALOG', response.data)
      })
    }
  },
  mutations: {
    SET_CATALOG: (state, payload) => (state.catalog = payload)
  }
}
