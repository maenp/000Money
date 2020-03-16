<template>
    <div id="list">
        <my-scroll
                class="scrolls"
                ref="myScroll"
                :on-pull="getList"
                :loaded="loaded"
                :scroll-state="scrollState"
        >
            <ul slot="scrollList">
                <router-link
                        tag="li"
                        :to="{ name: 'details', params: { id: t.id } }"
                        v-for="(t, i) in listData"
                        :key="i"
                >
                    <img :src="t.main_img" alt="" class="avatar"/>
                    <div class="Prizeinfo">
                        <div class="head">
                            <span>第{{ t.sort }}期</span>
                            {{ t.title }}
                        </div>
                        <div class="contentBox" v-if="t.status===1">
                            <div class="content">
                                <p>剩余{{ t.remain_count }}人次开奖</p>
                                <p class="strand">
                  <span
                          class="strandC"
                          :style="
                      'width:' + ((t.award_count-t.remain_count) / t.award_count) * 100 + '%'
                    "
                  ></span>
                                </p>
                                <p :ref="'prizeCodeCount_'+t.id">已获得{{ t.prizeCodeCount }}个抽奖码</p>
                            </div>
                            <div
                                    class="btn"
                                    @touchstart.prevent="goPrizeHandler(t.id,t.rem_count,t.day_count)"
                            ></div>
                        </div>
                        <div class="contentBox2" v-else>
                            <div v-if=" t.phone">
                                <svg
                                        t="1582788377484"
                                        class="icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="2373"
                                        width="200"
                                        height="200"
                                >
                                    <path
                                            d="M665.6 656.564706C771.011765 602.352941 843.294118 487.905882 843.294118 361.411765 843.294118 177.694118 695.717647 27.105882 512 27.105882S180.705882 174.682353 180.705882 358.4c0 126.494118 72.282353 243.952941 177.694118 298.164706C183.717647 707.764706 60.235294 852.329412 60.235294 1002.917647h60.235294c0-180.705882 174.682353-301.176471 391.529412-301.176471s391.529412 120.470588 391.529412 301.176471h60.235294c0-150.588235-123.482353-295.152941-298.164706-346.352941zM240.941176 358.4c0-150.588235 120.470588-271.058824 271.058824-271.058824s271.058824 120.470588 271.058824 271.058824-120.470588 271.058824-271.058824 271.058824-271.058824-123.482353-271.058824-271.058824z"
                                            fill="#8a8a8a"
                                            p-id="2374"
                                    ></path>
                                </svg>
                                <div class="name">
                                    <span>{{ t.phone}}</span>
                                    <span>幸运号码:{{ t.award_code }}</span>
                                </div>
                            </div>
                            <div v-else>开奖失败，未达到开奖条件！</div>
                        </div>
                    </div>
                </router-link>
            </ul>
        </my-scroll>
      <GoPrize ref="GoPrize" @addCodeHandler="addCodeHandler"/>
    </div>
</template>
<script>
    import myScroll from "@common/vue-scroll";
    import {getRecordAwardList} from "@api/freePrize";
    import GoPrize from "@components/freePrize/goPrize";
    import {mapActions, mapState} from "_vuex@3.1.2@vuex";


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
        computed:{
            ...mapState({
                lottery_time:state=>state.freePrize.lottery_time,
            })
        },
        methods: {
            ...mapActions({
                getPrizeNumA:"freePrize/getPrizeNumA"
            }),
            addCodeHandler(obj){
                if(obj.isEnd){//活动结束，刷新接口
                    this.iPage=1
                    this.getList()
                    return
                }
                this.listData=this.listData.map(t=>{//抽奖成功 抽奖码个数自增1
                    if(t.id===obj.id){
                        t.prizeCodeCount++
                        t.remain_count--
                        t.rem_count--
                    }
                    return t
                })
            },
            getList() {
                this.$refs.myScroll.setState(1);
                // ajax 请求
                getRecordAwardList({status: 1, page_no: this.iPage})
                    .then(({data}) => {
                        if(data.data.length===0){
                            this.$router.replace({path: "/record/history/error_2"});//奖品为空，跳转引导页面
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
                        this.$router.push("/record/history/error_1?top=1.1rem");
                    });
            },
            goPrizeHandler(id,rem,day) {
                this.$refs.GoPrize.goPrizeHandler(id,rem,day)
            }
        },
        mounted() {
            if(!this.lottery_time) this.getPrizeNumA()
            // this.getList();
        },
        activated(){
            if(this.listData.length===0)this.getList();
        },
        components: {
            myScroll,
            // MsgBox,
            // HintBox,
            GoPrize
        }
    };
</script>

<style lang="scss" scoped>
    #list {
        position: absolute;
        top: .7rem;
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
                                height: 0.666667rem;
                                width: 0.666667rem;
                                border-radius: 50%;
                                background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/prizeNow_btn.png");
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background-size: cover;
                                animation: breathe 1s infinite;
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

                        .contentBox2 {
                            color: #333333;
                            font-size: 0.16666667rem;
                            .icon {
                                height: 0.266667rem;
                                width: 0.266667rem;
                                margin-right: 0.1rem;
                            }
                            div{
                                width: 100%;
                                display: flex;
                                align-items: center;
                            }
                            .name {
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
