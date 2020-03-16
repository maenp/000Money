<template>
  <div class="details">
    <div class="carousel">
      <ul class="content" ref="content" @touchstart="touchHandler($event)">
        <li v-for="(t, i) in list" :key="i">
          <img
            src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg"
            alt=""
          />
        </li>
      </ul>
      <ul class="dot">
        <li v-for="(t, i) in list.length" :key="i"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3],
      index:1,
    };
  },
  methods: {
    touchHandler(e) {
      this.$refs.content.addEventListener("touchmove", this.moveHandler);
      this.clientX = e.touches[0].clientX;
      console.log(e);
      console.log(this.clientX);
    },
    moveHandler(e) {
      var length = this.clientX - e.touches[0].clientX;

        console.log(length);
      if (Math.abs(length) < 100) return;
      if (length>0) {
        this.index--
        this.$refs.content.style.left=this.index*6.25+'rem'
      }else{
        this.index++
        this.$refs.content.style.left=this.index*6.25+'rem'
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.details {
  .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 4rem;
    .content {
      width: 6.25rem;
      height: 4rem;
      display: flex;
      width: max-content;
      position: absolute;
      li {
        width: 6.25rem;
        height: 4rem;
        img {
          width: 100%;
          height: 4rem;
        }
      }
    }
    .dot {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 0.2rem;
      display: flex;
      li {
        height: 0.15rem;
        width: 0.15rem;
        border-radius: 50%;
        border: solid 1px #000;
        margin-left: 0.08rem;
      }
      li:nth-of-type(1) {
        margin-left: 0;
        background: #000;
      }
    }
  }
}
</style>
