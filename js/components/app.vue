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
        <item-inputs v-if="displayInputs"></item-inputs>
        <button @click="toggle">{{ inputToggleText }}</button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import * as types from '../store/types';
    import ItemInputs from "./item-inputs.vue";

    export default {
        components: {ItemInputs},
        data() {
            return {
                isMounted: false,
                baseFrame: this.$store.state.baseFrame,
                max: this.$store.state.max,
                min: this.$store.state.min,
                nowSave: false,
                inputToggleText: 'display',
                displayInputs: false,
            };
        },
        computed: Object.assign(mapState([
            'items',
        ]), {
            ...mapGetters([
                types.urgentPosition,
                types.importantPosition,
            ]),
        }),
        created() {
            const items = this.$store.getters[types.initialItems];
            this.$store.commit(types.set, items);
        },
        watch: {
            items: {
                handler() {
                    if (this.nowSave) return;

                    this.nowSave = true;
                    setTimeout(() => {
                        this.nowSave = false;
                        localStorage.setItem('items', JSON.stringify(this.$store.state.items));
                    }, 1000);
                },
                deep: true,
            },
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
            toggle() {
                this.inputToggleText = this.displayInputs ? 'display' : 'hide';
                this.displayInputs = !this.displayInputs;
            }
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
        fill: #aefbdd;
    }

    rect.item-frame {
        fill: white;
    }

    .item-text {
        color: black;
    }

    line {
        stroke: white;
        stroke-width: 1;
    }

    text {
        font-size: 32px;
    }

    button {
        position: absolute;
        bottom: 1vh;
        left: 1vw;
    }
</style>