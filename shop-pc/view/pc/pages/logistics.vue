<template>
  <div class="logistics wrapper_1200">
    <div class="header"><span class="home">首页 > </span>物流详情</div>
    <div class="section process" v-if="orderData._status._type >= 0">
      <div class="section-hd" v-if="orderData._status._type === 0">
        订单状态：待付款
      </div>
      <div class="section-hd" v-if="orderData._status._type === 1">
        订单状态：待发货
      </div>
      <div class="section-hd" v-if="orderData._status._type === 2">
        订单状态：待收货
      </div>
      <div class="section-hd" v-if="orderData._status._type === 3">
        订单状态：待评价
      </div>
      <div class="section-hd" v-if="orderData._status._type === 4">
        订单状态：已完成
      </div>
      <div class="section-bd">
        <ul class="">
          <li
            :class="{
              past:
                orderData._status._type > 0 && orderData.shipping_type === 1,
              now:
                orderData._status._type === 0 && orderData.shipping_type === 1
            }"
          >
            <div class="line"></div>
            <div class="iconfont icon-xuanzhong11"></div>
            <div class="iconfont icon-fukuan">
              <div class="arrow"></div>
            </div>
            <div class="info">
              <div>待付款</div>
              <div>{{ orderData.order_log.create }}</div>
            </div>
          </li>
          <li
            :class="{
              past:
                orderData._status._type > 1 && orderData.shipping_type === 1,
              now:
                orderData._status._type === 1 && orderData.shipping_type === 1
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 0 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan'
              ]"
            ></div>
            <div class="iconfont icon-peihuo">
              <div class="arrow"></div>
            </div>
            <div class="info">
              <div>待发货</div>
              <div>{{ orderData.order_log.pay }}</div>
            </div>
          </li>
          <li
            :class="{
              past:
                orderData._status._type > 2 && orderData.shipping_type === 1,
              now:
                orderData._status._type === 2 && orderData.shipping_type === 1
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 1 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan'
              ]"
            ></div>
            <div class="iconfont icon-fahuo">
              <div class="arrow"></div>
            </div>
            <div class="info">
              <div>待收货</div>
              <div>{{ orderData.order_log.delivery }}</div>
            </div>
          </li>
          <li
            :class="{
              past:
                orderData._status._type > 3 && orderData.shipping_type === 1,
              now:
                orderData._status._type === 3 && orderData.shipping_type === 1
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 2 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan'
              ]"
            ></div>
            <div class="iconfont icon-pingjia1">
              <div class="arrow"></div>
            </div>
            <div class="info">
              <div>待评价</div>
              <div>{{ orderData.order_log.take }}</div>
            </div>
          </li>
          <li
            :class="{
              past:
                orderData._status._type > 4 && orderData.shipping_type === 1,
              now:
                orderData._status._type === 4 && orderData.shipping_type === 1
            }"
          >
            <div
              :class="[
                'iconfont',
                orderData._status._type > 3 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan'
              ]"
            ></div>
            <div class="iconfont icon-wancheng"></div>
            <div class="info">
              <div>已完成</div>
              <div>{{ orderData.order_log.complete }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="acea-row row-middle express">
      <div class="iconfont icon-wuliu"></div>
      <div class="text">
        <div>快递公司：{{ orderInfo.delivery_name }}</div>
        <div>
          快递单号：{{ orderInfo.delivery_id }}
          <button
            v-clipboard:copy="orderInfo.delivery_id"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            复制
          </button>
        </div>
      </div>
    </div>
    <div class="acea-row detail">
      <div class="goods">
        <img :src="product.productInfo.image" />
        <ul>
          <li class="acea-row">
            <div>订单编号：</div>
            <div>{{ $route.query.orderId }}</div>
          </li>
          <li class="acea-row">
            <div>收货地址：</div>
            <div>{{ orderInfo.user_address }}</div>
          </li>
          <li class="acea-row">
            <div>买家留言：</div>
            <div>{{ orderInfo.user_mark || "-" }}</div>
          </li>
        </ul>
      </div>
      <div class="timeline">
        <ul v-if="expressList && expressList.length">
          <li
            class="acea-row"
            :class="index === 0 ? 'on' : ''"
            v-for="(item, index) in expressList"
            :key="index"
          >
            <div>{{ item.time }}</div>
            <div>{{ item.status }}</div>
          </li>
        </ul>
        <img v-else src="@/assets/images/noExpress.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: "guest",
  data() {
    return {
      product: {},
      orderInfo: {},
      expressList: []
    };
  },
  async asyncData({ app, query }) {
    const [detail, express] = await Promise.all([
      app.$axios.get(`/order/detail/${query.orderId}`),
      app.$axios.get(`/order/express/${query.orderId}`)
    ]);
    return {
      orderData: detail.data,
      product: express.data.order.cartInfo[0] || {},
      orderInfo: express.data.order,
      expressList: express.data.express.result
        ? express.data.express.result.list
        : []
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "物流-"+this.$store.state.titleCon
    }
  },
  created() {},
  methods: {
    onCopy(e) {
      this.$message.success("复制成功");
    },
    onError(e) {
      this.$message.error("复制出错");
    }
  }
};
</script>

<style lang="scss" scoped>
.logistics {
  .header {
    height: 60px;
    line-height: 60px;
    color: #999999;
    .home {
      color: #282828;
    }
  }

  .process {
    margin-bottom: 14px;
    background-color: #ffffff;

    div {
      &.section-hd {
        padding: 26px 22px 0;
      }

      ul {
        padding: 27px 0 94px;

        &::after {
          content: "";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
      }

      li {
        position: relative;
        float: left;
        margin-top: 0;
        margin-left: 222px;

        &:first-child {
          margin-left: 111px;
        }

        .line {
          position: absolute;
          top: 50%;
          left: 16px;
          width: 226px;
          height: 4px;
          background: #c7c7c7;
          transform: translateY(-50%);
        }

        .iconfont {
          position: relative;
          width: auto;
          font-size: 18px;
          line-height: 1;
          color: #c7c7c7;

          + .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            display: none;
            width: 40px;
            height: 40px;
            border: 4px solid #e93323;
            border-radius: 50%;
            background: #ffffff;
            transform: translate(-50%, -50%);
            font-size: 20px;
            line-height: 32px;
            text-align: center;
            color: #e93323;
          }
        }

        .arrow {
          position: absolute;
          top: 50%;
          left: 100%;
          display: none;
          width: 80px;
          height: 16px;
          background: #e93323;
          transform: translateY(-50%);

          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 100%;
            border-width: 8px;
            border-style: solid;
            border-color: transparent transparent transparent #e93323;
          }
        }

        .info {
          position: absolute;
          top: 42px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          text-align: center;
          color: #9a9a9a;
          width: 100px;

          div {
            &:first-child {
              margin-bottom: 4px;
              font-size: 16px;
              color: #282828;
            }
          }
        }

        &.past {
          .line {
            background: rgba(233, 51, 35, 0.6);
          }

          .iconfont {
            color: #e93323;
          }
        }

        &.now {
          .info {
            div {
              &:first-child {
                color: #e93323;
              }
            }
          }

          .iconfont {
            + .iconfont {
              display: block;
            }
          }

          .arrow {
            display: block;
          }
        }
      }
    }
  }

  .express {
    padding: 18px 22px;
    background-color: #ffffff;

    .iconfont {
      font-size: 40px;
      color: #d0d0d0;
    }

    .text {
      flex: 1;
      margin-left: 22px;
      font-size: 13px;
      color: #282828;

      div {
        ~ div {
          margin-top: 14px;
        }

        button {
          width: 38px;
          height: 22px;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          margin-left: 18px;
          background: none;
          font-size: 12px;
        }
      }
    }
  }

  .detail {
    margin-top: 14px;
    background-color: #ffffff;

    .goods {
      width: 330px;
      padding: 30px 22px;

      img {
        width: 112px;
        height: 112px;
        border-radius: 4px;
        vertical-align: middleF;
      }

      ul {
        margin-top: 20px;
        font-size: 13px;
        color: #282828;
      }

      li {
        ~ li {
          margin-top: 14px;
        }

        div {
          &:last-child {
            flex: 1;
          }
        }
      }
    }

    .timeline {
      flex: 1;
      padding: 30px 22px;
      border-left: 1px solid #efefef;
      font-size: 13px;
      color: #282828;

      .on {
        div {
          &:last-child {
            &::before {
              width: 12px;
              height: 12px;
              border-width: 3px;
              background-color: #e93323;
            }

            &::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              width: 18px;
              height: 18px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              box-sizing: border-box;
              background-color: #ff877c;
              transform: translate(-50%, -50%);
            }
          }
        }
      }

      div {
        &:first-child {
          width: 233px;
          padding-right: 27px;
          text-align: right;
        }

        &:last-child {
          position: relative;
          flex: 1;
          padding-bottom: 20px;
          padding-left: 27px;
          border-left: 1px solid #d0d0d0;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 8px;
            height: 8px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-sizing: border-box;
            background-color: #d0d0d0;
            transform: translate(-50%, -50%);
          }
        }
      }

      > img {
        width: 200px;
        margin: 32px auto 0;
      }
    }
  }
}
</style>
