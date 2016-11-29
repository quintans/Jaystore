// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

import store from 'vuex/store';

// import components
import App from 'App.vue'
import ProductCatalog from 'components/ProductCatalog.vue';
import ManageProducts from 'components/ManageProducts.vue';

// import global libs
// import '../node_modules/bootstrap/dist/js/bootstrap'

// import some global styles
import './styles/style.scss'

Vue.use(VueRouter)

const routes: VueRouter.RouteConfig[] = [
  { path: '/home', alias: '/', component: ProductCatalog },
  { path: '/manage-products', component: ManageProducts }
]

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: h => h('app')
});
