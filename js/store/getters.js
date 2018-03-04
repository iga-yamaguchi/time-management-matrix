export default {
    urgentPosition: (state) => (urgent) => {
        return (state.max - urgent) * (state.baseFrame.width / state.max) + state.baseFrame.x;
    },
    importantPosition: (state) => (important) => {
        return (state.max - important) * (state.baseFrame.height / state.max) + state.baseFrame.y;
    },
}