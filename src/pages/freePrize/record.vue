<template>
  <div id="home">
    <div class="content">
      <ul class="nav">
        <router-link tag="li" to="/record/history">参与记录</router-link>
        <router-link tag="li" to="/record/award">中奖记录</router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <Rule ref="Rule"/>
  </div>
</template>
<script>
import List from "@components/freePrize/list";
import Scroll from "@components/freePrize/scroll";
import Rule from "@components/freePrize/rule";


export default {
  components: {
    List,
    Scroll,
    Rule,

  },
  mounted(){
    document.body.style.backgroundColor='#F1F2F3'
  },
  methods:{
    ruleHandler(){
      this.$refs.Rule.show=1
    },
    recordHandler(){
      this.$router.push()
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  .content {
    display: flex;
    justify-content: center;
    .nav {
      border-top:1px solid #F1F2F3;
      display: flex;
      justify-content: space-around;
        align-items: center;
      width: 100%;
      background:#fff;
      font-size:.25rem;
      color:#999999;
      li {
        width: 1.6rem;
        height: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 2px solid #Fff;
      }
      .router-link-active{
      color:#333333;
        border-bottom: 2px solid #FC3E17;
      }
    }
  }

}
</style>
