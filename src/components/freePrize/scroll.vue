<template>
    <div id="scroll" ref="scroll">
        <ul ref="ul">
            <li v-for="(t, i) in list" :key="i">{{ t.text }}</li>
        </ul>
    </div>
</template>
<script>
    import {getScrollList} from '@api/freePrize'

    export default {
        data() {
            return {
                list: [],
                interval: null
            };
        },
        mounted() {
            if (!this.list.length) this.getList();
        },
        methods: {
            async getList() {
                let data = await getScrollList()
                this.list = data.data
                this.lang();
            },
            lang() {
                this.interval = setInterval(_ => {
                    if (!this.$refs.ul) {
                        this.stop()
                        return
                    }
                    this.$refs.ul.style.left = this.$refs.ul.offsetLeft - 1 + 'px'
                    // console.log(this.$refs.ul.offsetLeft*-1,this.$refs.ul.offsetWidth)
                    if (this.$refs.ul.offsetLeft * -1 > this.$refs.ul.offsetWidth) {
                        // console.log(this.$refs.scroll.offsetWidth)
                        this.$refs.ul.style.left = this.$refs.scroll.offsetWidth + 'px'
                    }
                }, 15)
            },
            stop: function () {
                //停止定时器
                clearInterval(this.interval);
            }
        }
    };
</script>
<style lang="scss" scoped>
    #scroll {
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 3.8rem;
        height: .35rem;

    }

    ul {
        position: absolute;
        display: flex;
        width: max-content;
        left: 10px;
        li {
            max-width: 3.7rem;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: .35rem;
            background: rgba(135, 58, 30, .8);
            margin-left: .3rem;
            border-radius: .2rem;
            font-size: .16667rem;
            padding: 0 .2rem;
            display: inline-block;
            line-height: .42rem;
            /*display: flex;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            color: #FFFFFF;
        }
    }
</style>
