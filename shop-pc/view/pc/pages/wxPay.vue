<template>
    <div class="wxPay wrapper_1200">
      <div class="header">
        <span class="home">首页 > 个人中心 > 确认订单 ></span> 订单号：{{orderId}}
      </div>
      <div class="wrapper">
        <div class="title acea-row row-between-wrapper">
          <div>微信支付</div>
          <div class="amount">应付金额：<span class="num font-color">{{totalPrice}}</span>元</div>
        </div>
        <div class="acea-row row-center-wrapper">
          <div class="wx">
            <div class="pictrue">
              <client-only>
                <vue-qr class="bicode" :logoSrc="logo" :text="codeUrl" :size="310"></vue-qr>
              </client-only>
            </div>
            <div class="text acea-row row-center-wrapper">
              <div class="iconfont icon-saoyisao"></div>
              <div>
                <div>请使用微信扫一扫</div>
                <div class="tip">扫描二维码支付</div>
              </div>
            </div>
          </div>
          <div class="phone"><img src="../assets/images/phone.png"></div>
        </div>
        <div class="selectPay" @click="Return"><span class="iconfont icon-fanhui"></span>选择其他支付方式</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "wxPay",
      auth: "guest",
      data(){
        return{
          orderId:0,
          totalPrice:0,
          codeUrl:'',
          logo:'',
          invalid:0,
          endTime:'',
          timeName:null
        }
      },
      // async asyncData({app, query}){
      //   let [ payMsg ] = await Promise.all([
      //     app.$axios.post('/order/pay',{
      //       uni: query.orderId,
      //       paytype: 'weixin',
      //       'from': 'pc'
      //     }),
      //   ]);
      //   return {
      //     orderId:query.orderId,
      //     totalPrice:query.totalPrice,
      //     codeUrl:payMsg.data.result.jsConfig.code_url,
      //     logo:'',
      //     // logo:payMsg.data.result.jsConfig.logo,
      //     invalid:payMsg.data.result.jsConfig.invalid
      //   }
      // },
      watch:{
        endTime(n){
          if(n===0){
            clearInterval(this.timeName);
          }
        }
      },
      fetch({ store}) {
        store.commit('isHeader', true);
        store.commit('isFooter', true);
      },
      head() {
        return {
          title: "微信支付-"+this.$store.state.titleCon
        }
      },
      created(){
        this.orderId = this.$route.query.orderId;
        this.totalPrice = this.$route.query.totalPrice;
        this.goWx()
        // this.wxSuccess()
      },
      mounted(){
        this.timeName = setInterval(() => {
          setTimeout(this.wxSuccess(), 0)
        }, 2000)
      },
      beforeDestroy(){
        clearInterval(this.timeName);
      },
      methods:{
        wxSuccess(){
          let that = this;
          that.$axios.get('/pc/check_order_status/'+that.orderId+'/'+that.invalid).then(res=>{
            that.endTime =res.data.time;
            if(res.data.status){
              clearInterval(that.timeName);
              that.$message.success('支付成功');
              that.$store.commit('cartNum', 0);
              that.getOrderCoupon(that.orderId);
              setTimeout(function () {
                that.$router.replace({path: '/order_detail',query:{orderId:that.orderId}});
              },1000);
            }
          }).catch(err=>{
            that.$message.error(err);
            setTimeout(function () {
              that.$router.replace({path: '/'});
            },1000);
          })
        },
        //支付成功发送优惠券；
        getOrderCoupon(orderId){
          let that = this;
          that.$axios.post('/v2/order/product_coupon/' + orderId).then(res=>{
          })
        },
        Return(){
          this.$router.go(-1);
        },
        goWx(){
          let that = this;
          that.$axios.post('/order/pay',{
            uni: that.orderId,
            paytype: 'weixin',
            'from': 'pc'
          }).then(res=>{
            that.codeUrl = res.data.result.jsConfig.code_url;
            that.invalid = res.data.result.jsConfig.invalid;
          }).catch(err=>{
            that.$message.error(err);
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .wxPay{
    .header{
      color: #999999;
      height: 60px;
      line-height: 60px;
      .home{
        color: #282828;
      }
    }
    .wrapper{
      padding: 26px 30px;
      background-color: #fff;
      .title{
        margin-bottom: 51px;
        font-size: 20px;
        .amount{
          font-size: 14px;
          color: #969696;
          .num{
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
      .wx{
        width: 310px;
        .pictrue{
          width: 100%;
          height: 310px;
          border: 1px solid #ccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .text{
          width: 100%;
          height: 72px;
          background-color: #EB5E4A;
          color: #fff;
          font-size: 14px;
          margin-top: 16px;
          .iconfont{
            font-size: 50px;
            margin-right: 30px;
          }
          .tip{
            margin-top: 4px;
          }
        }
      }
      .phone{
        margin-left: 144px;
        width: 262px;
        height: 399px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .selectPay{
        font-size: 16px;
        color: #236FE9;
        margin-top: 68px;
        cursor: pointer;
        .iconfont{
          margin-right: 16px;
          font-size: 15px;
        }
      }
    }
  }
</style>
