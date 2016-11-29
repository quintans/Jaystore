import * as Vue from 'vue'
import { Component } from 'vue-property-decorator';

import { Product } from 'JayStore';
import { Getter } from 'decorators'

import { mapActions } from 'vuex'

@Component({
    // if we don't use this methods in our code, we can map directly
    // otherwise we would have to use @Action 
    methods: mapActions([
        'addToCart',
        'removeFromCart',
        'subtractFromCart'
    ])
})
export default class ShoppingCart extends Vue {
    @Getter('getCartItems')
    get products(): Product[] { return null }

    get total() {
        return this.products.reduce((sum, p) => sum + (p.quantity * p.price), 0)
    }
}
