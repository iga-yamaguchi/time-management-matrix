export default {
    add(state) {
        state.items.push({
            urgent: 100,
            important: 100,
            value: '',
        });
    },
    remove(state, index) {
        state.items.splice(index, 1);
    }
}