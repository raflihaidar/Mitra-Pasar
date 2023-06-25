import axios from 'axios'
export default {
  state: {
    dataUser: [],
    dataFiltered: [],
    username: '',
    isAuthenticated: false
  },
  getters: {
    dataUser: (state) => state.dataUser,
    dataFiltered: (state) => state.dataFiltered,
    isAuthenticated: (state) => state.isAuthenticated,
    username: (state) => state.username
  },
  actions: {
    async setDataUser({ commit }) {
      await axios.get('http://localhost:8000/user').then((response) => {
        commit('GET_DATA_USER', response.data)
        console.log(response.data)
      })
    },
    handleLogin({ commit }, payload) {
      commit('SET_AUTHENTICATED', payload)
      commit('GET_DATA_FILTERED', payload)
    }
  },
  mutations: {
    GET_DATA_USER: (state, payload) => (state.dataUser = payload),
    GET_DATA_FILTERED: (state, payload) => {
      const data = state.dataUser.data.find(
        (item) => item.username == payload || item.nomor_hp == payload || item.email == payload
      )
      state.dataFiltered = data
    },
    SET_AUTHENTICATED: (state, payload) => {
      state.dataUser.data.forEach((item) => {
        if (item.username == payload) {
          state.username = item.username
        }
      })
      state.isAuthenticated = !state.isAuthenticated
    }
  }
}
