import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            baseFrame: {
                x: 10,
                y: 10,
                width: 80,
                height: 80,
            },
            items: [
                {
                    urgent: 100,
                    important: 100,
                    value: '',
                },
            ],
            max: 100,
            min: 0,
        },
        actions,
        mutations,
        getters,
    });
}