import { Product } from 'JayStore';
import * as Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { mapActions } from 'vuex'

import * as productsService from 'services/products';

@Component({
  methods: mapActions([
    'addToCart'
  ])
})
export default class ProductCatalog extends Vue {
  products: Product[] = [];

  // Lifecycle
  created() {
    productsService.fetchProducts()
      .then(data => this.products = data);
  }

}
