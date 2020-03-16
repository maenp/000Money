<template>
  <div class="msgbox">
    <transition name="fadebg">
      <div class="bg" v-show="show"></div>
    </transition>
    <transition name="fade">
      <div class="container" v-show="show">
        <h3>恭喜你</h3>
        <p>获得一张中奖码</p>
        <p>劵码：1000000251</p>
        <p>劵码越多，中奖机会越大</p>
        <div class="btn" @touchstart.prevent="show = 0">再拿一个</div>
        <p>剩余次数5/5</p>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: 0
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
  methods: {
    stopBodyScroll(isFixed) {
      //弹出遮罩层,禁止蒙层底部页面跟随滚动
      var bodyEl = document.body;
      if (isFixed) {
        //弹层打开
        this.top1 = window.scrollY;
        bodyEl.style.position = "fixed";
        bodyEl.style.top = -this.top1 + "px";
      } else {
        //弹层关闭
        bodyEl.style.position = "";
        bodyEl.style.top = "";
        window.scrollTo(0, this.top1); // 回到原先的top
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.msgbox {
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
  padding: 0.4rem 0.45rem 1rem 0.4rem;
  background: #fff;
  width: 5.58333rem;
  border-radius: 0.2rem;
position: fixed;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 4.5rem;
  text-align: center;
  h3 {
    height: 0.375rem;
    width: 1.7rem;
    margin-bottom: 0.34167rem;
    margin: 0 auto;
    margin-bottom: 0.34167rem;
    font-size: 0.4rem;
    color: #a85426;
    font-family: "Lantinghei SC", Regular, Serif;
  }
  p{
    font-size:.3rem;
  }
  p:nth-of-type(1){

  }
  p:nth-of-type(2){
      background:#999;
      height:.7rem;
      display:flex;
      justify-content:center;
      align-items:center;
  }
  p:nth-of-type(4){
      position:absolute;
      bottom:.15rem;
      left:50%;
      transform: translateX(-50%);
  }
}
.btn {
  width: 3rem;
  height: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  bottom: 0.6rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.33333rem;
  color: #a85426;
  background: linear-gradient(-90deg, #feb80e, #fde34a);
  font-weight: 900;
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
