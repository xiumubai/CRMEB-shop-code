<template>
  <div class="order-detail wrapper_1200">
    <div class="header bag-f">
      <nuxt-link to="/">首页></nuxt-link>
      <nuxt-link :to="{ path: '/user', query: { type: 0 } }"
        >个人中心></nuxt-link
      >
      <span>订单详情</span>
    </div>
    <div class="section process bag-f" v-if="orderData._status._type >= 0">
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
                orderData._status._type === 0 && orderData.shipping_type === 1,
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
                orderData._status._type === 1 && orderData.shipping_type === 1,
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 0 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan',
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
                orderData._status._type === 2 && orderData.shipping_type === 1,
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 1 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan',
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
                orderData._status._type === 3 && orderData.shipping_type === 1,
            }"
          >
            <div class="line"></div>
            <div
              :class="[
                'iconfont',
                orderData._status._type > 2 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan',
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
                orderData._status._type === 4 && orderData.shipping_type === 1,
            }"
          >
            <div
              :class="[
                'iconfont',
                orderData._status._type > 3 && orderData.shipping_type === 1
                  ? 'icon-xuanzhong11'
                  : 'icon-weixuan',
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
    <div v-if="orderData._status._type < 0" class="section reject bag-f">
      <div
        class="iconfont"
        :class="
          orderData._status._type === -1
            ? 'icon-tuikuanzhong'
            : 'icon-yituikuan'
        "
      ></div>
      <div class="section-hd">{{ orderData._status._title }}</div>
      <div class="section-bd">
        <ul>
          <li class="acea-row row-middle">
            {{ orderData.add_time_y
            }}<span class="time">{{ orderData.add_time_h }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="orderData.refund_type == 3" class="section reason bag-f">
      <div class="section-hd">
        <span class="iconfont icon-tuikuantishi"></span>商家拒绝退款
      </div>
      <div class="section-bd">
        <ul>
          <li class="acea-row">
            <div>拒绝原因：</div>
            <div>
              {{ orderData.refund_reason }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="section bag-f">
      <div class="section-hd">订单信息</div>
      <div class="section-bd">
        <ul>
          <li class="acea-row row-middle">
            <div>订单编号：</div>
            <div>{{ orderData.order_id }}</div>
          </li>
          <li class="acea-row row-middle">
            <div>订单日期：</div>
            <div>{{ orderData.add_time_y }}</div>
          </li>
          <li class="acea-row row-middle">
            <div>支付状态：</div>
            <div>{{ orderData._status._type === 0 ? "未支付" : "已支付" }}</div>
          </li>
          <li class="acea-row row-middle">
            <div>支付方式：</div>
            <div>{{ orderData._status._payType }}</div>
          </li>
          <li v-if="orderData.mark" class="acea-row">
            <div>买家留言：</div>
            <div>{{ orderData.mark }}</div>
          </li>
          <li class="acea-row row-middle">
            <div>订单金额：</div>
            <div class="money">￥{{ orderData.pay_price }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 自定义留言 -->
    <div class="section bag-f" v-if="customForm && customForm.length">
      <!-- <div class="section-hd"></div> -->
      <div class="section-bd">
        <ul>
          <li class="acea-row" v-for="(item, index) in customForm" :key="index">
            <div class="customForm">{{ item.title }}：</div>
            <div v-if="item.label == 'img'" class="pictrue">
              <div v-for="(img, index) in item.value" :key="index">
                <img :src="img" />
              </div>
            </div>
            <div v-else>{{ item.value }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="section bag-f">
      <div class="section-hd">收货信息</div>
      <div class="section-bd">
        <ul>
          <li class="acea-row row-middle">
            <div>收货人：</div>
            <div>{{ orderData.real_name }}</div>
          </li>
          <li class="acea-row row-middle">
            <div>联系电话：</div>
            <div>{{ orderData.user_phone }}</div>
          </li>
          <li class="acea-row">
            <div>收货地址：</div>
            <div>{{ orderData.user_address }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="orderData._status._type > 1 && orderData._status._type < 4"
      class="section order-number bag-f"
    >
      <div class="section-bd" v-if="orderData.delivery_type === 'express'">
        <ul>
          <li class="acea-row row-middle">
            <div>快递单号：</div>
            <div>{{ orderData.delivery_id }}</div>
            <nuxt-link
              :to="{
                path: '/logistics',
                query: { orderId: orderData.order_id },
              }"
              >查看物流</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="section-bd" v-else-if="orderData.delivery_type === 'send'">
        <ul>
          <li class="acea-row row-middle">
            <div>配送方式：</div>
            <div>送货</div>
          </li>
          <li class="acea-row row-middle">
            <div>配送人：</div>
            <div>{{ orderData.delivery_name || "" }}</div>
          </li>
          <li class="acea-row">
            <div>联系电话：</div>
            <div>{{ orderData.delivery_id || "" }}</div>
          </li>
        </ul>
      </div>
      <div
        class="section-bd"
        v-else-if="orderData.delivery_type === 'fictitious'"
      >
        <ul>
          <li class="acea-row row-middle">
            <div>虚拟发货：</div>
            <div>已发货，请注意查收</div>
          </li>
          <li class="acea-row row-middle" v-if="orderData.virtual_type === 1">
            <div>商家备注：</div>
            <div>
              {{ orderData.remark }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="section bag-f">
      <div class="section-hd" v-if="orderData.cartInfo.length">商品信息</div>
      <div class="section-bd">
        <ul class="goods" v-if="orderData.cartInfo.length">
          <li
            v-for="item in orderData.cartInfo"
            :key="item.product_id"
            class="acea-row row-middle"
          >
            <div>
              <img
                :src="item.productInfo.attrInfo.image || item.productInfo.image"
              />
            </div>
            <div>
              <div>{{ item.productInfo.store_name }}</div>
              <div class="info" v-if="item.productInfo.attrInfo">
                {{ item.productInfo.attrInfo.suk }}
                <span class="cart-num">x{{ item.cart_num }}</span>
              </div>
              <div class="pice">
                <div>
                  <span class="money"
                    >￥{{
                      item.productInfo.attrInfo
                        ? item.productInfo.attrInfo.price
                        : item.productInfo.price
                    }}</span
                  ><del
                    >￥{{
                      item.productInfo.attrInfo
                        ? item.productInfo.attrInfo.ot_price
                        : item.productInfo.ot_price
                    }}</del
                  >
                </div>

                <div class="pice-btn">
                  <div
                    class="evaluate_btn"
                    v-if="orderData._status._type === 3"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="goEvaluate(item)"
                      >评价</el-button
                    >
                  </div>
                  <!-- 主单 -->
                  <div class="split_btn">
                    <el-button
                      v-if="
                        orderData.refund_status === 0 &&
                        orderData.paid == 1 &&
                        item.refund_num != item.cart_num
                      "
                      type="primary"
                      size="mini"
                      @click.stop="jumpPath(1, orderData.order_id, item.id)"
                      >申请退货</el-button
                    >
                    <!-- <el-button
                type="primary"
                size="mini"
                @click="confirmOrder(item.orderId)"
                >确认收货</el-button
              > -->
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li class="acea-row row-middle">
            <div>运费：</div>
            <div>
              {{ orderData.pay_postage <= 0 ? "包邮" : orderData.pay_postage }}
            </div>
          </li>
          <li
            class="acea-row row-middle"
            v-if="orderData.vip_true_price != '0.00'"
          >
            <div>会员折扣：</div>
            <div>-￥{{ orderData.vip_true_price }}</div>
          </li>
          <li v-if="orderData.coupon_id" class="acea-row row-middle coupon">
            <div>优惠金额：</div>
            <div>
              <span>-￥{{ orderData.coupon_price }}</span>
            </div>
          </li>
          <li
            class="acea-row row-middle"
            v-if="parseFloat(orderData.deduction_price) > 0"
          >
            <div>积分抵扣：</div>
            <div>-￥{{ orderData.deduction_price }}</div>
          </li>
        </ul>
        <ul class="total">
          <li class="acea-row row-middle row-between">
            <div>
              共{{ goodsNum }}件商品，订单总金额为：<span class="money"
                >￥<b>{{ orderData.pay_price }}</b></span
              >
            </div>
            <div class="footerState acea-row row-middle">
              <nuxt-link
                :to="{
                  path: '/refund',
                  query: { orderId: orderData.order_id },
                }"
                v-if="
                  orderData.is_apply_refund &&
                  [0, 3].includes(orderData.refund_status) &&
                  orderData.cartInfo.length > 1 &&
                  !orderData.cartInfo.virtual_type
                "
                class="orderBnt"
                >{{
                  orderData.cartInfo.length > 1 ? "批量退款" : "申请退款"
                }}</nuxt-link
              >
              <div
                class="orderBnt"
                v-if="orderData._status._type === 0"
                @click.stop="cancelOrder"
              >
                取消订单
              </div>
              <div
                class="orderBnt"
                :class="{
                  on: orderData._status._type === 0,
                }"
                v-if="orderData._status._type === 0"
                @click="goPay"
              >
                立即付款
              </div>
              <div
                class="orderBnt"
                :class="{
                  on: orderData._status._type === 2,
                }"
                v-if="orderData._status._type === 2"
                @click="confirmOrder(orderData.order_id)"
              >
                确认收货
              </div>
              <div
                class="orderBnt"
                v-if="orderData._status._type === 4"
                @click="delOrder"
              >
                删除订单
              </div>
              <div
                class="orderBnt"
                v-if="
                  [1, 2, 4].includes(orderData.refund_type) &&
                  !orderData.is_cancel
                "
                @click="cancelRefundOrder"
              >
                取消申请
              </div>
              <div
                class="orderBnt"
                v-if="
                  orderData._status._type === 3 || orderData._status._type === 4
                "
                @click="goOrderConfirm"
              >
                再次购买
              </div>
              <div class="orderBnt" @click="chatShow">联系客服</div>
              <div
                class="orderBnt"
                v-if="orderData.refund_type == 4"
                @click.stop="refundInput(orderData.order_id)"
              >
                填写退货物流
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <chat-room
      v-show="chatOptions.show"
      :chat-options="chatOptions"
      @chat-close="chatClose"
      @socket-open="socketOpen"
      @socket-error="socketError"
    ></chat-room>
    <el-dialog title="退货物流单号" :visible.sync="refund_close" width="30%">
      <el-input v-model="express_num" placeholder="请输入单号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refund_close = false">取 消</el-button>
        <el-button type="primary" @click="refundSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
import ChatRoom from "@/components/ChatRoom";
import appChat from "@/mixins/appChat";
export default {
  auth: "guest",
  components: { ChatRoom },
  mixins: [appChat],
  data() {
    return {
      customForm: "",
      orderData: {},
      goodsNum: 0,
      refund_close: false,
      express_num: "",
      refund_id: 0,
      order_type: 0,
    };
  },
  async asyncData({ app, query }) {
    console.log(query);

    let path =
      query.order_type == -3
        ? `/order/refund/detail/${query.orderId}`
        : `/order/detail/${query.orderId}`;
    const { data } = await app.$axios.get(path);
    return {
      orderData: data,
      order_type: query.order_type,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "订单详情-" + this.$store.state.titleCon,
    };
  },
  created() {
    let that = this,
      num = 0;
    that.orderData.cartInfo.forEach((item, index) => {
      num += item.cart_num;
    });
    that.goodsNum = num;

    //处理自定义留言非必填项的数据展示
    let arr = [];
    this.orderData.custom_form.map((i) => {
      if (i.value != "") {
        arr.push(i);
      }
    });
    this.customForm = arr;
  },
  watchQuery: ["orderId"],
  methods: {
    // 获取订单信息
    getOrderInfo() {
      let path =
        this.order_type == -3
          ? `/order/refund/detail/${this.orderData.order_id}`
          : `/order/detail/${this.orderData.order_id}`;
      this.$axios
        .get(path)
        .then((res) => {
          this.orderData = res.data;
        })
        .catch((err) => {
          Message.error(err.msg);
        });
    },
    // 填写退货物流
    refundSubmit() {
      if (!this.express_num.trim()) {
        return Message.error("请输入物流单号");
      }
      this.$axios
        .post(`/order/refund/express`, {
          express_id: this.express_num,
          id: this.refund_id,
        })
        .then((res) => {
          Message.success(res.msg);
          this.refund_close = false;
        })
        .catch((err) => {
          Message.error(err.msg);
          this.refund_close = false;
        });
    },
    jumpCon(orderId) {
      this.$router.push({
        path: "/order_detail",
        query: { orderId },
      });
    },
    // 取消订单
    cancelOrder() {
      let that = this;
      MessageBox.confirm("确定取消该订单吗？", "提示").then((res) => {
        that.$axios
          .post("/order/cancel", {
            id: that.orderData.order_id,
          })
          .then((data) => {
            Message.success(data.msg);
            that.$router.replace({
              path: "/user/orderList",
              query: { page_type: 1 },
            });
          });
      });
    },
    //去支付
    goPay() {
      this.$router.push({
        path: "/payment",
        query: { result: this.orderData.order_id },
      });
    },
    //确认收货
    confirmOrder(id) {
      let that = this;
      MessageBox.confirm(
        "为保障权益，请收到货确认无误后，再确认收货",
        "提示"
      ).then((res) => {
        that.$axios
          .post("/order/take", {
            uni: id,
          })
          .then((data) => {
            Message.success("操作成功");
            that.getOrderInfo();
          });
      });
    },
    //删除订单
    delOrder() {
      let that = this;
      MessageBox.confirm("确定删除该订单吗？", "提示").then((res) => {
        that.$axios
          .post("/order/del", {
            uni: that.orderData.order_id,
          })
          .then((data) => {
            Message.success("删除成功");
            that.$router.replace({
              path: "/user/orderList",
              query: { page_type: 1 },
            });
          });
      });
    },
    //  再次购买
    goOrderConfirm() {
      let that = this;
      that.$axios
        .post("/order/again", {
          uni: that.orderData.order_id,
        })
        .then((res) => {
          that.$router.replace({
            path: "/order_confirm",
            query: { new: 1, cartId: res.data.cateId },
          });
        })
        .catch((err) => {
          that.$message.error(err);
        });
    },
    //  去评价
    goEvaluate(item) {
      this.$router.push({
        path: "/evaluation",
        query: {
          unique: item.unique,
        },
      });
    },
    jumpPath(type, id, cartId) {
      console.log(id);
      this.$router.push({
        path: type == 1 ? "/refund" : "/logistics",
        query: {
          orderId: type == 1 ? this.orderData.order_id : id,
          cart_id: cartId,
        },
      });
    },
    // refundInput(id) {
    // this.refund_id = id ? id : this.orderData.id;
    // console.log(this.refund_id);
    // this.refund_close = true;
    // },
    refundInput(id) {
      this.$router.push({
        path: "/refund_goods",
        query: {
          orderId: id,
        },
      });
    },
    cancelRefundOrder() {
      let that = this;
      MessageBox.confirm("确定取消申请吗？", "提示").then((res) => {
        that.$axios
          .post("order/refund/cancel/" + that.orderData.order_id, {})
          .then((data) => {
            Message.success("取消成功");
            that.$router.replace({
              path: "/user/orderList",
              query: { page_type: 1 },
            });
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-detail {
  .header {
    height: 60px;
    line-height: 60px;
    color: #999999;
    background-color: unset;
    padding: 0 10px;

    .home {
      color: #282828;
    }
  }
  .bag-f {
    background-color: #ffffff;
    margin: 10px 0;
    &.order-number {
      li {
        div {
          &:nth-child(2) {
            flex: none;
          }
        }

        a {
          margin-left: 30px;
          font-size: 16px;
          color: #236fe9;

          .iconfont {
            font-size: 12px;
          }
        }
      }
    }

    ~ div {
      margin-top: 14px;
    }

    > div {
      ~ div {
        border-top: 1px dashed #cecece;
      }
    }

    &.process {
      margin-top: 0;
      div {
        border-top: none;

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
            top: 0px;
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

    &.reject {
      position: relative;
      padding: 30px 22px;
      background: #666666;
      overflow: hidden;
      margin-top: 0;

      .iconfont {
        position: absolute;
        top: -20px;
        right: 28px;
        font-size: 112px;
        color: #818181;
      }

      div {
        border-top: none;

        &.section-hd {
          padding: 0;
          font-weight: bold;
          color: #ffffff;
        }

        ul {
          padding: 0;
          margin-top: 8px;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }

    &.reason {
      padding: 26px 22px;

      div {
        border-top: none;

        &.section-hd {
          padding: 0;
          .iconfont {
            margin-right: 8px;
          }
        }

        ul {
          padding: 0;
          margin-top: 15px;
          color: #7e7e7e;
        }
      }
    }
  }

  .section-hd {
    padding: 18px 22px;
    font-size: 18px;
    color: #282828;
  }

  .section-bd {
    position: relative;
    .iconfont {
      position: absolute;
      top: -20px;
      right: 0px;
      font-size: 70px;
      color: rgb(247, 30, 30);
    }
    ul {
      padding: 22px;
      font-size: 16px;
      color: #282828;

      ~ ul {
        border-top: 1px dashed #cecece;
      }
    }

    li {
      .time {
        margin-left: 10px;
      }
      ~ li {
        margin-top: 20px;
      }

      > div {
        &:first-child {
          width: 80px;
        }

        &:nth-child(2) {
          flex: 1;
        }
      }

      &.coupon {
        span {
          ~ span {
            margin-left: 18px;
          }
        }
      }
    }

    .money {
      color: #e93323;

      b {
        font-weight: normal;
        font-size: 22px;
      }
    }

    .goods {
      width: 100%;

      .info {
        font-size: 12px;
        color: #aaa;
        margin-top: 4px;
        .cart-num {
          font-size: 14px;
          color: rgb(250, 36, 36);
        }
      }

      li {
        position: relative;
        ~ li {
          margin-top: 22px;
        }

        > div {
          &:nth-child(1) {
            width: 86px;
            height: 86px;
            overflow: hidden;

            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          &:nth-child(2) {
            margin-right: 26px;
            margin-left: 26px;

            > div {
              &:first-child {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }

              &:last-child {
                margin-top: 10px;

                del {
                  margin-left: 12px;
                  font-size: 14px;
                  color: #919191;
                }
              }
            }
          }

          &:nth-child(3) {
            font-size: 14px;
            color: #b1b1b1;
          }
        }
      }
    }

    .total {
      padding: 28px 22px;

      .footerState {
        cursor: pointer;
      }

      .service {
        width: 114px;
        height: 40px;
        margin-left: 18px;
        background: #e93323;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }

      div {
        &:first-child {
          width: auto;
        }

        &:last-child {
          flex: none;

          div {
            padding-right: 10px;
            padding-left: 30px;

            ~ div {
              border-left: 1px solid #cecece;
            }
          }

          .orderBnt {
            width: 114px;
            height: 40px;
            padding: 0;
            border: 1px solid #999999;
            border-radius: 2px;
            background: none;
            outline: none;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
            color: #282828;

            ~ .orderBnt {
              margin-left: 18px;
            }

            &.on {
              border-color: #e93323;
              background: #e93323;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
.evaluate_btn {
  // position: absolute;
  // right: 0;
  // top: 50%;
  // transform: translateY(-50%);
}
.split_btn {
  // position: absolute;
  // right: 0;
  // bottom: 0px;
  margin-left: 20px;
  a {
    color: #fff;
  }
}
.customForm {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pictrue {
  // width: 10px;
  // height: 10px;

  display: flex;
  img {
    width: 78px;
    height: 78px;
    margin: 11px 8px 10px 0;
  }
}
.pice {
  display: flex;
  justify-content: space-between;
}
.pice-btn {
  display: flex;
  align-items: center;
}
</style>
