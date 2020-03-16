<template>
    <div id="rule">
        <transition name="fade_bg">
            <div class="bg" v-show="show"></div>
        </transition>
        <transition name="fade">
            <div class="container" v-show="show">
                <h3>活动说明</h3>
                <div class="contentBox">
                    <ul class="content">
                        <li class="title">
                            登录易购APP，打开“幸运0元抽”即可参与任意商品的抽奖，等待奖品参与人数满后，即可开奖。
                        </li>
                        <li :key="i" class="title_1" v-for="(t, i) in list">
                            {{ t.name }}
                            <ul>
                                <li :key="i1" class="title_2" v-for="(t1, i1) in t.list">{{ t1 }}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="shadow"></div>
                <div @touchstart.prevent="show = 0" class="btn">我知道了</div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState({
                count: state => state.freePrize.count,
            })
        },
        data() {
            return {
                list: [
                    {
                        name: "1.如何参与",
                        list: [
                            "• 选择喜欢的奖品，点击免费抽奖",
                            "• 观看视频，获得抽奖码",
                            "• 参与人数满，即时开奖"
                        ]
                    },
                    {
                        name: "2.抽奖码说明",
                        list: [
                            "• 每个用户初始有5次获得抽奖码的机会，消耗完后，每隔4小时会再次获得",
                            "• 每期奖品，在未开奖前，每天都可以获得的固定次数的抽奖码",
                            "• 每期奖品，抽奖码越多，中奖概率越大",
                        ]
                    },
                    {
                        name: "3.中奖计算规则",
                        list: [
                            "• 中奖码=10000001+（数值A/数值B）的余数",
                            "• 数值A=本期最后50个号码的时间数值（每个时间按时、分、秒、毫秒组合成9位数）进行求和得出数值。举例，最后号码发放时间为，23:23:46.389，则该号码的时间数值为：232346389",
                            "• 数值B=本期发放的号码总个数"
                        ]
                    },
                    {
                        name: "4.奖品发放",
                        list: [
                            "• 易豆奖励，开奖后，直接发放",
                            "• 实物奖励，中奖后，用户需要在有效期内在“个人记录-中奖记录”中填写发货地址，审核通过后，商品将通过快递的方式送到您的手中。可在中奖记录查看物流单号，部分商品偏远地区不支持发放。",
                            "• 奖品有效期：中奖后，从中奖时间算起7天有效。请在有效期内及时提交收货地址，超时未提交，按自动放弃奖励处理，不再发放。"
                        ]
                    },
                    {
                        name: "5.本活动与苹果公司无关。",
                        list: []
                    },
                    {
                        name:
                            "6.对于非正常获取奖励的用户，平台有权取消其活动资格并回收相应奖励。",
                        list: []
                    },
                    {
                        name: "7.活动解释权归易购APP所有。",
                        list: []
                    }
                ],
                show: 0
            };
        },
        mounted(){
          this.setListCountHandler()
        },
        watch: {
            show(newVal, oldVal) {
                if (newVal) {
                    this.stopBodyScroll(1)
                } else {
                    this.stopBodyScroll(0)

                }
            }
        },
        methods: {
            stopBodyScroll(isFixed) {//弹出遮罩层,禁止蒙层底部页面跟随滚动
                let bodyEl = document.body
                if (isFixed) {//弹层打开
                    this.top1 = window.scrollY
                    bodyEl.style.position = 'fixed'
                    bodyEl.style.top = -this.top1 + 'px'
                } else {//弹层关闭
                    bodyEl.style.position = ''
                    bodyEl.style.top = ''
                    window.scrollTo(0, this.top1) // 回到原先的top
                }
            },
            setListCountHandler() {//更改列表中抽奖次数
                this.list[1].list.splice(0, 1, `• 每个用户初始有${this.count}次获得抽奖码的机会，消耗完后，每隔4小时会再次获得`)
            }
        }
    };
</script>
<style lang="scss" scoped>
    #rule {
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
        color: #333;
        font-size: .2rem;
        box-sizing: border-box;
        padding: 0.4rem 0.45rem 1rem 0.4rem;
        background: #fff;
        width: 5.25rem;
        border-radius: 0.2rem;
        line-height: 0.3rem;
        position: fixed;
        top: 0;
        bottom: 0;
        margin: auto 0;
        height: 8rem;

        h3 {
            font-weight: 100;
            padding-top: .08rem;
            box-sizing: border-box;
            text-align: center;
            height: 0.617rem;
            width: 2.583rem;
            margin: 0 auto 0.267rem;
            font-size: 0.31rem;
            color: #fff;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/titie_bg.png") no-repeat;
            background-size: cover;
        }

        .contentBox {

            overflow: auto;
            height: 5.7rem;
        }
        .shadow{
            position: absolute;
            width: 4.3rem;
            height: 0;
            z-index: -1;
            background-color: #CDCDCD;
        }
        .content {
            .title {
            }

            .title_1 {
                margin-top: .25rem;
                color: #E1775F;

                ul {
                    .title_2 {
                        color: #333;

                    }
                }
            }
        }

        /* ul {
          font-size: 0.26667rem;
          li {
            margin-bottom: 0.23rem;
          }
        } */
    }

    .btn {
        width: 3.7rem;
        height: 0.6rem;
        display: flex;
        line-height: .67rem;
        justify-content: center;
        /*align-items: center;*/
        border-radius: 0.1rem;
        bottom: 0.3rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.33333rem;
        color: #fff;
        background: #FE3104;
    }

    .fade_bg-enter-active {
        transition: all 0.3s;
    }

    /* .fade_bg-leave-active{
      transition:all .3s
    } */

    .fade-enter-active {
        animation: fade .3s ease;
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
