<template>
  <table class="table table-hover product-table">
    <thead>
      <tr>
        <th class="product-image-col"></th>
        <th class="product-name-col">Name</th>
        <th class="hidden-sm-down">Description</th>
        <th class="product-price-col">Price</th>
        <th class="product-delete-col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id" @click.prevent="onEdit(product)">
        <td>
          <img v-if="product.imageUrl" v-bind:src="product.imageUrl" alt="Product image" class="product-image">
          <img v-else src="../assets/product_placeholder.svg" alt="Product image" class="product-image">
        </td>
        <td>{{product.name}}</td>
        <td class="hidden-sm-down">{{product.description}}</td>
        <td>{{product.price}}:-</td>
        <td><a href="#" @click.prevent.stop="onRemove(product.id)">remove</a></td>
      </tr>
      <tr v-if="!products.length">
        <td colspan="5" class="p-y-3 text-xs-center">
          <strong>You should add some products!</strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./ProductList.vue.ts"></script>
