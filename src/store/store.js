import { createStore } from 'vuex'
import JajananPasar from '../store/modules/jajanan_pasar'
import users from './modules/users'

const store = createStore({
  modules: {
    JajananPasar,
    users
  }
})

export default store
