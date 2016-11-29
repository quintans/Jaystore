import * as Vue from 'vue'
import { Component } from 'vue-property-decorator';

import ProductList from './ProductList.vue'
import SaveProductForm from './SaveProductForm.vue'

@Component({
    components: {
        ProductList,
        SaveProductForm,
    },
})
export default class ManageProducts extends Vue {
}
