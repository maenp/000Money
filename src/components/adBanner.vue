<template>
  <div class="adBanner">
    <ul>
      <li v-for="(t, i) in list" :key="i" @touchstart="targetHandler(t.union_link)">
        <img :src="t.image" />
      </li>
    </ul>
  </div>
</template>
<script>
import { AdApi } from "./../api/idiomGuess";
export default {
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getInfo() {
      AdApi()
        .then(({ data }) => {
          this.list.length = 0;
          this.list.splice(0, 0, data[0][0]);
        })
        .catch(err => {});
    },
    targetHandler(union_link) {
      window.location.href = union_link;
    }
  }
};
</script>
<style lang="scss" scoped>
.adBanner {
  width: 6.03333rem;
  position: relative;
  top: 2.47rem;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom:.5rem;
  ul {
    width: 100%;
    li {
      width: 100%;
      height: 1.8rem;
      margin-top: 0.1rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
