<template>
  <div class="payment wrapper_1200">
    <div class="header">
      <span class="home">首页 > 个人中心 ></span>确认订单
    </div>
    <div class="orderTip">
      <div>订单提交成功！去付款咯~</div>
      <div class="times acea-row row-middle">
        <div>剩余时间：</div>
        <countDown
          :is-day="false"
          :tip-text="' '"
          :day-text="' '"
          :hour-text="' 小时 '"
          :minute-text="' 分钟 '"
          :second-text="'秒 '"
          :datatime="orderDetail.stop_time"
        ></countDown>
      </div>
    </div>
    <div class="detail">
      <div class="item">订单编号：{{ orderId }}</div>
      <div class="item">
        订单价格：<span>{{ orderDetail.pay_price }}元</span>
      </div>
      <div class="item line1">
        收货信息：{{ orderDetail.real_name }} {{ orderDetail.user_phone }}
        {{ orderDetail.user_address }}
      </div>
      <div class="item line1">
        商品名称：{{
          orderDetail.cartInfo.length
            ? orderDetail.cartInfo[0].productInfo.store_name
            : ""
        }}
      </div>
    </div>
    <div class="payType">
      <div class="title">选择以下支付方式</div>
      <div class="type acea-row row-middle">
        <div
          class="item acea-row row-center-wrapper"
          :class="current === 0 ? 'on' : ''"
          @click="currentPay(0)"
        >
          <div class="iconfont icon-yue"></div>
          <div>
            <div class="name">余额支付</div>
            <div class="yue">余额：{{ userInfo.now_money }}</div>
          </div>
          <div
            class="iconfont icon-xuanzhong4 font-color"
            v-if="current === 0"
          ></div>
        </div>
        <div
          class="item acea-row row-center-wrapper"
          :class="current === 1 ? 'on' : ''"
          @click="currentPay(1)"
        >
          <div class="iconfont icon-weixinzhifu1"></div>
          <div>
            <div class="name">微信支付</div>
          </div>
          <div
            class="iconfont icon-xuanzhong4 font-color"
            v-if="current === 1"
          ></div>
        </div>
        <div
          v-if="orderDetail.ali_pay_status"
          class="item acea-row row-center-wrapper"
          :class="current === 2 ? 'on' : ''"
          @click="currentPay(2)"
        >
          <div class="iconfont icon-zhifubao"></div>
          <div>
            <div class="name">支付宝支付</div>
          </div>
          <div
            class="iconfont icon-xuanzhong4 font-color"
            v-if="current === 2"
          ></div>
        </div>
      </div>
      <div class="goPay acea-row row-right">
        <div class="bnt bg-color" @click="goPay">去支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import countDown from "@/components/countDown";
export default {
  name: "payment",
  auth: "guest",
  components: {
    countDown,
  },
  data() {
    return {
      orderId: 0,
      orderDetail: {
        cartInfo: [],
      },
      current: 0,
      userInfo: {},
    };
  },
  async asyncData({ app, query }) {
    let [orderMsg, userInfoMsg] = await Promise.all([
      //获取banner分类
      app.$axios.get("/order/detail/" + query.result),
      app.$axios.get("/user"),
    ]);
    return {
      orderId: query.result,
      orderDetail: orderMsg.data,
      userInfo: userInfoMsg.data,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "支付-" + this.$store.state.titleCon,
    };
  },
  created() {},
  mounted() {},
  methods: {
    currentPay(index) {
      this.current = index;
      if (index === 1 || index === 2) {
        this.$router.push({
          path: index === 1 ? "/wxPay" : "/aliPay",
          query: {
            orderId: this.orderId,
            totalPrice: this.orderDetail.pay_price,
          },
        });
      }
    },
    goPay() {
      let that = this;
      if (
        this.current === 0 &&
        parseFloat(that.userInfo.now_money) <
          parseFloat(that.orderDetail.pay_price)
      )
        return that.$message.error("余额不足");
      that.$axios
        .post("/order/pay", {
          uni: that.orderId,
          paytype: "yue",
          from: "pc",
        })
        .then((res) => {
          that.$message.success(res.msg);
          that.$store.commit("cartNum", 0);
          that.getOrderCoupon(that.orderId);
          setTimeout(function () {
            that.$router.push({
              path: "/order_detail",
              query: { orderId: that.orderId },
            });
          }, 1000);
        })
        .catch((err) => {
          that.$message.error(err);
          setTimeout(function () {
            that.$router.push({ path: "/" });
          }, 1000);
        });
    },
    //支付成功发送优惠券；
    getOrderCoupon(orderId) {
      let that = this;
      that.$axios.post("/v2/order/product_coupon/" + orderId).then((res) => {});
    },
  },
};
</script>

<style scoped lang="scss">
.payment {
  .header {
    margin-top: 21px;
    color: #999999;
    .home {
      color: #282828;
    }
  }
  .orderTip {
    padding: 55px 30px 31px 30px;
    font-size: 32px;
    color: #fff;
    width: 1200px;
    height: 159px;
    background: url("../assets/images/orderBg.png") no-repeat;
    background-size: 100% 100%;
    .times {
      font-size: 14px;
      margin-top: 12px;
    }
  }
  .detail {
    width: 100%;
    height: 182px;
    background-color: #fff;
    padding: 31px 30px;
    .item {
      font-size: 16px;
      & ~ .item {
        margin-top: 12px;
      }
    }
  }
  .payType {
    width: 100%;
    height: 387px;
    background-color: #fff;
    margin-top: 17px;
    .title {
      height: 57px;
      padding: 0 30px;
      border-bottom: 1px dotted #cecece;
      line-height: 57px;
      font-size: 18px;
    }
    .type {
      padding: 22px 50px 55px 30px;
      .item {
        width: 210px;
        height: 86px;
        border: 1px solid #d4d4d4;
        position: relative;
        cursor: pointer;
        & ~ .item {
          margin-left: 20px;
        }
        &.on {
          border-color: #e93323;
        }
        .iconfont {
          color: #09bb07;
          font-size: 29px;
          margin-right: 11px;
          &.icon-yue {
            font-size: 32px;
            color: #fe9c01;
          }
        }
        .icon-xuanzhong4 {
          position: absolute;
          right: -4px;
          bottom: -4px;
          margin: 0 !important;
        }
        .name {
          font-size: 16px;
          color: #4e4e4e;
        }
        .yue {
          font-size: 14px;
          color: #969696;
          margin-top: 6px;
        }
      }
    }
    .goPay {
      margin: 80px 50px 0 0;
      .bnt {
        width: 180px;
        height: 46px;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        line-height: 46px;
        cursor: pointer;
      }
    }
    .icon-zhifubao:before {
      color: #00aaea;
    }
  }
}
</style>
