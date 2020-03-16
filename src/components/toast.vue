<template>
    <div class="toast"  v-if="show"><span>{{content}}</span></div>
</template>

<script>
    export default {
        name: "toast",
        data() {
            return {
                content: '99999',
                show: 0
            }
        },
        methods: {
            toastAction(content, time) {
                let timer, setTime;
                setTime = time || 2;
                this.content = content
                clearTimeout(timer);
                this.show = 1
                timer = setTimeout( ()=> {
                    this.show = 0
                }, setTime * 1000);
            },
        }
    }
</script>

<style scoped>
    .toast {
        width: 100%;
        height: 0.94rem;
        line-height: 0.94rem;
        font-size: 0.36rem;
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        z-index: 9;
    }

    .toast span {
        height: 0.94rem;
        padding: 0 0.5rem;
        display: inline-block;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.1rem;
    }
</style>