<template>
  <div id="home">
    <div class="head">
      <span class="rule" @touchstart="ruleHandler">活动规则 ></span>
      <router-link tag="span" class="record" to="/record">个人记录 ></router-link>
      <Scroll />
    </div>
    <div class="content">
      <ul class="nav">
        <router-link tag="li" to="/freePrize/now">正在抽奖</router-link>
        <router-link tag="li" to="/freePrize/over">已开奖</router-link>
      </ul>
    </div>
      <router-view />
<!--    <keep-alive>-->
<!--    </keep-alive>-->
    <Bottom />
    <Rule ref="Rule" />
  </div>
</template>
<script>
import Scroll from "@components/freePrize/scroll";
import Rule from "@components/freePrize/rule";
import Bottom from "@components/freePrize/bottom";

export default {
  components: {
    Scroll,
    Rule,
    Bottom
  },
  mounted(){
    document.body.style.backgroundColor='#F1F2F3'
  },
  methods: {
    ruleHandler() {
      this.$refs.Rule.show = 1;
    },
    recordHandler() {
      this.$router.push("/record");
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  .head {
    height: 6rem;
    text-align: center;
    /* position: relative; */
    background: url("//egouimg1.qutu.com/m_egou/hd/2020/freePrize/bg.png");
    margin-top: -.2rem;
    background-size: cover;
    span {
      display: block;
    }
    .rule {
      box-sizing: border-box;
      font-size: 0.18rem;
      height: 0.35rem;
      width: 1.2667rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0.25rem;
      background: rgba(0,0,0,.5);
      border-radius: 0.175rem 0 0 0.175rem;
      color: #fff;
      text-align: center;
    }
    .record {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      /*line-height: 0.35rem;*/
      justify-content: center;
      font-size: 0.18rem;
      color: #fff;
      height: 0.35rem;
      width: 1.2667rem;
      position: absolute;
      right: 0;
      top: 0.7rem;
      background: rgba(0,0,0,.5);
      border-radius: 0.175rem 0 0 0.175rem;
    }
  }
  .content {
    position: absolute;
    top: 4.4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .nav {
      box-sizing: border-box;
      border: solid #fff 1px;
      display: flex;
      justify-content: space-between;
      width: 5.91667rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      background: #ffe2c5;
      li {
        cursor:pointer;
        width: 2.9667rem;
        height: 100%;
        border-radius: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        font-size: 0.2667rem;
        font-weight: 900;
        color: #85381e;
      }
      .router-link-active {
        color: #fff;
        background: #ffc852;
      }
    }
  }
}
</style>
