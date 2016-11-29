import * as Vue from 'vue'
import ShoppingCart from './ShoppingCart.vue'

import { Component } from 'vue-property-decorator';

import { Product } from 'JayStore';
import { Getter } from 'decorators'

@Component({
    components: {
        ShoppingCart,
    },
})
export default class AppNav extends Vue {
    // this needs to be declared so that we don't have compilation errors
    @Getter('getCartItems')
    get inCart(): Product[] { return null }

    get totalItems() {
        return this.inCart.reduce((sum, p) => sum + p.quantity, 0)
    }
}
