<template>
    <div class="details">
        <Carousel :second_img="second_img"/>
        <div class="content">
            <p class="title">
                <span>{{status===1?'进行中':'已结束'}}</span>
                <span>{{title}}</span
                >
            </p>


            <div class="strandBg">

                <div class="strandBox" :style="status===1?'background:#F8F8F8;color:#333':''">
                    <div class="prizeIng">
                        <span class="period">第{{sort}}期</span>
                        <div v-if="status===1">
                            <p class="strand">
                          <span
                                  class="strandC"
                                  :style="'width:' + ((award_count-remain_count) / award_count) * 100 + '%'"
                          ></span>
                            </p>
                            <p class="numNext">
                                <span>已参与{{award_count-remain_count}}次</span>
                                <span style="color: #FE3104">仅剩{{remain_count}}次</span>
                            </p>
                        </div>
                        <div class="face" v-else>
<!--                            中奖-->
                            <div v-if="isPrize">
                            <img  src="http://egouimg1.qutu.com/m_egou/hd/2020/freePrize/happy.png" alt=""/>
                                <span>恭喜你，中奖了~</span>
                            </div>
<!--                            未中奖-->
                            <div v-else-if="userCodes.length&&awardPhone">
                                <img src="http://egouimg1.qutu.com/m_egou/hd/2020/freePrize/cry.png" alt=""/>
                                <span>很遗憾，您没有中奖~</span>
                            </div>
<!--                            开奖失败-->
                            <div v-else-if="(status===3||status===4||_status)&&!awardPhone">
                                <img src="http://egouimg1.qutu.com/m_egou/hd/2020/freePrize/grimace.png" alt=""/>
                                <span>开奖失败，未达到开奖条件~</span>
                            </div>
<!--                            未参与-->
                            <div v-else>
                                <img src="http://egouimg1.qutu.com/m_egou/hd/2020/freePrize/pity.png" alt=""/>
                                <span>很遗憾，您未参加~</span>
                            </div>

                        </div>
                    </div>
                    <div class="mineCode" v-if="userCodes.length" :style="status===1?'border:none':''">
                        <span>我的抽奖码：</span>
                        <div class="mineCodeBox" :style="userCodes.length>6?'overflow-y:scroll':''">
                            <ul>
                                <li v-for="(t,i) in userCodes" :key="i" :style="status===1?'background: #f1f2f3;border:none;box-shadow:none':''">{{t}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="prizeName" v-if="awardPhone&&userCodes.length">
                        <svg t="1583151108402" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="3309" width="200" height="200">
                            <path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64zM384.8 376c4-64 56-115.2 120-119.2 74.4-4 135.2 55.2 135.2 128 0 70.4-57.6 128-128 128-73.6 0-132-62.4-127.2-136.8zM768 746.4c0 12-9.6 21.6-21.6 21.6H278.4c-12 0-21.6-9.6-21.6-21.6v-64c0-84.8 170.4-128 255.2-128 84.8 0 255.2 42.4 255.2 128l0.8 64z"
                                  p-id="3310" fill="#dbdbdb"></path>
                        </svg>
                        <span class="user">{{awardPhone}}</span>
                        <span class="luckCode">幸运号码：{{award_code}}</span>
                        <span class="infoBtn" @touchstart="showComputeHandler">计算详情</span>
                    </div>
                </div>
            </div>


            <router-link v-if="!(newAwardId==id&&sort===1)" class="before" :to="{name:'before',params:{config_id:this.config_id,id:this.id}}" tag="p">
                <span class="head">往期揭晓</span>
                <span class="right_btn">›</span>
            </router-link>
            <p class="record">
        <span>
          <span class="head">参与记录</span>
          <span>最近50条</span>
        </span>
                <span v-if="startTime">{{startTime|timestampToTime}} 开始</span>
            </p>
            <div class="recordList">
                <ul ref="recordList">
                    <li v-for="(t,i) in recordList" :key="i">
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
                        <div>
                            <p>
                                <span>{{t.nickName}}</span>
                                <span>{{t.source_ip}}</span>
                            </p>
                            <p>
                                <span>{{t.join_time|timestampToTime}}</span>
                                <span>参与1人次</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="record_btn_box" v-show="goodsDetail">
                    <div class="record_btn" @touchstart="openRecordHandler($event)">查看详情</div>
                </div>
            </div>
            <div class="goodsDetail" v-if="img_detail.length">
                <span class="head">商品详情</span>
            </div>
            <div class="goodsDetailList">
                <ul>
                    <li v-for="(t,i) in img_detail" :key="i">
                        <img alt="" :src="t"/>
                    </li>
                </ul>
            </div>

        </div>
        <div class="bottom">
            <p class="sum">
                {{status===1?'价值':status===2?'该奖品新一期正在进行中':'该奖品已下架，去看看其他'}}
                <span v-show="status===1&&award_type">￥{{award_value}}</span>
                <span v-show="status===1&&!award_type">{{award_value}}易豆</span>
            </p>
            <div class="btn" :style="status===1?'':status===2?'width:1.667rem':'width:1.533rem'" @touchstart="bottomBtnHandler">
                {{status===1?'0 元 抽':status===2?'去参与':'更多奖品'}}
                <svg v-show="status===1" t="1582884584277" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2326" width="200" height="200">
                    <path d="M113.777778 1024 113.777778 0 910.222222 512 113.777778 1024Z" p-id="2327"
                          fill="#FCE294"></path>
                </svg>
            </div>
        </div>
        <ComputeBOX ref="ComputeBOX"/>
        <GoPrize ref="GoPrize" @addCodeHandler="getInfo"/>
    </div>
</template>
<script>
    import GoPrize from "@components/freePrize/goPrize";
    import Carousel from "@components/freePrize/carousel";
    import ComputeBOX from "@components/freePrize/computeInfoBox";
    import {getPrizeDetail,getComputeInfo,setPrize} from "@api/freePrize"
    import {mapActions} from "_vuex@3.1.2@vuex";
    export default {
        props: ["id"],
        inject:['reload'],
        components: {
            Carousel, ComputeBOX,GoPrize
        },
        watch:{
            id(){
                this.reload()
            }
        },
        data() {
            return {
                status: 1,//0:未发布，1:进行中，2：活动正常结束，3：活动未结束下架,4:活动参加人数不够到期
                title: '',
                second_img: [],//奖品图片
                userCodes: [],//我的抽奖码
                award_count: 1000,//总数
                remain_count: 500,//已参与
                recordList: [],//参与记录
                startTime:'2020 01-01',//记录开始时间
                award_value:100,//记录开始时间
                award_type:1,//奖励类型 1人民币 0易豆
                newAwardId:1,//最新一期活动的id
                awardPhone:'',//获奖人手机号
                sort:1,//第几期
                isProgress:1,
                _status:0,
                img_detail:[],


                isPrize:0,//是否中奖
                config_id:0,
                award_code:'1000000001',
                openFlag: false,
                goodsDetail: true,
            };
        },
        methods: {
            ...mapActions({
                getPrizeNumA:"freePrize/getPrizeNumA"
            }),
            bottomBtnHandler(){
                if(this.status===1){//抽奖
                    this.$refs.GoPrize.goPrizeHandler(this.id,this.rem,this.day)
                }else if(this.status===2){//去最新一期
                    this.$router.push('/details/'+this.newAwardId)
                }else{//去首页
                    this.$router.push('/')
                }
            },
            getComputeInfo(){//获取计算详情
                console.log(666)
                getComputeInfo({award_id:this.id}).then(({data})=>{
                    this.all_code=data.all_code //数值A
                    this.code_count=data.code_count //数值B
                    this.award_code=data.award_code //幸运号码
                })
            },
            getInfo() {
                getPrizeDetail({award_id: this.id}).then(data => {
                    console.log(data)
                    if (data.code === 0) {
                        let awardInfo = data.data.awardInfo
                        this.status = awardInfo.status // 0:未发布，1:进行中，2：活动结束下架，3：活动未结束下架,4:活动参加人数不够到期
                        this.title = awardInfo.title
                        this.userCodes = awardInfo.userCodes
                        this.award_count = awardInfo.award_count
                        this.remain_count = awardInfo.remain_count
                        this.award_value = awardInfo.award_value
                        this.award_type = awardInfo.award_type
                        this.award_code = awardInfo.award_code
                        this.newAwardId = awardInfo.newAwardId
                        this.awardPhone = awardInfo.awardPhone
                        this.sort = awardInfo.sort
                        this.isProgress = awardInfo.isProgress

                        if(!awardInfo.isProgress){ //最新一期活动是否上架 1上架 0下架
                            this.status = 3   //最新一期下架则所有往期都应做下架处理
                        }else if(this.status!=1){//下架的未开奖活动重新上架时
                            this.status = 2
                            this._status = 1
                        }
                        console.log(this.awardPhone)
                        this.rem = awardInfo.rem_count;//当天该活动抽奖次数
                        this.day = awardInfo.day_count;//一天该活动最多参与次数



                        this.isPrize=awardInfo.userCodes.some(t=>{ //遍历我的中奖码，判断我是否中奖
                            return t===awardInfo.award_code
                        })


                        this.recordList=data.data.joinInfo
                        this.startTime=this.recordList.length&&this.recordList[0].join_time
                        this.openListHandler()
                        this.config_id=awardInfo.config_id
                        this.second_img = awardInfo.second_img.split(',')
                        if(awardInfo.img_detail)this.img_detail = awardInfo.img_detail.split(',')


                        if(this.userCodes.length&&this.awardPhone)this.getComputeInfo()
                    }
                }).catch(err=> {
                    console.log(err)
                })
            },
            showComputeHandler() {
                this.$refs.ComputeBOX.showHandler({
                    num_a:this.all_code,
                    num_b:this.code_count,
                    luckNum:this.award_code
                })
            },
            openRecordHandler(e) {
                if (this.openFlag) {
                    e.target.innerText = "查看详情"
                    this.openListHandler()
                } else {
                    this.$refs.recordList.style.height = this.recordList.length * .73333 + 'rem'
                    e.target.innerText = "点击合并"
                }
                this.openFlag = !this.openFlag
                console.log(this.$refs.recordList.style.height)

            },
            openListHandler() {
                if (this.recordList.length > 3) {
                    this.goodsDetail = true

                    this.$refs.recordList.style.height = '2.2rem'
                } else {
                    this.goodsDetail = false

                    this.$refs.recordList.style.height = this.recordList.length * .73333 + 'rem'
                }

            }
        },

        updated() {
            if (this.recordList.length > 3) {
                this.$refs.recordList.style.height = '2.2rem'
            } else {
                this.$refs.recordList.style.height = this.recordList.length * .73333 + 'rem'
            }
        },
        mounted() {
            document.body.style.backgroundColor='#F1F2F3'
            document.body.scrollTop = 0;
            document.documentElement.scrollTop=0
            this.getInfo()
            this.getPrizeNumA()
        }
    };
</script>
<style lang="scss" scoped>
    .details {
        position: absolute;
        width: 100%;

        .content {
            width: 100%;

            .title {
                /*display: flex;*/
                /*align-items: center;*/
                box-sizing: border-box;
                min-height: 0.6rem;
                width: 100%;
                padding: 0.133rem 0.167rem;
                background-color: #fff;
                overflow: hidden;

                span:nth-of-type(1) {
                    position: absolute;
                    background: linear-gradient(#fd571d, #fe3104);
                    width: 0.75rem;
                    height: 0.32rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ffffff;
                    border-radius: 0.03rem;
                    margin-right: 0.1rem;
                    font-size: 0.16667rem;
                }

                span:nth-of-type(2) {
                    text-indent: 0.9rem;
                    float: left;
                    color: #333333;
                    font-weight: 900;
                    font-size: 0.25rem;
                }
            }

            .strandBg {
                font-size: 0.2rem;
                padding: 0 .167rem .166rem;
                background-color: #fff;

                .strandBox {
                    background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/detail_bg.png");
                    background-size: cover;
                    border-radius: 0.1rem;
                    box-sizing: border-box;
                    padding: 0.15rem 0.2rem 0;
                    color: #f1f1f1;
                    position: relative;
                    width: 100%;


                    .prizeIng {
                        height: 1.333rem;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        padding-bottom: .2rem;
                        box-sizing: border-box;

                        .face {
                            font-size: 0.217rem;
                            margin-bottom: .25rem;
                            div{
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            }
                            img {
                                margin-right: .25rem;
                                height: 0.45rem;
                                width: .45rem;
                            }
                        }

                        .period {
                            font-size: 0.2rem;
                            font-weight: 900;
                        }

                        .period:before {
                            position: absolute;
                            top: 0.15rem;
                            left: 0;
                            content: '';
                            display: inline-block;
                            height: 0.267rem;
                            width: 0.05rem;
                            border-radius: 0 .2rem .2rem 0;
                            background-color: #FFC852;
                        }

                        .strand {
                            margin-bottom: 0.033rem;
                            height: 0.133rem;
                            width: 100%;
                            border-radius: 0.15rem;
                            overflow: hidden;
                            background-color: #F1F2F3;

                            .strandC {
                                background-color: #FFC852;
                                border-radius: 0.15rem;
                                display: block;
                                height: 0.133rem;
                                width: 80%;
                            }
                        }
                    }


                    .numNext {

                        font-size: 0.167rem;
                        display: flex;
                        justify-content: space-between;

                        span:nth-of-type(2) {

                        }
                    }
                }

                .mineCode {
                    position: relative;
                    border-top: 1px #FBA46C dashed;

                    padding: 0.175rem 0;
                    height: 1.05rem;
                    box-sizing: border-box;
                    display: flex;
                    /*justify-content: space-between;*/
                    span {
                        display: block;
                        float: left;
                    }

                    .mineCodeBox {
                        flex: 1;
                        position: absolute;
                        height: .8rem;
                        top: .1837rem;
                        right: 0;
                            padding-right: .05rem;

                        ul {
                            padding-bottom: .1rem;
                            width: 4.3rem;
                            /*flex: 1;*/
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            margin-top: -.167rem;

                            li {
                                box-shadow: 0.033rem 0.033rem 0.05rem #F7E5E5 inset;
                                border: #FBA46C 1px solid;
                                box-sizing: border-box;
                                margin: 0.167rem 0.15rem 0 0;
                                width: 1.333rem;
                                height: 0.275rem;
                                border-radius: .135rem;
                                display: flex;
                                justify-content: center;

                                line-height: .2677rem;
                                /*align-items: center;*/
                            }

                            li:nth-of-type(3n) {
                                margin-right: 0;
                            }
                        }
                    }

                    /*背景*/
                    .mineCodeBox::-webkit-scrollbar-track-piece {
                        width: 0.167rem;
                        background-color: #fff;
                        border-radius: 0.083rem;
                        border: 1px solid #fff;
                        /*box-shadow: 1px 1px 1px #D6431B;*/
                    }

                    .mineCodeBox::-webkit-scrollbar {
                        overflow: hidden;
                        width: 0.08rem;
                        height: 0.17rem;
                        border-radius: 0.1rem;
                    }

                    /*滚动条*/
                    .mineCodeBox::-webkit-scrollbar-thumb {
                        background-color: #F56C49;
                        background-clip: padding-box;
                        border-radius: 0.083rem;
                        min-height: 0.2rem;
                    }

                    /*.mineCodeBox::-webkit-scrollbar-thumb:hover {*/
                    /*    width: 0.7rem;*/
                    /*    background-color: #000;*/
                    /*    border-radius: 5px;*/

                    /*}*/
                }

                .prizeName {
                    border-top: 1px #FBA46C dashed;
                    font-size: 0.167rem;
                    height: 0.667rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .icon {
                        margin-left: .15rem;
                        margin-right: -.15rem;
                        height: 0.4rem;
                        width: 0.4rem;
                        color: #fff;
                    }

                    .infoBtn {
                        cursor:pointer;
                        height: 0.267rem;
                        width: 0.833rem;
                        background-color: #FFC852;
                        border-radius: .05rem;
                        text-align: center;
                    }
                }
            }

            .head {
                font-weight: 900;
                font-size: 0.23rem;
            }

            .before {
                display: flex;
                background-color: #fff;
                justify-content: space-between;
                align-items: center;
                height: 0.6rem;
                border-top: 0.083rem solid #F8F8F8;
                border-bottom: 0.083rem solid #F8F8F8;
                padding: 0 0.167rem;

                .right_btn {
                    font-size: .45rem;
                }
            }

            .record {
                background-color: #fff;
                font-size: 0.167rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #F8F8F8;
                padding: 0 0.167rem;
                height: 0.6rem;

                span:nth-of-type(2) {
                    display: inline-block;
                    margin-left: .25rem;
                }
            }

            .recordList {
                position: relative;
                color: #333333;
                font-size: 0.15rem;
                border-bottom: 0.083rem solid #F1F2F3;
                background-color: #fff;

                ul {
                    overflow: hidden;
                    padding: 0 0.167rem;
                    transition: height .5s;

                    li {
                        height: 0.733rem;
                        display: flex;
                        align-items: center;

                        .icon {
                            height: 0.417rem;
                            width: 0.417rem;
                        }

                        div {
                            height: 0.5rem;
                            width: 100%;
                            margin-left: 0.167rem;
                            display: flex;
                            align-content: space-between;
                            justify-content: space-between;

                            p {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;

                                span {
                                    display: block;
                                }
                            }

                            p:nth-of-type(2) {
                                align-items: flex-end;
                            }
                        }

                    }
                }

                .record_btn_box {
                    height: 0.733rem;

                    .record_btn {
                        position: absolute;
                        left: 50%;
                        transform: scale(1.05) translateZ(0) translateX(-50%);
                        bottom: 0.2rem;
                        height: 0.333rem;
                        width: 1rem;
                        border-radius: .17rem;
                        border: 1px solid #999;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #555555;
                        font-size: 0.167rem;
                    }
                }
            }

            .goodsDetail {
                background-color: #fff;
                height: 0.6rem;
                padding: 0 0.167rem;
                display: flex;
                align-items: center;
            }
            .goodsDetailList{
                border-bottom: .8rem solid #F1F2F3;
                ul{

                        display: flex;
                        justify-content: center;
                    flex-wrap: wrap;
                    li{
                        width: 100%;
                        border-bottom: .1rem solid #F1F2F3;
                        background-color: #F1F2F3;

                        img{
                            margin: 0 auto;
                            display: block;
                            width:100%;
                            height: auto;
                            vertical-align: top;
                        }
                    }
                }
            }
        }

        .bottom {
            border-top: 1px solid #F8F8F8;
            background-color: #fff;
            box-sizing: border-box;
            height: 0.733rem;
            width: 100%;
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .167rem;
            color: #333333;

            .sum {
                span {
                    font-size: 0.2rem;
                }
            }

            .btn {
                color: #FCE294;
                font-weight: 900;
                height: 0.49rem;
                width: 3.667rem;
                background: linear-gradient(#FF5D01, #FE3104);

                border-radius: .5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0.033rem 0.083rem 0.083rem #FFCCB5;

                .icon {
                    margin: .02rem 0 0 .1rem;
                    height: 0.217rem;
                    width: 0.217rem;
                    border-radius: .2rem;
                }

            }
        }
    }
</style>
