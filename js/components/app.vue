<template>
    <div>
        <svg version="1.1"
             baseProfile="full"
             xmlns="http://www.w3.org/2000/svg">

            <rect :x="baseFrame.x | vw" :y="baseFrame.y | vh" :width="baseFrame.width | vw"
                  :height="baseFrame.height | vh" ref="rect"></rect>
            <line x1="0" x2="100vw" y1="50vh" y2="50vh"></line>
            <line x1="50vw" x2="50vw" y1="0" y2="100vh"></line>

            <text x="5vw" y="25vh" writing-mode="tb">Important</text>
            <text x="5vw" y="65vh" writing-mode="tb">Not Important</text>
            <text x="25vw" y="5vh">Urgent</text>
            <text x="60vw" y="5vh">Not Urgent</text>

            <template v-for="(item, index) in items">
                <text :x="urgentPosition(item.urgent) | vw" :y="importantPosition(item.important, index) | vh" class="item-text" ref="text">{{ item.value}}</text>
            </template>
        </svg>
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
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                isMounted: false,
                baseFrame: this.$store.state.baseFrame,
                max: this.$store.state.max,
                min: this.$store.state.min,
            };
        },
        computed: Object.assign(mapState([
            'items',
        ]), {
            ...mapGetters([
                'urgentPosition',
                'importantPosition',
            ]),
        }),
        created() {
        },
        mounted() {
            this.isMounted = true;
        },
        filters: {
            vw(width) {
                return width ? width + 'vw' : 0;
            },
            vh(height) {
                return height ? height + 'vh' : 0;
            },
        },
        methods: {
            getBBoxInText(index) {
                if (this.isMounted) return this.$refs.text[index].getBBox();
                return 0;
            },
            add() {
                this.$store.commit('add');
            },
            remove(index) {
                this.$store.commit('remove', index);
            },
        }
    }
</script>

<style scoped>
    svg {
        background-color: antiquewhite;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    rect {
        fill: purple;
        fill-opacity: 0.5;
        stroke: blue;
        stroke-opacity: 0.8;
    }

    rect.item-frame {
        fill: white;
    }

    .item-text {
        color: black;
    }

    line {
        stroke: black;
        stroke-width: 1;
    }

    text {
        font-size: 32px;
    }

    .task-inputs {
        position: absolute;
    }

    .task-inputs label {
        display: block;
    }
</style>