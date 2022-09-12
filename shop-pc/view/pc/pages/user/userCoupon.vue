<template>
  <div class="user-coupon">
    <div class="main-section">
      <div class="main-hd acea-row row-middle">领取优惠券</div>
      <div class="main-bd">
        <div class="list acea-row">
          <div
            v-for="(item, index) in couponList"
            :key="index"
            class="item acea-row"
            :class="[
              item.receive_type == 4 ? 'svip' : '',
              item.is_use && item.receive_type != 4 ? 'disabled' : '',
              item.is_use && item.receive_type == 4 ? 'disabledVip' : '',
            ]"
          >
            <div class="text">
              <div v-if="item.type === 0" class="label">通用券</div>
              <div v-else-if="item.type === 1" class="label">品类券</div>
              <div v-else-if="item.type === 2" class="label">商品券</div>
              <div class="text-cont acea-row row-middle">
                <div class="money">
                  ￥<span class="num">{{ item.coupon_price }}</span>
                </div>
                <div class="info">
                  <div class="name">{{ item.coupon_title }}</div>
                  <div>满{{ item.use_min_price }}可用</div>
                </div>
              </div>
              <div v-if="item.start_time" class="time">
                有效时间：{{ item.start_time }}-{{ item.end_time }}
              </div>
              <div v-else class="time">不限时</div>
            </div>
            <div class="btn acea-row row-middle" v-if="item.is_use === true">
              已领取
            </div>
            <div class="btn acea-row row-middle" v-else-if="item.is_use === 2">
              已领完
            </div>
            <div class="acea-row row-middle" v-else>
              <div
                class="btn acea-row row-middle"
                v-if="item.receive_type != 4"
                @click="getCoupon(item.id, index)"
              >
                立即领取
              </div>
              <div
                class="btn acea-row row-middle"
                v-if="moneyLevel !== 0 && item.receive_type == 4"
                @click="getCoupon(item.id, index)"
              >
                立即领取
              </div>
              <div
                class="btn acea-row row-middle"
                @click="showCode = true"
                v-if="moneyLevel === 0 && item.receive_type == 4"
              >
                立即领取
              </div>
            </div>
          </div>
        </div>
        <div class="empty-box" v-if="couponList.length == 0">
          <img src="~/assets/images/noCoupou.png" alt="" />
          <p>亲，暂无可领取的优惠券哟~</p>
        </div>
      </div>
    </div>
    <ffVip :showCode="showCode" @changeVip="changeVip"></ffVip>
  </div>
</template>

<script>
import { Message } from "element-ui";
import ffVip from "@/components/ffVip";
export default {
  auth: "guest",
  components: { ffVip },
  props: {},
  data() {
    return {
      moneyLevel: -1,
      showCode: false,
      couponList: [],
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "领取优惠券-" + this.$store.state.titleCon,
    };
  },
  computed: {},
  watch: {},
  async asyncData({ app }) {},
  created() {
    this.getCouponList();
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.moneyLevel = this.$auth.user.is_money_level;
    } else {
      this.moneyLevel = -1;
    }
    this.$nextTick(() => {});
  },
  methods: {
    changeVip(e) {
      this.showCode = e;
    },
    getCoupon(id, index) {
      let that = this;
      let list = that.couponList;
      that.$axios
        .post("/coupon/receive", {
          couponId: id,
        })
        .then((res) => {
          list[index].is_use = true;
          that.$set(that, "couponList", list);
          Message.success("领取成功");
        })
        .catch((err) => {
          Message.error(err);
        });
    },
    getCouponList() {
      this.$axios
        .get("coupons")
        .then((res) => {
          this.couponList = res.data;
        })
        .catch((err) => {
          Message.success(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-coupon {
  .main-section {
    flex: 1;
    margin-left: 8px;
    background-color: #ffffff;
  }
  .main-hd {
    height: 60px;
    border-bottom: 1px solid #ececec;
    font-size: 18px;
    color: #282828;
  }
  .main-bd {
    padding-top: 30px;
    padding-bottom: 15px;
  }
  .user {
    width: 180px;
    height: 170px;
    background-color: #ffffff;
    .image {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-bottom: 13px;
      overflow: hidden;
      font-size: 14px;
      color: #282828;
    }
    .img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .name {
      max-width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .menu {
    padding-top: 38px;
    padding-bottom: 38px;
    margin-top: 8px;
    background-color: #ffffff;
    .item {
      height: 25px;
      border-left: 3px solid transparent;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      color: #666666;
      cursor: pointer;
      &.on {
        border-color: #e93323;
        color: #e93323;
      }
    }
  }
  .list {
    .item {
      width: 300px;
      height: 130px;
      margin-right: 15px;
      margin-bottom: 15px;
      background: url("~assets/images/coupon-back1.png") center/cover no-repeat;
      box-shadow: 0 3px 20px rgba(0, 0, 0, 0.08);
      &.svip {
        background-image: url("~assets/images/vipCouB.png");
        &.disabledVip {
          background-image: url("~assets/images/vipCouB02.png");
          .label {
            background-color: rgba(145, 145, 145, 0.1);
            color: #acacac;
          }
          .text-cont {
            color: #d0d0d0;
          }
          .money {
            color: #bfbfbf;
          }
          .name {
            color: #bfbfbf;
          }
          .time {
            color: #d0d0d0;
          }
          .btn {
            color: #fff;
          }
        }
        .label {
          background-color: #fee2b6;
          color: #863c0d;
        }
        .money {
          color: #863c0d;
        }
        .btn {
          color: #863c0d;
        }
      }
      &.disabled {
        background-image: url("~assets/images/coupon-back2.png");
        .label {
          background-color: rgba(145, 145, 145, 0.1);
          color: #acacac;
        }
        .text-cont {
          color: #d0d0d0;
        }
        .money {
          color: #bfbfbf;
        }
        .name {
          color: #bfbfbf;
        }
        .time {
          color: #d0d0d0;
        }
      }
      .text {
        flex: 1;
        padding-left: 14px;
      }
      .text-cont {
        margin-top: 14px;
        font-size: 14px;
        color: #969696;
      }
      .label {
        width: 62px;
        height: 24px;
        background-color: rgba(233, 51, 35, 0.1);
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #e93323;
      }
      .money {
        margin-right: 14px;
        font-size: 16px;
        color: #e93323;
        .num {
          font-weight: bold;
          font-size: 32px;
        }
      }
      .info {
        flex: 1;
        min-width: 0;
      }
      .name {
        margin-bottom: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #282828;
        width: 140px;
        display: inline-block;
      }
      .time {
        margin-top: 14px;
        font-size: 12px;
        color: #969696;
      }
      .btn {
        width: 52px;
        padding-right: 18px;
        padding-left: 18px;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
