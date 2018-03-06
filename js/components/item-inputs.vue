<template>
    <div class="task-inputs">
        <label v-for="(item, index) in items">
            <input type="text" v-model="item.value">
            <input type="range" v-model="item.urgent">
            <input type="number" v-model="item.urgent">
            <input type="range" v-model="item.important">
            <input type="number" v-model="item.important">
            <button @click="remove(index)">-</button>
        </label>
        <button @click="add">+</button>
    </div>
</template>

<script>
    import * as types from '../store/types';
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "item-inputs",
        computed: mapState([
            'items',
        ]),
        data() {
            return {
            };
        },
        methods: {
            ...mapMutations([
                types.add,
                types.remove,
            ]),
        },
    }
</script>

<style scoped>
    .task-inputs {
        position: absolute;
    }

    .task-inputs label {
        display: block;
    }
</style>