import * as types from './types';

export default {
    [types.initialItems]: (state) => {
        const localItems = JSON.parse(localStorage.getItem('items'));
        if (localItems && Array.isArray(localItems) && localItems.length) {
            return localItems;
        }

        return state.items;
    },
    [types.urgentPosition]: (state) => (urgent) => {
        return (state.max - urgent) * (state.baseFrame.width / state.max) + state.baseFrame.x;
    },
    [types.importantPosition]: (state) => (important) => {
        return (state.max - important) * (state.baseFrame.height / state.max) + state.baseFrame.y;
    },
}