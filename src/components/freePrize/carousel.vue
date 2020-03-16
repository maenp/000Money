<template>
  <div class="carousel">
    <swipe
      v-model="index"
      :autoplayTime="autoplayTime"
      :pagination="pagination"
      style="text-align: center;height: 6rem;"
    >
      <swipe-item style="height: 6rem;" v-for="(t, i) in second_img" :key="i">
        <img alt="" style="height: 100%; width:100%" :src="t" />
      </swipe-item>
    </swipe>
  </div>
</template>
<script>
export default {
  props:{
    second_img:{
      requirde:true,
      type:Array,
    }
  },
  data() {
    return {
      index: 0,
      autoplayTime:0,
      pagination: false,
    };
  },
  updated(){
    if (this.second_img.length > 1) {
      this.pagination = true;
    }
  },
};
</script>
<style lang="scss" >
.carousel {
  /*默认图片*/
  background: url("../../assets/error.png") no-repeat 50% 50% #f1f1f1;
  img{
    background-color:#f1f1f1;
  }
  .c-swipe-pagination-item.active {
    background-color: #FE3104;
  }

}
</style>
