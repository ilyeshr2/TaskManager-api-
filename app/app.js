import Vue from 'nativescript-vue';
import Login from './components/Login.vue';

Vue.config.silent = false;
new Vue({
    render: h => h('frame', [h(Login)])
}).$start();
