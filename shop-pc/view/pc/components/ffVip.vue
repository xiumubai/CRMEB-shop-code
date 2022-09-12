<template>
  <div class="vipSwrapp" v-if="showCode">
    <div class="close acea-row row-right"><span class="iconfont icon-guanbi" @click="closeVip"></span></div>
    <div class="code"><img :src="imgUrl"></div>
    <div class="tip">扫码激活付费会员</div>
  </div>
</template>
<script>
  export default {
    name: "ffVip",
    props: {
      showCode: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        imgUrl:''
      }
    },
    created(){
      this.gainCount();
    },
    mounted(){},
    methods:{
      closeVip(){
        this.$emit("changeVip",false)
      },
      gainCount: function() {
        let that = this;
        that.$axios.get('/pc/get_pay_vip_code').then(res=>{
          this.imgUrl = res.data.url
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  .vipSwrapp{
    width: 226px;
    height: 236px;
    background-color: #fff;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    position: fixed;
    top:250px;
    left:50%;
    margin-left: -123px;
    .tip{
      text-align: center;
      margin-top: 10px;
      color: #282828;
      font-weight: 400;
      margin-left: 0;
      font-size: 16px;
    }
    .iconfont{
      font-size: 20px;
      color: #ccc;
      padding-right: 14px;
      padding-top: 14px;
    }
    .code{
      width: 148px;
      height: 148px;
      margin: 6px auto 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
