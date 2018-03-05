import * as types from './types';

export default {
    [types.set](state, items) {
        state.items = items;
        localStorage.setItem('items', JSON.stringify(state.items));
    },
    [types.add](state) {
        state.items.push({
            urgent: 100,
            important: 100,
            value: '',
        });
        localStorage.setItem('items', JSON.stringify(state.items));
    },
    [types.remove](state, index) {
        state.items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(state.items));
    }
}