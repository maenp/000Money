<template>
    <div id="beforeList">
        <my-scroll
                class="scrolls"
                ref="myScroll"
                :on-pull="getList1"
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
                            <span>第{{ t.sort }}期</span>
                            {{ t.title }}
                        </div>
                        <div class="contentBox" >
                            <div  v-if="t.nickName">
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
                                    <span>{{ t.nickName}}</span>
                                    <span>幸运号码:{{ t.award_code }}</span>
                                </div>
                            </div>
                            <div v-else>开奖失败，未达到开奖条件！</div>
                        </div>
                    </div>
                </router-link>
            </ul>
        </my-scroll>
    </div>
</template>
<script>
    import myScroll from "./../../common/vue-scroll";
    import {getSpeed} from "./../../api/freePrize";
    import Load from "@/assets/load.gif";

    export default {
        name: "beforeList",
        props: ['config_id','id'],
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
            getList1(){},//本页面后端没有配置下拉加载
            getList() {
              console.log(this.config_id)
                this.$refs.myScroll.setState(1);
                getSpeed({config_id: this.config_id})
                    .then(data => {
                        if (data.data.length > 0 && !this.loaded) {
                            if (this.iPage === 1) {
                                data.data=data.data.filter(t=>{ //筛选列表，去掉无用数据和本期活动
                                    return t.status!=1&&t.id!=this.id
                                })
                                console.log(data.data);
                                this.listData = data.data;
                            } else {
                                // this.listData.push(...data.data);
                            }
                            // this.iPage++;//-------
                            this.$refs.myScroll.setState(3);//------
                        } else {
                            if (this.iPage === 1) {
                                this.czListData = [];
                            }
                            this.loaded = true;
                            this.$refs.myScroll.setState(3);
                        }
                    })
                    .catch(error => {
                        this.$router.push("/error_1");
                    });
            }
        },
        mounted() {
            document.body.style.backgroundColor = '#F1F2F3'
            this.getList();
        },
        components: {
            myScroll
        }
    };
</script>

<style lang="scss" scoped>
    #beforeList {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .scrolls {
            border-radius: 0.1rem;
            width: 100%;
            font-size: 0.2rem;

            ul {
                li {
                    box-sizing: border-box;
                    height: 1.5rem;
                    font-size: 0.2rem;
                    display: flex;
                    padding: 0.16rem;
                    background: #fff;

                    img {
                        height: 1.167rem;
                        width: 1.167rem;
                        margin-right: 0.25rem;
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
                        height: 1.167rem;
                        width: 1.167rem;
                        background: url("../../assets/error.png") no-repeat 50% 50% #f1f1f1;
                        background-size: 70% 34%;
                    }

                    .Prizeinfo {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 4.5rem;

                        .head {
                            color: #333333;
                            font-weight: 900;
                            font-size: 0.216667rem;
                            span{
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
