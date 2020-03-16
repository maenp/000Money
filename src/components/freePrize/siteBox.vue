<template>
    <div class="msgbox">
        <transition name="fadebg">
            <div class="bg" v-show="show"></div>
        </transition>
        <transition name="fade">
            <div class="container" v-show="show" ref="container">
                <h3>收货地址确认</h3>
                <div class="siteContent">
                    <p>收件人：{{name}}</p>
                    <p>手机号：{{phone}}</p>
                    <p>详细地址：{{site}}</p>
                </div>
                <div class="btnBox">
                    <div class="btn" @touchstart.prevent="amendHandler">我要修改</div>
                    <div class="btn save" @touchstart.prevent="saveHandler">确认保存</div>
                </div>
<!--                <div class="close" @touchstart.prevent="show=0">×</div>-->
            </div>
        </transition>
    </div>
</template>
<script>
    import {setAwardSite} from '@api/freePrize'

    export default {
        data() {
            return {
                show: 0,

                site: 0,
                phone: 0,
                name: 0,
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
                this.site = obj.site
                this.phone = obj.phone
                this.name = obj.name
                this.id = obj.id
            },
            amendHandler() {
                this.show = 0
            },
            saveHandler() {
                /*
                * rc_phone手机，--
                * rc_name姓名，--
                * rc_address地址，--
                * award_id奖品id--
                * */
                setAwardSite({
                    rc_phone:this.phone,
                    rc_name:this.name,
                    rc_address:this.site,
                    award_id:this.id,
                }).then(data => {
                    if(data.code===0){
                        this.show = 0
                        this.$emit('callBackGetList',{
                            rec_phone:this.phone,
                            rec_name:this.name,
                            rec_address:this.site,
                            award_id:this.id,
                        })
                    }
                    console.log(data)
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
    .msgbox {
        z-index: 100;
        position: fixed;
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
        height: max-content;
        border-radius: 0.2rem;
        position: fixed;
        top: -0.667rem;
        bottom: 0;
        margin: auto 0;
        text-align: center;

        h3 {
            font-weight: 100;
            padding-top: .05rem;
            box-sizing: border-box;
            height: 0.6rem;
            width: 2.583rem;
            margin: 0 auto 0.283rem;
            font-size: 0.3rem;
            color: #fff;
            background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/titie_bg.png") no-repeat;
            background-size: cover;
        }

        .siteContent {
            min-height: 2.5rem;
            word-wrap: break-word;
            white-space: normal;
            text-align: left;
            color: #333333;
            font-size: 0.167rem;
            line-height: .3rem;
            p {
                margin-bottom: 0.167rem;
            }
            p:nth-of-type(3){
                padding-bottom: 0.5rem;
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

    .btnBox {
        bottom: 0.167rem;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 3.833rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .save {
            background-color: #FE3104;
            color: #fff;
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 1.667rem;
        height: .5rem;
        border-radius: 0.05rem;
        border: #FE3104 solid 1px;
        font-size: 0.233rem;
        color: #FE3104;
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
