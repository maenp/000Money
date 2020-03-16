<template>
    <div class="msgbox">
        <transition name="fadebg">
            <div class="bg" v-show="show"></div>
        </transition>
        <transition name="fade">
            <div class="container" v-show="show" ref="container">
                <h3>计算详情</h3>
                <div class="compute">
                    <p>─── 计算公式 ───</p>
                    <h4>中奖码=10000001+（数值A/数值B）的余数</h4>
                </div>
                <ul class="result">
                    <li>
                        数值A<br>
                        =截止本期开奖前最后50条参与时间记录数值和
                        =<span>{{num_a}}</span>
                    </li>
                    <li>
                        数值B<br>
                        =本期抽奖号码总数<br/>
                        =<span>{{num_b}}</span>
                    </li>
                    <li class="computed">
                        计算结果
                        <p>{{luckNum}}</p>
                    </li>
                </ul>
                <div class="btnBox">
                    <div @touchstart.prevent="show = 0" class="btn">我知道了</div>
                </div>
<!--                <div class="close" @touchstart.prevent="show=0">×</div>-->
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: 0,
                num_a:1,
                num_b:1,
                luckNum: 10000000001
            };
        },
        watch: {
            show(newVal, oldVal) {
                if (newVal) {
                    this.stopBodyScroll(1);
                } else {
                    this.stopBodyScroll(0);
                }
            }
        },
        mounted() {

        },
        methods: {
            stopBodyScroll(isFixed) {
                //弹出遮罩层,禁止蒙层底部页面跟随滚动
                let bodyEl = document.body;
                if (isFixed) {
                    //弹层打开
                    this.top1 = window.scrollY;
                    // console.log(this.top1)
                    bodyEl.style.position = "fixed";
                    bodyEl.style.top = -this.top1 + "px";
                    // console.log(this.$refs.container)
                } else {
                    //弹层关闭
                    bodyEl.style.position = "";
                    bodyEl.style.top = "";
                    window.scrollTo(0, this.top1); // 回到原先的top
                }
            },
            showHandler(obj) {
                this.show = 1
                this.num_a=obj.num_a
                this.num_b=obj.num_b
                this.luckNum=obj.luckNum

            },
            amendHandler() {
                this.show = 0
            },
            saveHandler() {

            }
        }
    };
</script>
<style lang="scss" scoped>
    .msgbox {
        overflow: hidden;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .bg {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba($color: #000000, $alpha: 0.5);
        }

    }

    .container {
        box-sizing: border-box;
        padding: 0.333rem 0.333rem 0.167rem 0.333rem;
        background: #fff;
        width: 5rem;
        height: 6.667rem;
        border-radius: 0.2rem;
        position: fixed;
        top: -0.667rem;
        bottom: 0;
        margin: auto 0;
        text-align: center;

        h3 {
            font-weight: 100;
            padding-top: .06rem;
            box-sizing: border-box;
            height: 0.767rem;
            width: 3rem;
            margin: 0 auto 0.25rem;
            font-size: 0.3rem;
            color: #fff;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/titie_bg.png") no-repeat;
            background-size: contain;
        }

        .compute {
            font-size: 0.167rem;
            box-sizing: border-box;
            padding: 0.2rem 0.25rem 0.267rem;
            height: 1.5rem;
            width: 100%;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/detail_bg.png") no-repeat;
            background-size: cover;
            color: #fff;
            border-radius: .08rem;

            h4 {
                margin-top: 0.183rem;
                font-weight: 100;
                font-size: 0.233rem;
                line-height: 0.3rem;
            }
        }

        .result {
            margin-top: 0.3rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-size: 0.167rem;
            color: #333;
            li::before {
                position: absolute;
                left: 0;
                content: '';
                display: inline-block;
                height: 0.267rem;
                width: 0.05rem;
                border-radius: 0 .2rem .2rem 0;
                background-color: #FFC852;
            }

            li {
                text-align: left;
                position: relative;
                padding-left: .2rem;
                margin-bottom: .25rem;
                span{
                    color: #E4C5B0;
                }

            }
            .computed{
                display: flex;
                align-items: center;
                p{
                    box-sizing: border-box;
                    background-color: #F1F2F3;
                    height: 0.333rem;
                    width: 2.167rem;
                    text-align: center;
                    line-height:1;
                    padding: .1rem;
                    border-radius: .05rem;
                    margin-left: .2rem;
                }

            }
        }

        .close {
            color: #716F72;
            text-align: center;
            line-height: 0.33rem;
            font-size: .5rem;
            position: absolute;
            bottom: -0.6rem;
            left: 50%;
            transform: translateX(-50%);
            height: 0.367rem;
            width: 0.367rem;
            border-radius: 50%;
            background-color: #fff;
        }

    }


    .btn {
        width: 4rem;
        height: 0.533rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.1rem;
        bottom: .1667rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.233rem;
        color: #fff;
        background: #FE3104;
    }


    .fadebg-enter-active {
        transition: all 0.3s;
    }

    /* .fadebg-leave-active{
      transition:all .3s
    } */

    .fade-enter-active {
        animation: fade 0.3s ease;
    }

    /* .fade-leave-active {
      animation: fade1 0.3s ease;
    } */
    @keyframes fade {
        0% {
            transform: scale(0.05);
        }
        80% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fade1 {
        0% {
            transform: scale(1);
        }
        80% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(0.05);
        }
    }
</style>
