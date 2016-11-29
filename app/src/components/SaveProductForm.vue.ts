import * as Vue from 'vue'
import { Component, watch } from 'vue-property-decorator';

import { Product } from 'JayStore';
import { bus, Listen } from 'data/bus';

import * as productsService from 'services/products';

const NewProduct = (): Product => {
    return {
        id: null,
        name: '',
        description: '',
        price: null,
    };
}

@Component({})
export default class ShoppingCart extends Vue {
    product = NewProduct();

    formErrors: any = {}
    selectedFile: File = undefined
    selectedFileName = ''

    @watch('product.id')
    watchProductId() {
        this.formErrors = {};
        this.selectedFile = undefined
        this.selectedFileName = this.product.imageName
    }

    validateForm() {
        const errors: any = {};

        if (!this.product.name) {
            errors.name = 'Name is required'
        }

        if (!this.product.price) {
            errors.price = 'Price is required'
        }

        this.formErrors = errors;

        return Object.keys(errors).length === 0;
    }

    onCancel() {
        this.formErrors = {}

        this.product = NewProduct();
    }

    onImageChanged(event) {
        let file = <File>event.target.files[0]
        this.selectedFile = file;
        this.selectedFileName = file.name
    }

    onSubmit() {
        if (this.validateForm()) {
            productsService.saveProduct(this.product, this.selectedFile)
                .then((data) => {
                    this.onCancel();
                    bus.$emit('submit');
                });
        }
    }

    @Listen('edit')
    onEditClicked(product: Product) {
        // since objects are passed by reference we need to clone the product
        this.product = Object.clone(product);
    }


    @Listen('remove')
    onRemove(productId) {
        if (productId === this.product.id) {
            this.onCancel();
        }
    }

}
