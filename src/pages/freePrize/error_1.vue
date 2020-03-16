<template>
    <div class="error" ref="error">
        <img src="../../assets/prize_lose.png" alt="">
        <h3>咦，奖品都被外星人劫走了~</h3>
        <div class="button" @touchstart="refreshHandler">再试一次</div>
    </div>
</template>
<script>
    let fullPath
    export default{
        beforeRouteEnter(to,from,next){
            fullPath=from.fullPath
            next()
        },
        created(){
            this.top=this.$route.query.top
        },
        mounted(){
            this.$refs.error.style.top=this.top
        },
        methods:{
            refreshHandler(){
                this.$router.push(fullPath)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .error{
        border-radius: 0.1rem;
        background-color: #F1F2F3;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width:5.91667rem;
        top: 5.1rem;
        color: #555555;
        padding: 1rem 0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    img{
        margin-bottom: 0.433rem;
        height: 2rem;
        width:2.2rem;
        /*background-color: #000;*/
    }
    .button{
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