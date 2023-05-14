import axios from 'axios'
export default {
  state: {
    dataUser: [],
    isAuthenticated: false
  },
  getters: {
    dataUser: (state) => state.dataUser,
    isAuthenticated: (state) => state.isAuthenticated
  },
  actions: {
    async setDataUser({ commit }) {
      await axios.get('http://localhost:8000/user').then((response) => {
        commit('GET_DATA_USER', response.data)
        console.log(response.data)
      })
    },
    handleLogin({ commit }) {
      commit('SET_AUTHENTICATED')
    }
  },
  mutations: {
    GET_DATA_USER: (state, payload) => (state.dataUser = payload),
    SET_AUTHENTICATED: (state) => {
      state.isAuthenticated = !state.isAuthenticated
    }
  }
}
