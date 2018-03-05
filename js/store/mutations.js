import * as types from './types';

export default {
    [types.set](state, items) {
        state.items = items;
    },
    [types.add](state) {
        state.items.push({
            urgent: 100,
            important: 100,
            value: '',
        });
    },
    [types.remove](state, index) {
        state.items.splice(index, 1);
    }
}