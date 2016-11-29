import * as Vue from 'vue'
import * as Vuex from 'vuex'

import {cart} from './modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cart
  },
  strict: debug,
})
