import * as Vuex from 'vuex'

import { getters } from './getters'
import { actions } from './actions'

import * as types from './mutation-types'

import { Product } from 'JayStore';
import { CartState } from './interface'


const initialState: CartState = {
  products: []
}

// mutations
const mutations: Vuex.MutationTree<CartState> = {
  [types.ADD_TO_CART](state: CartState, product: Product) {
    const record = state.products.find(p => p.id === product.id)
    if (!record) {
      state.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    } else {
      record.quantity++;
    }
  },

  [types.REMOVE_FROM_CART](state, productId) {
    state.products = state.products.filter(p => p.id !== productId);
  },

  [types.SUBTRACT_FROM_CART](state, productId) {
    const record = state.products.find(p => p.id === productId)
    if (record && record.quantity === 1) {
      state.products = state.products.filter(p => p.id !== productId);
    } else if (record) {
      record.quantity--;
    }
  }
}

export const cart: Vuex.Module<CartState, any> = {
  state: Object.clone(initialState),
  actions,
  getters,
  mutations
}