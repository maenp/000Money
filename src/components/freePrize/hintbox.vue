<template>
  <div class="msgbox">
    <transition name="fadebg">
      <div class="bg" v-if="show"></div>
    </transition>
    <transition name="fade">
      <div class="container" v-if="show" ref="container">
        <h3>温馨提示</h3>
        <div v-if="flag" class="flag">
          <p>本时间段的领码次数（{{award_count}}）已用完</p>
          <br />
          <p>
            还有
            <span class="time">{{ hour }}</span>:
            <span class="time">{{ minute }}</span>:
            <span class="time">{{ second }}</span>
             可再领<span class="count">{{count}}</span>次
          </p>
        </div>
        <div v-else class="flag" style="justify-content: center;">{{msg}}</div>
        <div class="btn" @touchstart.prevent="closeHandler">我知道了</div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  inject:['reload'],
  computed: {
    ...mapState({
      award_count:state=>state.freePrize.award_count,
      count:state=>state.freePrize.count,
    })
  },
  data() {
    return {
      show: 0,
      flag: 0,
      msg:"",
      hour: 0,
      minute: 0,
      second: 0,
      time: 3600
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
    closeHandler(){
      clearInterval(this.interval)
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.show=0;
      if(this.isEnd)this.reload()
    },
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
    setBotton() {
      if(this.interval)clearInterval(this.interval)
      this.Interval=0
      if(this.Interval)return
      this.interval= setInterval(_ => {
        this.$utils.daojishi(this.time).then(timeObj=>{
          if (!timeObj) return;
          this.hour = timeObj.hour;
          this.minute = timeObj.minute;
          this.second = timeObj.second;
          this.time--;
        }).catch(_=>{
          this.Interval=1
          clearInterval(this.interval)
          this.show=0
        })
      }, 1000);
    },
    showHandler(obj){
      this.show=1
      if(obj.lottery_time){
        this.flag=1
        this.time=obj.lottery_time/1000
        this.setBotton()
      }else{
        this.flag=0
        this.msg=obj.msg
        if(obj.msg.indexOf('抽完')>=0)this.isEnd=1//奖品抽完刷新页面
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>
<style lang="scss" scoped>
.msgbox {
  position: fixed;
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
  height: 4.067rem;
  border-radius: 0.2rem;
  position: fixed;
  top: -0.667rem;
  bottom: 0;
  margin: auto 0;
  text-align: center;
  font-size: 0.217rem;
  h3 {
    font-weight: 100;
    padding-top: .02rem;
    box-sizing: border-box;
    height: 0.6rem;
    width: 2.583rem;
    margin: 0 auto 0.283rem;
    font-size: 0.3rem;
    color: #fff;
    background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/titie_bg.png") no-repeat;
    background-size: cover;
  }
  .flag{
    font-size: 0.217rem;
    box-sizing: border-box;
    padding: 0.283rem;
    height: 1.5rem;
    width: 100%;
    background: #F1F2F3;
    background-size: cover;
    color: #333;
    border-radius: .08rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  p:nth-of-type(2) {
    font-size: 0.233rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .time {
      font-weight: 900;
      color: #333;
      margin:0 .05rem;
      display: inline-block;
      height: 0.367rem;
      width: 0.367rem;
      border-radius: .05rem;
      background: #FFC852;
      line-height: .38rem;
      text-align: center;
    }
    .count{
      color: #FE3104;
      font-weight: 900;
    }
    .time:nth-of-type(3) {
      color: #FE3104;
    }
  }
}
.btn {
  width: 4rem;
  height: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem;
  bottom: 0.16rem;
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
