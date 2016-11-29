import * as Vue from 'vue'
import { Component } from 'vue-property-decorator';

import { Product } from 'JayStore';
import { bus, Listen } from 'data/bus';

import * as productsService from 'services/products';

@Component({})
export default class ProductList extends Vue {
  products: Product[] = [];

  // Lifecycle
  created() {
    this.load();
  }

  onEdit(product) {
    bus.$emit('edit', product)
  }

  @Listen('submit')
  load(){
    productsService.fetchProducts()
      .then(data => this.products = data);
  }

  onRemove(productId) {
    productsService.deleteProduct(productId).then(() => {
      this.products.findIndex((e, index) => {
        if (e.id === productId) {
          this.products.splice(index, 1);
          return true;
        }
        return false;
      });

      bus.$emit('remove', productId);
    });
  }

}
