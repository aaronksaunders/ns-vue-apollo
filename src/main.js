import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';


import apolloProvider from "./graphQL/provider"
import Home from "./components/Home.vue"
//Home.apolloProvider = apolloProvider
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({
  router,
  apolloProvider,
  store,
}).$start();
