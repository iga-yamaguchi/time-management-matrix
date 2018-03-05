import Vue from 'vue';
import App from './components/app.vue';
import {createStore} from "./store";

new Vue({
    store: createStore(),
    render: h => h(App),
}).$mount('#app');