<template>
    <div id="list">
        <myScroll
                class="scrolls"
                ref="myScroll"
                :on-pull="pullGetList"
                :loaded="loaded"
                :scroll-state="scrollState"
        >
            <ul slot="scrollList">
                <router-link
                        tag="li"
                        :to="{ name: 'details', params: { id: t.id } }"
                        v-for="(t, i) in listData"
                        :key="t.id"
                >
                    <img :src="t.main_img" alt="" class="avatar"/>
                    <div class="Prizeinfo">
                        <div class="head">
                            <span>第{{ t.Phase }}期</span>{{ t.title }}
<!--                            <span>{{ t.title }}</span>-->
                        </div>
                        <div class="contentBox">
                            <div class="content">
                                <p v-if="t.remain_count">剩余{{ t.remain_count }}人次开奖</p>
                                <p v-else>已开奖</p>
                                <p class="strand">
                  <span
                          class="strandC"
                          :style="'width:' + ((t.award_count-t.remain_count) / t.award_count) * 100 + '%'"
                  ></span>
                                </p>
                                <p :ref="'prizeCodeCount_'+t.id">已获得<span style="color: #FE3104">{{ t.prizeCodeCount }}</span>个抽奖码</p>
                            </div>
                            <div
                                    class="btn"
                                    @touchstart.prevent="goPrizeHandler(t.id,t.rem_count,t.day_count)"
                            ></div>
                        </div>
                    </div>
                </router-link>
            </ul>
        </myScroll>
        <GoPrize ref="GoPrize" @addCodeHandler="addCodeHandler"/>
    </div>
</template>
<script>
    import myScroll from "@common/vue-scroll";
    import {getHomeNowList,setPrize} from "@api/freePrize";
    import GoPrize from "@components/freePrize/goPrize";//点击抽奖插件

    export default {
        name: "listNow",
        data() {
            return {
                scrollState: true, // 是否可以滑动
                loaded: false,
                iPage: 1,
                listData: [],
                iPageSize: 10
            };
        },
        methods: {
            getList() {
                getHomeNowList({status: 1, page_no: this.iPage})
                    .then(({data}) => {
                        console.log(data)
                        if(data.data.length===0){
                            this.$router.push({path: "/freePrize/now/error_1"});
                        }else if (data.data.length > 0 && !this.loaded) {
                            if (this.iPage === 1) {
                                this.listData = data.data;
                            } else {
                                this.listData.push(...data.data);
                            }
                            this.iPage++;
                            if (data.pageInfo.lastPage) {
                                this.$refs.myScroll.setState(3);
                            } else {
                                this.$refs.myScroll.setState(2);
                            }
                        } else {
                            if (this.iPage === 1) {
                                this.czListData = [];
                            }
                            this.loaded = true;
                            this.$refs.myScroll.setState(3);
                        }
                    })
                    .catch(error => {
                        this.$router.push({path: "/freePrize/now/error_1"});
                    });
            },
            pullGetList(){//上拉继续加载
                this.$refs.myScroll.setState(1);
                this.getList()
            },
            goPrizeHandler(id,rem,day) {
                this.$refs.GoPrize.goPrizeHandler(id,rem,day)
            },
            addCodeHandler(obj){
                console.log(obj)
                this.listData=this.listData.map(t=>{//抽奖成功 抽奖码个数自增1
                    if(t.id===obj.id){
                        t.prizeCodeCount++
                        t.remain_count--
                            t.rem_count--
                    }
                    return t
                })
                // let num=Number(this.$refs['prizeCodeCount_'+id][0].innerText.replace(/[^0-9]/ig,""))+1
                // this.$refs['prizeCodeCount_'+id][0].innerText=`已获得${num}个抽奖码`
            }
        },
        mounted() {
            this.pullGetList();
        },
        components: {
            myScroll,GoPrize
            // MsgBox,
            // HintBox
        }
    };
</script>

<style lang="scss" scoped>
    #list {
        position: absolute;
        top: 5.1rem;
        padding-bottom: 0.7rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .scrolls {
            border-radius: 0.1rem;
            width: 5.91667rem;
            font-size: 0.2rem;

            ul {
                li {
                    box-sizing: border-box;
                    height: 2.1667rem;
                    margin-bottom: 0.1rem;
                    border: 1px solid #dedede;
                    border-radius: 0.1rem;
                    font-size: 12px;
                    display: flex;
                    padding: 0.16666667rem;
                    background: #fff;

                    img {
                        height: 1.833333rem;
                        width: 1.833333rem;
                        margin-right: 0.1rem;
                    }

                    .avatar {
                        position: relative;
                    }

                    .avatar:after {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        z-index: 2;
                        top: 0;
                        left: 0;
                        height: 1.833333rem;
                        width: 1.833333rem;
                        background: url("../../assets/error.png") no-repeat 50% 50% #f1f1f1;
                        background-size: 70% 34%;
                    }

                    .Prizeinfo {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 3.6rem;

                        .head {
                            color: #333333;
                            font-weight: 900;
                            font-size: 0.216667rem;
                            span {
                                font-weight: 400;
                                float: left;
                                display: inline-block;
                                vertical-align: middle;
                                background: linear-gradient(#fd571d, #fe3104);
                                padding: 0 .1rem;
                                height: 0.266667rem;
                                color: #ffffff;
                                border-radius: 0.03rem;
                                margin-right: 0.1rem;
                                font-size: 0.16667rem;
                            }
                        }

                        .contentBox {
                            font-size: 0.16667rem;
                            color: #333333;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .content {
                                .strand {
                                    height: 0.1333333rem;
                                    width: 2.5rem;
                                    border-radius: 0.07rem;
                                    overflow: hidden;
                                    background-color: #f1f2f3;
                                    margin: 0.1rem 0;

                                    .strandC {
                                        background-color: #ffc852;
                                        border-radius: 0.07rem;
                                        display: block;
                                        height: 0.1333333rem;
                                        width: 80%;
                                    }
                                }
                            }

                            .btn {
                                cursor:pointer;
                                height: 0.75rem;
                                width: 0.75rem;
                                border-radius: 50%;
                                background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/prize_btn.png");
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-size: cover;
                                color: #fff;
                                animation: breathe .7s infinite;

                            }
                            .btn:before{
                                line-height: .24rem;
                                text-align: center;
                                width: 70%;
                                height: 70%;
                                content: '免 费 抽 奖';


                            }
                            @keyframes breathe {
                                0%,100%{
                                    /*opacity: 1;*/
                                    /*color: #fff;*/
                                    transform: scale(.9);
                                }
                                50%{
                                    /*opacity:.7;*/
                                    /*color: yellow;*/
                                    transform: scale(1.1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
