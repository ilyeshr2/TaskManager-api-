import Vue from 'nativescript-vue';
import Login from './components/Login.vue';


// Add this at the start of app.js
Vue.config.silent = false;
new Vue({
    render: h => h('frame', [h(Login)])
}).$start();
