<template>
    <div class="goPrize">
        <MsgBox ref="MsgBox" @onceMoreHandler="goPrizeHandler"/>
        <HintBox ref="HintBox"/>
    </div>
</template>

<script>
    import MsgBox from "@components/freePrize/msgbox";
    import HintBox from "@components/freePrize/hintbox";
    import {setPrize} from "@api/freePrize";
    import {mapState} from "vuex";

    export default {
        name: "goPrize",
        components:{MsgBox,HintBox},
        computed:{
            ...mapState({
                term:state=>state.term,
                lottery_time:state=>state.freePrize.lottery_time,
            })
        },
        mounted(){
            this.time=0
            this.adId=this.term==3?'945080341':'945080340'
            window.nativeExpressRewardedVideoAdDidClose = this.videoCallBackSucceed.bind( this ); //播放成功
        },
        methods: {
            goPrizeHandler(id,rem,day) {
                let time=new Date().getTime()
                if(time-this.time<600)return
                this.time=time
                this.id=id
                if(this.lottery_time){//没有抽奖机会
                    this.videoCallBackSucceed()
                    return
                }
                if(rem){
                    this.rem=rem
                    this.day=day
                }else{
                    this.rem--
                }
                if(rem<=0||this.rem<=0){//当天活动限制
                    this.$refs.HintBox.showHandler({msg:`本奖品每天仅限获得${day||this.day}个抽奖码`})
                    return;
                }
                try {
                    window.locJs.showRewardedVideoADWithSlotId(this.adId);
                } catch (error) {
                    try {
                        window.locJs.getRuid();
                    } catch (e) {
                        return;
                    }
                    this.videoCallBackSucceed();//没有该方法按成功执行
                }
            },
            videoCallBackSucceed(){//视频播放成功
                let id=this.id
                setPrize({awardId: id}).then((data) => {
                    if (data.code === 0) {
                        if (data.data.award_code) {
                            let obj={...data.data,id}
                            this.$emit('addCodeHandler',obj)//通知父组件更新视图
                            this.$refs.MsgBox.showHandler(data.data, id);//显示奖励弹窗
                        } else {
                            this.$refs.HintBox.showHandler(data.data);//显示提示弹窗
                        }
                    }
                })
            }

        }
    }
</script>

<style scoped>
.goPrize{
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>