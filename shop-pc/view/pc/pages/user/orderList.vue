<template>
  <div class="user-order-list">
    <div class="user-com-tab">
      <span
        class="item"
        :class="{ on: tabCur === item.key }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="bindTab(item)"
        >{{ item.title }} <template v-if="item.num">({{ item.num }})</template>
      </span>
    </div>
    <div class="order-list">
      <ul>
        <li v-for="(item, index) in orderList" :key="index">
          <div class="bd" @click="goDetail(item)">
            <div class="order-txt">
              订单日期: {{ item._add_time }}
              <span v-if="item._status._type == 0" class="status">待付款</span>
              <span
                v-else-if="item._status._type == 1 && item.shipping_type == 1"
                class="status"
                >待发货<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span>
              </span>
              <span
                v-else-if="item._status._type == 2 && item.shipping_type == 1"
                class="status"
                >待收货<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span>
              </span>
              <span
                v-else-if="item._status._type == 3 && item.shipping_type == 1"
                class="status"
                >待评价<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span></span
              >
              <span
                v-else-if="item._status._type == 4 && item.shipping_type == 1"
                class="status"
                >已完成<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span></span
              >
              <span
                v-else-if="item.shipping_type == 2 && item._status._type == 3"
                class="status"
                >待评价<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span></span
              >
              <span
                v-else-if="item.shipping_type == 2 && item._status._type == 4"
                class="status"
                >已完成<span v-if="item.refund.length">{{
                  item.is_all_refund ? "，退款中" : "，部分退款中"
                }}</span></span
              >
            </div>
            <div class="content">
              <div
                class="goods-item"
                v-for="(goods, index) in item.cartInfo"
                :key="index"
              >
                <div class="img-box" v-if="goods.productInfo.attrInfo.image">
                  <img :src="goods.productInfo.attrInfo.image" alt="" />
                </div>
                <div class="img-box" v-else>
                  <img :src="goods.productInfo.image" alt="" />
                </div>
                <div class="info-txt">
                  <div class="title line2">
                    {{ goods.productInfo.store_name }}
                  </div>
                  <div class="info" v-if="goods.productInfo.attrInfo">
                    {{ goods.productInfo.attrInfo.suk }}
                  </div>
                  <div class="price" v-if="goods.productInfo.attrInfo">
                    ¥ {{ goods.productInfo.attrInfo.price }}
                  </div>
                  <div class="price" v-else>
                    ¥ {{ goods.productInfo.price }}
                  </div>
                  <span class="num">x{{ goods.cart_num }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="foot">
            <p>
              共{{ item.total_num || 0 }}件商品，总金额
              <span>￥{{ item.pay_price }} </span>(含运费{{ item.pay_postage }})
            </p>
            <div class="btn-wrapper">
              <div
                class="rest"
                v-if="item._status._type === 0 || item._status._type === 9"
                @click="cancelOrder(item, index)"
              >
                取消订单
              </div>
              <div
                class="pay"
                v-if="item._status._type === 0"
                @click="goBuy(item)"
              >
                立即支付
              </div>
              <!--<div class="rest" v-if="item._status._type === 1 || item._status._type === 9"-->
              <!--@click="goRefound(item)">申请退款-->
              <!--</div>-->
              <div
                class="rest"
                v-if="item._status._type === 3 || item._status._type === 4"
                @click="goOrderConfirm(item.order_id)"
              >
                再次购买
              </div>
              <div
                class="pay"
                v-if="item._status._type === 3 && !item.is_reply"
                @click="goEvaluation(item)"
              >
                去评价
              </div>
              <div class="pay" @click="goDetail(item)">查看详情</div>
            </div>
          </div>
          <div
            class="refund-icon"
            v-if="item._status._type === -1 || item._status._type === -2"
          >
            <img
              src="~assets/images/order_status_1.png"
              alt=""
              v-if="item.refund_status === 2"
            />
            <img
              src="~assets/images/order_status_2.png"
              alt=""
              v-if="item.refund_status === 1"
            />
          </div>
        </li>
      </ul>
      <div class="pages-box" v-if="total > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="bindPageCur"
          :total="total"
        >
        </el-pagination>
      </div>
      <div class="empty-box" v-if="orderList.length == 0">
        <img src="~assets/images/noorder.png" alt="" />
        <p>亲，暂无订单信息哟~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";

export default {
  name: "orderList",
  auth: "guest",
  scrollToTop: true,
  data() {
    return {
      tabCur: "",
      tabList: [
        {
          title: "全部订单",
          key: "",
          numberName: "order_count",
        },
        {
          title: "待付款",
          key: "0",
          numberName: "unpaid_count",
        },
        {
          title: "待发货",
          key: "1",
          numberName: "unshipped_count",
        },
        {
          title: "待收货",
          key: "2",
          numberName: "received_count",
        },
        {
          title: "待评论",
          key: "3",
          numberName: "evaluated_count",
        },
        {
          title: "已完成",
          key: "4",
          numberName: "complete_count",
        },
        {
          title: "售后",
          key: "-3",
          numberName: "refund_count",
        },
      ],
      orderList: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "我的订单-" + this.$store.state.titleCon,
    };
  },
  created() {},
  mounted() {
    Promise.all([this.getList(), this.getNumber()]);
  },
  methods: {
    //  再次购买
    goOrderConfirm(orderId) {
      let that = this;
      that.$axios
        .post("/order/again", {
          uni: orderId,
        })
        .then((res) => {
          that.$router.replace({
            path: "/order_confirm",
            query: { new: 1, cartId: res.data.cateId },
          });
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 选项卡
    bindTab(item) {
      this.tabCur = item.key;
      this.page = 1;
      this.getList();
    },
    // 获取订单个数
    getNumber() {
      this.$axios.get("order/data").then((res) => {
        for (var i in res.data) {
          this.tabList.forEach((tab) => {
            if (i == tab.numberName) {
              tab.num = res.data[i];
            }
          });
        }
      });
    },
    // 获取订单列表
    getList() {
      let path =
        this.tabCur == -3 ? "pc/get_refund_order_list" : "pc/get_order_list";
      this.$axios
        .get(path, {
          params: {
            type: this.tabCur,
            page: this.page,
            limit: this.limit,
          },
        })
        .then((res) => {
          this.orderList = res.data.list;
          this.total = res.data.count;
        });
    },
    // 取消订单
    cancelOrder(item, index) {
      MessageBox.confirm("确定取消该订单吗？", "提示").then((res) => {
        this.$axios
          .post("order/cancel", {
            id: item.order_id,
          })
          .then((data) => {
            this.getList();
            this.getNumber();
            return Message.success(data.msg);
          });
      });
    },
    // 查看详情
    goDetail(item) {
      this.$router.push({
        path: `/order_detail`,
        query: {
          orderId: item.order_id,
          order_type: this.tabCur,
        },
      });
    },
    // 去评价
    goEvaluation(item) {
      if (item.cartInfo.length === 1) {
        this.$router.push({
          path: `/evaluation`,
          query: {
            unique: item.cartInfo[0].unique,
          },
        });
      } else {
        this.goDetail(item);
      }
    },
    // 去退款
    goRefound(item) {
      this.$router.push({
        path: `/refund`,
        query: {
          orderId: item.order_id,
        },
      });
    },
    // 去物流
    goLogistics(item) {
      this.$router.push({
        path: `/logistics`,
        query: {
          orderId: item.order_id,
        },
      });
    },
    // 分页点击
    bindPageCur(data) {
      this.page = data;
      this.getList();
    },
    // 立即支付
    goBuy(item) {
      this.$router.push({
        path: "/payment",
        query: {
          result: item.order_id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-com-tab {
  .item {
    padding: 0 10px;
  }
}

.user-order-list {
  li {
    position: relative;
    padding: 30px 0 26px;
    border-bottom: 1px solid #ececec;
    .refund-icon {
      position: absolute;
      right: 50px;
      top: 40px;
    }
    .bd {
      padding-right: 40px;
      border-bottom: 1px dashed #e1e1e1;
      cursor: pointer;

      .order-txt {
        color: #282828;
        font-size: 14px;

        .status {
          float: right;
          color: #e93323;
        }
      }

      .content {
        margin-top: 20px;

        .goods-item {
          display: flex;
          position: relative;
          margin-bottom: 20px;

          .img-box {
            width: 120px;
            height: 120px;

            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          .info-txt {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 500px;
            margin-left: 24px;
            font-size: 14px;
            .info {
              font-size: 12px;
              color: #aaa;
              margin-top: 4px;
            }

            .price {
              margin-top: 15px;
              color: #e93323;
            }

            .num {
              position: absolute;
              right: 0;
              top: 60%;
              transform: translateY(-50%);
              color: #999999;
            }
          }
        }
      }
    }

    .foot {
      padding-top: 26px;
      padding-right: 32px;

      p {
        text-align: right;
        color: #666;
        font-size: 14px;

        span {
          color: #e93323;
        }
      }

      .btn-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        div {
          width: 110px;
          height: 36px;
          text-align: center;
          line-height: 34px;
          margin-left: 20px;
          border: 1px solid #999999;
          border-radius: 4px;
          font-size: 14px;
          color: #666666;
          cursor: pointer;

          &.pay {
            border-color: #e93323;
            background: #e93323;
            color: #fff;
          }
        }
      }
    }
  }
}
.pages-box {
  margin-top: 30px;
  text-align: right;
}
</style>
