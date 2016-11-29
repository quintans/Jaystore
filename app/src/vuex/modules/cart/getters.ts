import * as Vuex from 'vuex'

import { CartState } from './interface'

export const getters: Vuex.GetterTree<CartState, any> = {
    getCartItems: state => state.products
}