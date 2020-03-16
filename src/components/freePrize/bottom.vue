<template>
  <div class="bottom">
    <p v-if="lottery_time">
      还有
      <span class="time">{{ hour }}</span>:
      <span class="time">{{ minute }}</span>:
      <span class="time">{{ second }}</span>
      可再领{{count}}次
    </p>
    <p  v-else>免费夺宝次数 {{award_count}}</p>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {//
    return {
      hour: '03',
      minute: '30',
      second: '30',
      time:0
    };
  },
  computed:{
    ...mapState({
      award_count:state=>state.freePrize.award_count,
      lottery_time:state=>state.freePrize.lottery_time,
      count:state=>state.freePrize.count,
    })
  },
  watch:{
    lottery_time(newVal,oldVal){
      this.time=newVal
      this.setBottom();
    }
  },
  mounted() {
    this.timeFlag=0
    this.getPrizeNumA()
  },
  methods: {
    ...mapActions({
      getPrizeNumA:"freePrize/getPrizeNumA"
    }),
    setBottom() {
      if(this.Interval)clearInterval(this.Interval)
      let time=new Date().getTime()
      if(time-this.timeFlag<600)return
      this.timeFlag=time
      this.Interval=setInterval(_ => {
        let Promise=this.$utils.daojishi(this.time)
        Promise.then(timeObj=>{
          if (!timeObj) return;
          this.hour = timeObj.hour;
          this.minute = timeObj.minute;
          this.second = timeObj.second;
          this.time--;
        }).catch(_=>{
          this.stopHandler()
        })
      }, 1000);
    },
    stopHandler(){
      this.getPrizeNumA()
      clearInterval(this.Interval)
    }
  },
  beforeDestroy() {
    clearInterval(this.Interval)
  }
};
</script>
<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  height: 0.6667rem;
  background: linear-gradient(#ff5d01, #fe3104);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 0.233333rem;
  span {
    display: inline-block;
  }
  p {
      display: flex;
    .time {
      font-weight: 900;
      color: #333;
      border-radius: .05rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      width: 0.366667rem;
      height: 0.366667rem;
      margin:0 .03rem;
    }
    .time:nth-of-type(1){
        margin-left:.15rem;
    }
    .time:nth-of-type(3){
        margin-right:.15rem;
      color: #FE3104;
    }
  }
}
</style>
