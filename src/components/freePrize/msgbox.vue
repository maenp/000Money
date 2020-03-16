<template>
    <div class="msgbox">
        <transition name="fadebg">
            <div class="bg" v-show="show"></div>
        </transition>
        <transition name="fade">
            <div class="container" v-show="show" ref="container">
                <h3>恭喜你</h3>
                <div class="compute">
                    <p>─── 获得一张抽奖码 ───</p>
                    <h4>券码：{{luckCode}}</h4>
                </div>
                <span class="hint">券码越多，中奖机会越大</span>
                <div class="btnBox">
                    <div @touchstart.prevent="onceMoreHandler" class="btn">{{btnIf?'再拿一个':'我知道了'}}</div>
                </div>
                <div class="bottom">剩余次数：<span>{{award_count}}</span></div>
                <div class="close" @touchstart.prevent="show=0">×</div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {mapState, mapMutations,mapActions} from "vuex";

    export default {
        inject:['reload'],
        computed: {
            ...mapState({
                award_count: state => state.freePrize.award_count,
            })
        },
        data() {
            return {
                show: 0,

                luckCode: '',

                btnIf: 1
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
            ...mapMutations({
                getPrizeNumM: "freePrize/getPrizeNumM_2"
            }),
            ...mapActions({
                getPrizeNumA:"freePrize/getPrizeNumA"
            }),
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
            showHandler(obj,id) {
                this.id=id
                this.getPrizeNumM(obj)
                this.luckCode = obj.award_code
                this.show = 1
                if (obj.award_count === '0/5') {//最后一张机会 关闭入口  刷新机会
                    this.btnIf = 0
                    this.getPrizeNumA()
                } else{
                    this.btnIf = 1
                }

                if(obj.isEnd){//活动结束，关闭抽奖入口  并且点击我知道了刷新页面
                    this.isEnd=1
                    this.btnIf = 0
                    console.log(this.isEnd)
                }
            },
            onceMoreHandler(){
                console.log(this.isEnd)
                if(this.isEnd){
                    this.reload()
                }else if(this.btnIf){//再抽一次
                    this.$emit('onceMoreHandler',this.id)
                }
                this.show = 0
            }
        }
    };
</script>
<style lang="scss" scoped>
    .msgbox {
        /*overflow: hidden;*/
        position: fixed;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;

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
        height: 4.7rem;
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
            margin: 0 auto 0.283rem;
            font-size: 0.3rem;
            color: #fff;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/titie_bg.png") no-repeat;
            background-size: contain;
        }

        .compute {
            font-size: 0.167rem;
            box-sizing: border-box;
            padding: 0.283rem;
            height: 1.5rem;
            width: 100%;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/detail_bg.png") no-repeat;
            background-size: cover;
            color: #fff;
            border-radius: .08rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            h4 {
                font-weight: 100;
                font-size: 0.21rem;
                line-height: 0.3rem;
            }
        }

        .hint {
            display: block;
            color: #555;
            margin-top: .2rem;
        }

        .close {
            color: #999;
            text-align: center;
            line-height: 0.4rem;
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

        .bottom {
            color: #555555;
            position: absolute;
            bottom: .1rem;
            font-size: 0.133rem;
            left: 50%;
            transform: translateX(-50%);
            span{
                color: #FE3104;
            }
        }

    }


    .btn {
        width: 4rem;
        height: 0.533rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.1rem;
        bottom: 0.45rem;
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
