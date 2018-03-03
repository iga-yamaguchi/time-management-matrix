<template>
    <div>
        <svg version="1.1"
             baseProfile="full"
             xmlns="http://www.w3.org/2000/svg">

            <rect :x="vw(baseFrame.x)" :y="vh(baseFrame.y)" width="80vw" height="80vh" ref="rect"></rect>
            <line x1="0" x2="100vw" y1="50vh" y2="50vh"></line>
            <line x1="50vw" x2="50vw" y1="0" y2="100vh"></line>

            <text x="5vw" y="25vh" writing-mode="tb">Important</text>
            <text x="5vw" y="65vh" writing-mode="tb">Not Important</text>
            <text x="25vw" y="5vh">Urgent</text>
            <text x="60vw" y="5vh">Not Urgent</text>

            <template v-for="(item, index) in items">
                <rect :x="frames[index].x" :y="frames[index].y" :width="frames[index].width"
                      :height="frames[index].height"
                      class="item-frame"></rect>
                <text :x="vw(item.text.x)" :y="vh(item.text.y)" class="item-text" ref="text">{{ item.text.value}}</text>
            </template>
        </svg>
        <div class="task-inputs">
            <label v-for="(item, index) in items">
                <input type="text" v-model="item.text.value">
                <input type="number" v-model="item.text.x">
                <input type="number" v-model="item.text.y">
                <button @click="add">+</button>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isMounted: false,
                baseFrame: {
                    x: 10,
                    y: 10,
                },
                items: [
                    {
                        text: {
                            x: 0,
                            y: 0,
                            value: '',
                        },
                    },
                ],
                frames: [
                    {x: 0, y: 0, width: 0, height: 0}
                ],
                framePadding: {
                    width: 10,
                    height: 10,
                },
            };
        },
        watch: {
            items: {
                handler() {
                    this.frames = this.items.map((item, index) => {
                        console.log('frame map');
                        if (!this.isMounted
                            || !this.$refs.text
                            || !this.$refs.text[index]) return {x: 0, y: 0, width: 0, height: 0};

                        const textSVGRect = this.getBBoxInText(index);
                        return {
                            x: textSVGRect.x - this.framePadding.width / 2,
                            y: textSVGRect.y - this.framePadding.height / 2,
                            width: textSVGRect.width + this.framePadding.width,
                            height: textSVGRect.height + this.framePadding.height,
                        };
                    });

                },
                deep: true,
                immediate: true,
            },
        },
        created() {
            this.items = [
                {
                    text: {
                        x: 15,
                        y: 15,
                        value: 'test',
                    },
                }
            ];
        },
        mounted() {
            this.isMounted = true;
        },
        methods: {
            vw: (width) => width + 'vw',
            vh: (height) => height + 'vh',
            getBBoxInText(index) {
                return this.$refs.text[index].getBBox();
            },
            add() {
                this.items.push(
                    {
                        text: {
                            x: 0,
                            y: 0,
                            value: '',
                        },
                        frame: {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        }
                    }
                );
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