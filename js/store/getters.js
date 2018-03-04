import * as types from './types';

export default {
    [types.urgentPosition]: (state) => (urgent) => {
        return (state.max - urgent) * (state.baseFrame.width / state.max) + state.baseFrame.x;
    },
    [types.importantPosition]: (state) => (important) => {
        return (state.max - important) * (state.baseFrame.height / state.max) + state.baseFrame.y;
    },
}