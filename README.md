# Jaystore

Online shop build with Vue.js 2.0, vue-router, vuex and Typescript 2.0

## Intro

I wanted to try [Vue.js](https://vuejs.org/), with [TypeScript](https://www.typescriptlang.org/)
and for this I started with the [av-ts-template](https://github.com/HerringtonDarkholme/av-ts-template) template
and with the [Jayway Vue.js 2.0 workshop](https://github.com/jayway/vue-js-workshop) tutorial, more specifically the demo.
I ended up creating some Typescript decorators for [Vuex](https://github.com/vuejs/vuex) and for a custom bus.

I do not have any experience with webpack (I am more of a backend guy),
so apologies for a less than ideal webpack configuration.

In no way this is a best practice to do Vue.js applications, but for me, it is what it feels right. 

This project uses:
* [Vue.js](https://vuejs.org/)
* [vue-router](https://github.com/vuejs/vue-router)
* [Vuex](https://github.com/vuejs/vuex) with custom Typescript decorators `@Getter`, `@Action`, ... 
* [TypeScript](https://www.typescriptlang.org/)
* [vue-class-component](https://github.com/vuejs/vue-class-component)
* [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
* Custom bus with custom decorators `@Listen` to listen to events.
This way we do not have to listen for events in the template and redirect them to the view-model.
This is also handy for comunication between sibling components.
* [axios](https://github.com/mzabriskie/axios) for REST

## Relevant changes to the original Jaystore

* In order to have autocompletion for TypeScript I moved the script section of `.vue` files
into separate `.ts` files and had them referenced in the `.vue` file.
* Converted store module `products` into a service.
* Product state is retrived when you enter a page, 
meaning ProductList and ProductCatalog get the list of products from the backend on page create.
* Comunication between ProductList and SaveProductForm is done by an event bus
with the help of `@Listen` decorator. 


## Scripts

__Backend__

in the `/api` dir run:

`npm start`

Setup:

`npm install`


__Freontend__

in the `/app` dir run:

`npm run dev` - will start a local dev server at localhost:8080

`npm run build` - will build your project into the /dist folder

Setup:

`typings install`

`npm install`


Enjoy!
