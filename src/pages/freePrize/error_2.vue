<template>
    <div class="error">
        <img src="../../assets/prize.png" alt="">
        <h3>
            一大波奖品正在想你奔来赶紧来参加吧
        </h3>
        <router-link to="/freePrize/now" tag="div" class="btn" >立即参与</router-link>
    </div>
</template>

<script>
    export default {
        name: "error_2"
    }
</script>

<style lang="scss" scoped>
.error{
    padding-top: 1.95rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    color: #555555;
    align-items:center;
    h3{

    }
    img{
        margin-bottom: 0.433rem;
        height: 2rem;
        width:2.2rem;
        /*background-color: #000;*/
    }

    .btn{

        font-size: 0.25rem;
        height:0.533rem;
        width: 2.667rem;
        background: linear-gradient(#FD571D,#FE3104);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-top: 0.633rem;
        border-radius: 0.25rem;
    }
}
</style>