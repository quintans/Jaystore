<template>
  <nav class="navbar navbar-full navbar-light navbar-jw">
    <button
      class="navbar-toggler hidden-sm-up pull-xs-right"
      type="button"
      data-toggle="collapse"
      data-target="#appnav"
      aria-controls="appnav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      &#9776;
    </button>

    <a class="navbar-brand" href="#">
      <img src="../assets/jay.svg" alt="Jayway logo" /> Jaystore
    </a>

    <div class="collapse navbar-toggleable-xs" id="appnav">
      <div class="nav navbar-nav">
        <router-link
          to="home"
          class="nav-item nav-link"
          active-class="active"
          exact
        >
          Home
        </router-link>
        <router-link
          to="manage-products"
          class="nav-item nav-link"
          active-class="active"
          exact
        >
          Manage Products
        </router-link>
      </div>
      <div class="nav navbar-nav pull-sm-right">
        <div class="nav-item dropdown dropdown-cart">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <span v-if="totalItems" class="tag tag-pill tag-primary">{{totalItems}}</span> Shopping cart
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <shopping-cart></shopping-cart>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script src="./AppNav.vue.ts"></script>
