import * as Vue from 'vue'
import Component from 'vue-class-component'

import AppNav from 'components/AppNav.vue'

@Component({
    components: {
        AppNav
    }
})
export default class App extends Vue {
}