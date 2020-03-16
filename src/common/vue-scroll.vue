<template>
  <div
    class="my-scroll"
    :class="[scrollState ? 'prohibit' : 'allow']"
    ref="myScroll"
    @scroll.passive="onScroll($event)"
    @touchmove="onScroll($event)"
  >
    <!-- top -->
    <div class="scroll-list">
      <slot name="scrollList"></slot>
      <div class="scroll-bottom">
        <div v-if="state == 1">
           <p>加载中</p>
          <i><img :src="Load"/></i>
        </div>
        <div v-if="state == 2">上拉继续加载</div>
        <div v-if="state == 3">─── 我就是底线 ───</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Load from "./../assets/load.gif";
export default {
  name: "myScroll",
  props: {
    onPull: {
      // 加载回调
      type: Function,
      require: true
    },
    scrollState: {
      // 是否可滑动
      type: Boolean,
      require: true
    },
    loaded: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      Load,
      timeoutId: null,
      state: 0,
      myScroll: null
    };
  },
  methods: {
    /*
     * 加载中：1
     * 加载完成：2
     * 没有更多：3
     */
    setState(index) {
      // 修改状态
      this.state = index;
      // console.log(this.state)
    },
    onScroll(e) {
      const _this = this;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(window.innerHeight + scrollTop, this.myScroll.offsetHeight)
      //一定要保证列表上方有0的距离
      if (
        !this.loaded &&
        window.innerHeight + scrollTop - 0 >= this.myScroll.offsetHeight
      ) {
        clearTimeout(this.timeoutId);
        _this.timeoutId = setTimeout(() => {
          _this.bottomCallback();
        }, 100);
      }
    },
    bottomCallback() {
      // 加载回调
      // console.log('回调', new Date().getTime())
      if (this.state != 3) {
        this.state = 1;
        this.onPull();
      }
    }
  },
  mounted() {
    this.myScroll = this.$refs.myScroll; // 获取滑条dom
  }
};
</script>
<style lang="scss" scoped>
.allow {
  overflow: hidden;
  height: auto;
}
.prohibit {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  /* will-change: transform; */
  transition: all 450ms;
  /* backface-visibility: hidden; */
  perspective: 1000;
}
.my-scroll {
  min-height: 1rem;
  background-color: #f1f2f3;
  position: relative;
  .scroll-top {
    text-align: center;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .scroll-list {
    overflow: hidden;
    min-height: 100%;
    width: 100%;
  }
  .scroll-bottom {
    color: #555555;
    div {
      height: .9rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      /*flex-wrap: wrap;*/
      i {
        display: block;
        height: 0.25rem;
        width: 0.25rem;
        margin-left: .15rem;
      }
      img {
        height: 100%;
        width: 100%;
      }
      p {
        height: 0.333rem;
      }
    }
  }
}
</style>
