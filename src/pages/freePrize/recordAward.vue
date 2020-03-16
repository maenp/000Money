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
                <li v-for="(t, i) in listData" :key="t.id">
                    <router-link class="Prize" :to="{ name: 'details', params: { id: t.id } }" tag="div">
                        <img :src="t.main_img" alt="" class="avatar"/>
                        <div class="Prizeinfo">
                            <div class="head">
                                <span>第{{ t.sort }}期</span>
                                {{ t.title }}
                            </div>
                            <div class="contentBox">
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
                                    <span class="phone">{{ t.phone }}</span>
                                    <span>幸运号码:{{ t.award_code }}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <div class="saveLine" v-if="t.award_type">
                        <!--                        sendStatus 0 未填地址 1已填地址 2已发货-->
                        <span class="header">{{t.sendStatus===0?'请提交收货地址':'收货地址'}}</span>
                        <div class="btn" v-show="t.sendStatus===0" @touchstart="siteSaveHandler(i,t.id)">保存</div>
                    </div>
                    <div class="siteLine" v-if="t.award_type">
                        <label :for="'name' + i">
                            收件人:
                            <input :id="'name' + i" :disabled="t.sendStatus!==0"
                                   :style="t.sendStatus!==0?'border:none':''"
                                   :value="t.rec_name" type="text" :ref="'name_'+i"/>
                        </label>
                        <label :for="'phone' + i">
                            手机号:
                            <input :id="'phone' + i" :disabled="t.sendStatus!==0"
                                   :style="t.sendStatus!==0?'border:none':''"
                                   :value="t.rec_phone" type="text" :ref="'phone'+i"/>
                        </label>
                        <label :for="'site' + i">
                        </label>
                            <span class="siteInfo">详细地址:</span>
                            <textarea oninput="this.style.height='0px';this.style.height=(this.scrollHeight+'px');"

                                      name="" :id="'site' + i" :value="t.rec_address" :disabled="t.sendStatus!==0"
                                      :style="{'border':t.sendStatus!==0?'none':'','height':t.rec_address?(t.rec_address.length/1900*20<.3?.3:t.rec_address.length/1900*20)+'rem':''}" :ref="'site'+i"></textarea>
                    </div>
                    <div class="expressLine">
                        <span class="header">奖励信息</span>
                        <p v-if="t.sendStatus===2">
                            <span>物流公司：{{t.exp_company}}</span>
                            <span>物流单号：{{t.exp_no}}</span>
                            <input class="oddCode" :ref="'oddCode_'+i" type="text" :value="t.exp_no"/>
                            <span class="copyBtn" @click="copyHandler(i)">点击复制</span>
                        </p>
                        <span v-else>{{t.award_type?'预计5个工作日内发货，节假日顺延~':'已发放，发放时间 : '+(t.send_time||'立即到账')}}</span>
                    </div>
                </li>
            </ul>
        </my-scroll>
        <SiteBox ref="SiteBox" @callBackGetList="callBackGetList"/>
        <Toast ref="Toast"/>
    </div>
</template>
<script>
    import myScroll from "./../../common/vue-scroll";
    import {getRecordAwardList} from "@api/freePrize";
    import SiteBox from "@components/freePrize/siteBox";//保存地址
    import Toast from "@components/toast";

    export default {
        name: "listNow",
        data() {
            return {//:
                scrollState: true, // 是否可以滑动
                loaded: false,
                iPage: 1,
                listData: []
            };
        },
        methods: {
            Special(s) {
                let containSpecial = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                return (containSpecial.test(s));
            },
            SpecialName(s) {
                let containSpecial = new RegExp("[`+-.~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                return (containSpecial.test(s));
            },
            siteSaveHandler(i, id) { //传入收货信息
                let name = this.$refs['name_' + i][0].value;
                let phone = this.$refs['phone' + i][0].value;
                let site = this.$refs['site' + i][0].value;

                if (name.trim() === '') {
                    this.$refs.Toast.toastAction('请输入收件人')
                    return
                }
                if (this.SpecialName(name)) {
                    this.$refs.Toast.toastAction('收件人不允许出现特殊符号')
                    return
                }
                // if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name))) {
                //     this.$refs.Toast.toastAction('收件人不允许出现特殊符号')
                //     return
                // }
                if (!(/^1\d{10}$/.test(phone))) {
                    this.$refs.Toast.toastAction('请输入正确手机号')
                    return
                }
                if (site.trim() === '') {
                    this.$refs.Toast.toastAction('请输入详细地址')
                    return
                }
                if (this.Special(site)) {
                    this.$refs.Toast.toastAction('详细地址不允许出现特殊符号')
                    return
                }
                this.$refs.SiteBox.showHandler({
                    name, phone, site, id
                })
            },
            copyHandler(i) {
                let oddCode = this.$refs['oddCode_' + i][0]
                oddCode.select();
                document.execCommand('Copy')
                this.$refs.Toast.toastAction('已复制好，可粘贴')
            },
            getList() {
                this.$refs.myScroll.setState(1);
                // ajax 请求
                getRecordAwardList({status: 2, page_no: this.iPage})
                    .then(({data}) => {
                        if (data.data.length === 0) {
                            this.$router.replace({path: "/record/award/error_2"})
                        } else if (data.data.length > 0 && !this.loaded) {
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
                        this.$router.push("/record/award/error_1?top=1.1rem");
                    });
            },
            callBackGetList(obj) {//用户确认保存后，手动更改数据渲染页面，不更新接口
                this.listData = this.listData.map(t => {
                    if (t.id === obj.award_id) {
                        t.rec_address = obj.rec_address
                        t.rec_name = obj.rec_name
                        t.rec_phone = obj.rec_phone
                        t.sendStatus = 1
                    }
                    return t
                })
            }
        },
        // mounted() {
        //     this.getList();
        // },
        activated(){
            if(this.listData.length===0)this.getList();
        },
        components: {
            myScroll, SiteBox, Toast
        }
    };
</script>

<style lang="scss" scoped>
    #list {
        position: absolute;
        top: 0.7rem;
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
                    /*min-height: 3.433333rem;*/
                    margin-bottom: 0.1rem;
                    border: 1px solid #dedede;
                    border-radius: 0.1rem;
                    font-size: 0.2rem;
                    padding: 0.16666667rem;
                    color: #333;
                    background: #fff;

                    .Prize {
                        display: flex;
                    }

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
                        height: 1.8rem;
                        width: 3.8rem;

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
                            font-size: 0.16666667rem;
                            display: flex;
                            align-items: center;

                            .icon {
                                height: 0.266667rem;
                                width: 0.266667rem;
                                margin-right: 0.1rem;
                            }

                            div {
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                .phone{

                                }
                            }
                        }
                    }

                    .header {
                        font-weight: 900;
                        font-size: 0.2rem;
                    }

                    .saveLine {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.25rem;
                        border-bottom: 1px solid #f1f2f3;
                        color: #333333;
                        align-items: center;
                        height: 0.45rem;
                        margin-top: 0.05rem;

                        .btn {
                            display: flex;
                            justify-content: center;
                            /*align-items: center;*/
                            font-size: 0.166rem;
                            color: #fff;
                            background: #ffc852;
                            height: 0.266667rem;
                            width: 0.833333rem;
                            border-radius: 0.05rem;
                        }
                    }

                    .siteLine {
                        position: relative;
                        min-height: 0.65rem;
                        color: #333;
                        padding: 0.1rem 0;
                        display: flex;
                        /* flex-direction: column; */
                        /* justify-content: space-around; */
                        flex-wrap: wrap;

                        input {
                            font-size: 0.167rem;
                            width: 2rem;
                            border: none;
                            height: .25rem;
                            border-bottom: 1px solid #F1F2F3;
                            border-radius: 0;
                            background-color: #fff;
                        }

                        textarea {
                            top: .095rem;
                            position: relative;
                            background-color: #fff;
                            border-radius: 0;
                            font-size: 0.167rem;
                            line-height: 1.2;
                            margin-left: .05rem;
                            height: .25rem;
                            width: 4.52rem;
                            color: #333333;
                            border: none;
                            border-bottom: 1px solid #F1F2F3;
                        }

                        span {
                            position: relative;
                            top: -.05rem;
                        }

                        label:nth-of-type(3) {
                            top: .05rem;
                            position: relative;
                        }
                        .siteInfo{
                            top: .03rem;
                            position: relative;
                        }
                    }

                    .expressLine {
                        border-top: 1px solid #f1f2f3;
                        position: relative;
                        height: 0.65rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                        p {
                            font-size: 0.167rem;
                            display: flex;
                            justify-content: space-between;
                        }

                        .copyBtn {
                            border-radius: .05rem;
                            position: absolute;
                            top: .05rem;
                            right: 0;
                            font-size: 0.167rem;
                            width: 1rem;
                            height: 0.267rem;
                            background-color: #FFC852;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                        }

                        .oddCode {
                            opacity: 0;
                            z-index: -1;
                            position: absolute;
                        }
                    }
                }
            }
        }
    }
</style>
