<template>
  <div id="app">
    <DownApp/>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
  import DownApp from '@components/downApp';//非app环境下去下载
export default {
  name: "App",
  components:{DownApp},
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss">
html {
  font-size: 16vw;
}
body,
html {
  height: 100%;
  width: 100%;
}
body{
  font-size: .2rem;
  font-family: 'sans-serif',"microsoft yahei",'Arial';
}
* {
  margin: 0;
  padding: 0;
  outline: 0;
}
ul,
li,
dd,
dt {
  list-style: none;
}
#app{
  height: 100%;
}

*{
  user-select:none;
}
input,textarea {
  -webkit-user-select:auto; /*webkit浏览器*/

}
</style>
