import * as Vuex from 'vuex'

import * as types from './mutation-types'
import { Product } from 'JayStore';
import { CartState } from './interface'

export const actions: Vuex.ActionTree<CartState, any> = {
  addToCart({ commit, state }: Vuex.ActionContext<CartState, any>, product: Product) {
    const record = state.products.find((p) => p.id === product.id)

    if (!record || record.quantity < 10) {
      commit(types.ADD_TO_CART, product)
    }
  },

  removeFromCart({ commit }, productId) {
    commit(types.REMOVE_FROM_CART, productId)
  },

  subtractFromCart({ commit }, productId) {
    commit(types.SUBTRACT_FROM_CART, productId)
  }
}