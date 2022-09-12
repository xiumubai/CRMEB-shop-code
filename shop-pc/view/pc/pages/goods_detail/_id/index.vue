<template>
  <div class="goods-detail">
    <div class="wrapper_1200 acea-row">
      <div class="goods-main">
        <div class="acea-row row-top">
          <div class="carousel">
            <img :src="storeInfo.slider_image[slideIndex]" class="preview" />
            <client-only>
              <div v-swiper:carousel="swiperOption">
                <div class="swiper-wrapper">
                  <div
                    v-for="(item, index) in storeInfo.slider_image"
                    :key="index"
                    :class="{ on: slideIndex === index }"
                    class="swiper-slide"
                    @mouseover="swiperMouseover(index)"
                  >
                    <img :src="item" />
                  </div>
                </div>
                <div class="swiper-button-prev swiper-button-white"></div>
                <div class="swiper-button-next swiper-button-white"></div>
              </div>
            </client-only>
            <div class="acea-row row-middle">
              <div class="btn" style="width: 60px" @click="collect">
                <span
                  :class="[
                    'iconfont',
                    storeInfo.userCollect
                      ? 'icon-yishoucang'
                      : 'icon-shoucang2',
                  ]"
                ></span
                >{{ storeInfo.userCollect ? "已收藏" : "收藏" }}
              </div>
              <div class="btn" @click="chatShow">
                <span class="iconfont icon-kefu2"></span>联系客服
              </div>
            </div>
          </div>
          <div class="text-wrapper">
            <div class="title">{{ storeInfo.store_name }}</div>
            <!-- 秒杀 -->
            <div v-if="datatime" class="acea-row row-middle money-wrapper">
              <div class="money-wrap">
                <del
                  >原价：￥{{
                    productValue.length
                      ? attrValueSelected.ot_price
                      : storeInfo.ot_price
                  }}</del
                >
                <div class="acea-row row-middle">
                  <div class="price">
                    ￥<span>{{ storeInfo.price }}</span>
                  </div>
                  <div v-if="storeInfo.vip_price > 0" class="acea-row vip">
                    <div class="acea-row row-center-wrapper iconfont"></div>
                    <div class="acea-row row-center-wrapper money">
                      ￥<span>{{ storeInfo.vip_price }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="timer-wrapper">
                <div class="acea-row row-between-wrapper">
                  距离结束还剩
                  <countDown
                    :is-day="false"
                    :tip-text="' '"
                    :day-text="' '"
                    :hour-text="' : '"
                    :minute-text="' : '"
                    :second-text="' '"
                    :datatime="datatime"
                  ></countDown>
                </div>
                <div class="acea-row row-between-wrapper progress-group">
                  <div class="progress"><span></span></div>
                  已抢70%
                </div>
              </div>
              <div class="acea-row row-column row-center-wrapper sales">
                <div class="num">{{ storeInfo.sales }}</div>
                <div>销量</div>
              </div>
            </div>
            <div v-else class="acea-row row-middle money-wrapper">
              <div class="money-wrap">
                <del
                  >原价：￥{{
                    attrValueSelected
                      ? attrValueSelected.ot_price
                      : storeInfo.ot_price
                  }}</del
                >
                <div class="acea-row row-middle">
                  <div class="price">
                    ￥<span>{{
                      attrValueSelected
                        ? attrValueSelected.price
                        : storeInfo.price
                    }}</span>
                  </div>
                  <div
                    v-if="
                      storeInfo.base &&
                      storeInfo.vip_price &&
                      storeInfo.vip_price > 0
                    "
                    class="acea-row vip"
                  >
                    <div class="acea-row row-center-wrapper iconfontVip"></div>
                    <div class="acea-row row-center-wrapper money">
                      ￥<span>{{ storeInfo.vip_price }}</span>
                    </div>
                  </div>
                  <div
                    v-if="
                      storeInfo.is_vip &&
                      storeInfo.vip_price &&
                      storeInfo.vip_price > 0
                    "
                    class="acea-row vip"
                  >
                    <div class="acea-row row-center-wrapper iconfont"></div>
                    <div class="acea-row row-center-wrapper money">
                      ￥<span>{{ storeInfo.vip_price }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sales acea-row row-column row-center-wrapper">
                <div class="num">
                  {{ storeInfo.fsales }}
                </div>
                <div>销量</div>
              </div>
            </div>
            <div class="coupon-wrapper" v-if="makeCouponList.length">
              <div class="acea-row coupon-bd">
                <div class="label">优惠券</div>
                <div class="list" :class="couponHide ? '' : 'on'">
                  <div
                    v-for="item in makeCouponList"
                    :key="item.id"
                    class="acea-row row-middle item"
                  >
                    <div
                      class="acea-row cell"
                      :class="item.receive_type === 4 ? 'svip' : ''"
                    >
                      <div class="acea-row row-center-wrapper cell-left">
                        {{ item.type }}
                      </div>
                      <div class="acea-row row-center-wrapper cell-right">
                        满{{ item.use_min_price }}减{{ item.coupon_price }}
                      </div>
                    </div>
                    <div v-if="item.start_time" class="time">
                      {{ item.start_time }}-{{ item.end_time }}
                    </div>
                    <div v-else class="time">不限时</div>
                    <button
                      :disabled="item.is_use"
                      @click="getCoupon(item.id)"
                      v-if="item.receive_type != 4"
                    >
                      {{ item.is_use ? "已领取" : "领取" }}
                    </button>
                    <button
                      :disabled="item.is_use"
                      @click="getCoupon(item.id)"
                      v-if="moneyLevel !== 0 && item.receive_type == 4"
                    >
                      {{ item.is_use ? "已领取" : "领取" }}
                    </button>
                    <button
                      :disabled="item.is_use"
                      @click="showCode = true"
                      v-if="moneyLevel === 0 && item.receive_type == 4"
                    >
                      {{ item.is_use ? "已领取" : "领取" }}
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="!coupon.finished"
                class="acea-row row-right row-middle coupon-ft"
              >
                <div class="button" @click="getCouponList">
                  {{ couponHide ? "收起" : "更多优惠"
                  }}<span
                    class="iconfont"
                    :class="couponHide ? 'icon-xiangshang' : 'icon-xiangxia'"
                  ></span>
                </div>
              </div>
            </div>
            <div class="attribute">
              <div
                v-for="(item, index) in productAttr"
                :key="index"
                class="acea-row size-wrapper"
              >
                <div class="label">{{ item.attr_name }}</div>
                <div class="acea-row list">
                  <label
                    v-for="(itm, idx) in item.attr_values"
                    :key="idx"
                    class="item"
                  >
                    <input
                      v-model="attrSelected[index]"
                      type="radio"
                      :name="index"
                      :value="itm"
                      :checked="!idx"
                      hidden
                    />
                    <div class="acea-row cont">
                      <div class="acea-row row-middle name">{{ itm }}</div>
                      <div class="iconfont icon-xuanzhong4"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div class="number-wrapper acea-row">
              <div class="label">数量</div>
              <div class="counter-wrap">
                <div class="counter">
                  <button
                    class="iconfont icon-shangpinshuliang-jian"
                    :disabled="count === 1 || !stock"
                    @click="minus"
                  ></button>
                  <input v-model="count" @input="inputNum" />
                  <button
                    class="iconfont icon-shangpinshuliang-jia"
                    :disabled="count === stock || !stock"
                    @click="plus"
                  ></button>
                </div>
                <span>（库存 {{ stock }}{{ storeInfo.unit_name }}）</span>
              </div>
            </div>
            <div class="button-wrapper">
              <button
                v-if="storeInfo.cart_button"
                class="btn cart"
                :disabled="!stock"
                @click="buy(0, $event)"
              >
                加入购物车
              </button>
              <button class="btn" :disabled="!stock" @click="buy(1, $event)">
                立即购买
              </button>
            </div>
          </div>
        </div>
        <div class="detail-wrapper">
          <div class="detail-hd acea-row">
            <div class="tab acea-row">
              <div
                class="item acea-row row-center-wrapper"
                :class="{ on: tabIndex === 0 }"
                @click="tab(0)"
              >
                产品详情
              </div>
              <div
                class="item acea-row row-center-wrapper"
                :class="{ on: tabIndex === 1 }"
                @click="tab(1)"
              >
                累计评论({{ replyInfo.sum_count }})
              </div>
            </div>
            <div
              class="acea-row row-center-wrapper qrcode-button"
              @mouseover="qrcodeShow = true"
              @mouseout="qrcodeShow = false"
            >
              <span class="iconfont icon-saoma"></span>手机购买<span
                :class="[
                  'iconfont',
                  qrcodeShow ? 'icon-xiangshang1' : 'icon-xiangxia2',
                ]"
              ></span>
              <div class="qrcode">
                <client-only>
                  <vue-qr
                    v-if="phoneBuy.phone_buy == 1"
                    class="bicode"
                    :text="codeUrl"
                    :size="320"
                  ></vue-qr>
                  <img v-else :src="codeUrl" />
                </client-only>
              </div>
            </div>
          </div>
          <div class="detail-bd">
            <div v-show="tabIndex === 0">
              <div
                v-if="storeInfo.description"
                class="detail-html"
                v-html="storeInfo.description"
              ></div>
              <div v-else class="nothing">
                <img src="@/assets/images/noDetail.png" />
                <div>暂无商品详情</div>
              </div>
            </div>
            <div v-show="tabIndex === 1" class="comment">
              <div class="comment-hd">
                <div class="acea-row row-between-wrapper">
                  <div class="rate">
                    <span>{{ replyInfo.reply_chance }}%</span><span>满意</span>
                  </div>
                  <div class="acea-row row-middle score">
                    评分
                    <div class="cont">
                      <span
                        v-for="(v, i) in 5"
                        :key="i"
                        :class="{ on: i + 1 <= replyInfo.reply_star }"
                        class="iconfont icon-pingjia"
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="menu">
                  <div
                    class="item"
                    :class="{ on: reply.type === 0 }"
                    @click="replyTypeChange(0, replyInfo.sum_count)"
                  >
                    全部({{ replyInfo.sum_count }})
                  </div>
                  <div
                    class="item"
                    :class="{ on: reply.type === 1 }"
                    @click="replyTypeChange(1, replyInfo.good_count)"
                  >
                    好评({{ replyInfo.good_count }})
                  </div>
                  <div
                    class="item"
                    :class="{ on: reply.type === 2 }"
                    @click="replyTypeChange(2, replyInfo.in_count)"
                  >
                    中评({{ replyInfo.in_count }})
                  </div>
                  <div
                    class="item"
                    :class="{ on: reply.type === 3 }"
                    @click="replyTypeChange(3, replyInfo.poor_count)"
                  >
                    差评({{ replyInfo.poor_count }})
                  </div>
                </div>
              </div>
              <div class="comment-bd">
                <template v-if="replyList.length">
                  <div v-for="item in replyList" :key="item.id" class="item">
                    <div class="acea-row row-middle item-hd">
                      <div class="image">
                        <img :src="item.avatar" />
                      </div>
                      <div class="text">
                        <div class="acea-row row-middle name">
                          {{ item.nickname }}
                          <div class="star">
                            <span
                              v-for="(v, i) in 5"
                              :key="i"
                              class="iconfont icon-pingjia"
                              :class="{ on: i + 1 <= item.star }"
                            ></span>
                          </div>
                        </div>
                        <div>{{ item.add_time }}</div>
                      </div>
                    </div>
                    <div class="item-bd">
                      <div>{{ item.comment }}</div>
                      <div class="image-wrapper">
                        <div
                          v-for="(itm, idx) in item.pics"
                          :key="idx"
                          class="image"
                          @click="isDialog = true"
                        >
                          <el-image
                            style="width: 54px; height: 54px"
                            :src="itm"
                            :preview-src-list="item.pics"
                          ></el-image>
                        </div>
                      </div>
                      <div v-if="item.merchant_reply_content" class="reply">
                        <div class="item">
                          <span>店小二：</span>{{ item.merchant_reply_content }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <img
                  v-else-if="!reply.loading"
                  src="@/assets/images/noEvaluate.png"
                />
              </div>
              <div v-if="replyList.length" class="acea-row row-right">
                <el-pagination
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  :page-size="reply.limit"
                  :total="replyCount"
                  @current-change="callPaginate"
                  @prev-click="callPaginate"
                  @next-click="callPaginate"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="goodsList && goodsList.length" class="recom-section">
        <div class="title"><span>优品推荐</span></div>
        <div class="list">
          <div
            v-for="(item, index) in goodsList"
            :key="index"
            @click="goDetail(item)"
            v-if="index < 5"
            class="item"
          >
            <div class="image">
              <img :src="item.image" />
            </div>
            <div class="text">
              <div class="name">{{ item.store_name }}</div>
              <div class="acea-row row-between-wrapper">
                <div class="money">
                  ￥<span>{{ item.price }}</span>
                </div>
                <div class="sales">销量 {{ item.sales }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <chat-room
      v-show="chatOptions.show"
      :chat-options="chatOptions"
      @chat-close="chatClose"
      @socket-open="socketOpen"
      @socket-error="socketError"
    ></chat-room>
    <ffVip :showCode="showCode" @changeVip="changeVip"></ffVip>
  </div>
</template>

<script>
import countDown from "@/components/countDown";
import ChatRoom from "@/components/ChatRoom";
import ffVip from "@/components/ffVip";
import appChat from "@/mixins/appChat";
export default {
  components: { countDown, ChatRoom, ffVip },
  auth: false,
  mixins: [appChat],
  data() {
    let that = this;
    return {
      moneyLevel: -1,
      showCode: false,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
      },
      slideIndex: 0,
      tabIndex: 0,
      reply: {
        type: 0,
        page: 1,
        limit: 20,
        loading: false,
        finished: false,
      },
      coupon: {
        page: 1,
        limit: 3,
        finished: false,
      },
      attrSelected: [],
      attrValueSelected: null,
      count: 1,
      stock: 1,
      unique: "",
      couponHide: false,
      codeUrl: "",
      qrcodeShow: false,
      isDialog: false,
      replyCount: 0,
    };
  },
  computed: {
    makeCouponList() {
      return this.couponList.map((value) => {
        switch (value.type) {
          case 0:
            value.type = "通用券";
            break;
          case 1:
            value.type = "品类券";
            break;
          case 2:
            value.type = "商品券";
            break;
        }
        return value;
      });
    },
  },
  watch: {
    productAttr: {
      immediate: true,
      handler(attr) {
        attr.forEach((value, index) => {
          this.attrSelected[index] = value.attr_values[0];
        });
      },
    },
    attrSelected: {
      immediate: true,
      handler(attr) {
        if (attr.length) {
          let name = attr.join(),
            value = this.productValue[name];
          if (value) {
            this.attrValueSelected = value;
            this.stock = value.stock;
            this.unique = value.unique;
          }
        } else {
          this.stock = this.storeInfo.stock;
        }
      },
    },
  },
  async asyncData({ app, params, query }) {
    let [goods, coupon, replyInfo, replyList, phoneBuy] = await Promise.all([
      app.$axios.get(`/product/detail/${params.id}`),
      app.$axios.get(`/coupons`, {
        params: {
          product_id: params.id,
        },
      }),
      app.$axios.get(`/reply/config/${params.id}`),
      app.$axios.get(`/reply/list/${params.id}`, {
        params: {
          page: 1,
          limit: 20,
          type: 0,
        },
      }),
      app.$axios.get("/pc/get_product_phone_buy"),
    ]);
    return {
      storeInfo: goods.data.storeInfo,
      productAttr: goods.data.productAttr,
      productValue: goods.data.productValue,
      goodsList: goods.data.good_list,
      couponList: coupon.data,
      replyInfo: replyInfo.data,
      replyList: replyList.data,
      datatime: Number(query.time),
      phoneBuy: phoneBuy.data,
      replyCount: replyInfo.data.sum_count,
    };
  },
  head() {
    return {
      title: this.storeInfo.store_name + "-" + this.$store.state.titleCon,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  created() {
    switch (this.phoneBuy.phone_buy) {
      case "1":
        this.codeUrl = `${this.phoneBuy.sit_url}/pages/goods_details/index?id=${this.$route.params.id}`;
        break;
      case "2":
        this.getAppletCodeUrl();
        break;
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.moneyLevel = this.$auth.user.is_money_level;
    } else {
      this.moneyLevel = -1;
    }
    this.$nextTick(() => {
      document.body.setAttribute("style", "background:#ffffff");
    });
  },
  beforeDestroy() {
    document.body.removeAttribute("style");
  },
  methods: {
    goDetail(item) {
      let path = item.presale
        ? (path = {
            path: "/goods_presell_detail",
            query: {
              id: item.id,
            },
          })
        : (path = { path: `/goods_detail/${item.id}` });
      this.$router.push(path);
    },
    changeVip(e) {
      this.showCode = e;
    },
    inputNum() {
      this.count = parseInt(this.count) >= this.stock ? this.stock : this.count;
      this.count = parseInt(this.count) <= 1 ? 1 : this.count;
    },
    swiperMouseover(index) {
      this.slideIndex = index;
    },
    // 获取商品小程序地址
    getAppletCodeUrl() {
      this.$axios
        .get(`/pc/get_product_code/${this.$route.params.id}`)
        .then((res) => {
          this.codeUrl = res.data.routineCode;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    callPaginate(num) {
      this.reply.page = num;
      this.getReply(num);
    },
    tab(type) {
      this.tabIndex = type;
    },
    replyTypeChange(type, count) {
      this.replyCount = count;
      this.reply.type = type;
      this.reply.page = 1;
      this.replyList = [];
      this.$axios
        .get(`/reply/list/${this.$route.params.id}`, {
          params: {
            page: this.reply.page,
            limit: this.reply.limit,
            type: type,
          },
        })
        .then((res) => {
          this.replyList = this.replyList.concat(res.data);
        });
    },
    // 优惠券列表
    getCouponList() {
      this.couponHide = !this.couponHide;
    },
    // 加入购物车 | 立即购买
    buy(type, event) {
      if (typeof this.count === "string") {
        if (this.count.trim() === "") {
          return this.$message.error("请输入您要购买的数量");
        }
      }
      let btn = event.target;
      btn.disabled = true;
      this.$axios
        .post("/cart/add", {
          productId: this.$route.params.id,
          cartNum: this.count,
          new: type,
          uniqueId: this.unique,
        })
        .then((res) => {
          btn.disabled = false;
          if (type) {
            this.$router.push({
              path: `/order_confirm?new=1&cartId=${res.data.cartId}`,
            });
          } else {
            this.$store.commit(
              "cartNum",
              parseInt(this.count) + parseInt(this.$store.state.cartnumber)
            );
            this.$message.success("加入购物车成功");
          }
        })
        .catch((err) => {
          btn.disabled = false;
          this.$message.error(err);
        });
    },
    minus() {
      this.count--;
    },
    plus() {
      this.count++;
    },
    // 领取优惠券
    getCoupon(id) {
      if (!this.$auth.loggedIn) {
        return this.$router.push("/login");
      }
      this.$axios
        .post("/coupon/receive", {
          couponId: id,
        })
        .then((res) => {
          this.$message.success("领取优惠券成功");
          let index = this.couponList.findIndex((value) => {
            return value.id === id;
          });
          if (index !== -1) {
            this.couponList[index].is_use = true;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 获取评论
    getReply(num) {
      this.reply.loading = true;
      this.$axios
        .get(`/reply/list/${this.$route.params.id}`, {
          params: {
            page: num,
            limit: this.reply.limit,
            type: this.reply.type,
          },
        })
        .then((res) => {
          this.replyList = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 收藏 | 取消收藏
    collect() {
      // if (!this.$auth.loggedIn) {
      //   return this.$router.push("/login");
      // }
      if (this.storeInfo.userCollect) {
        this.$axios
          .post("/collect/del", {
            id: this.$route.params.id,
            category: "product",
          })
          .then((res) => {
            this.$message.success("取消收藏成功");
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.$axios
          .post("/collect/add", {
            id: this.$route.params.id,
            category: "product",
          })
          .then((res) => {
            this.$message.success("收藏成功");
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
      this.storeInfo.userCollect = !this.storeInfo.userCollect;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-detail {
  padding-top: 40px;
  border-top: 1px solid #efefef;

  > div {
    > div {
      ~ div {
        margin-left: 40px;
      }
    }
  }

  .goods-main {
    flex: 1;
    min-width: 0;
  }
  .carousel {
    width: 380px;
    overflow: hidden;

    .preview {
      display: block;
      width: 380px;
      height: 380px;
    }

    .swiper-container {
      padding-right: 25px;
      padding-left: 25px;
      margin-top: 10px;
      margin-bottom: 20px;

      .swiper-button-prev,
      .swiper-button-next {
        top: 0;
        width: 25px;
        height: 100%;
        margin-top: 0;
        background-color: rgba(0, 0, 0, 0.3);
        background-size: 12px 22px;
      }

      .swiper-button-prev {
        left: 0;
      }

      .swiper-button-next {
        right: 0;
      }

      .swiper-slide {
        width: 70px;
        height: 70px;
        border: 2px solid transparent;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;

        &.on {
          border-color: #e93323;
        }

        ~ .swiper-slide {
          margin-left: 10px;
        }

        img {
          display: block;
          width: 70px;
          height: 70px;
        }
      }
    }

    .btn {
      margin-right: 30px;
      font-size: 12px;
      color: #4b4b4b;
      cursor: pointer;
    }

    .iconfont {
      margin-right: 6px;
      font-size: 14px;
      color: #e93323;
    }
  }

  .text-wrapper {
    flex: 1;
    min-width: 0;
    margin-left: 40px;

    .title {
      font-size: 20px;
      line-height: 26px;
      color: #333333;
    }

    .money-wrapper {
      height: 78px;
      margin-top: 18px;
      background: url("~assets/images/money-back.png") center/cover no-repeat;
      color: #ffffff;

      .money-wrap {
        flex: 1;
        min-width: 0;
        padding-left: 32px;
      }

      del {
        margin-bottom: 10px;
        font-size: 14px;
      }

      .price {
        font-size: 22px;

        span {
          font-weight: bold;
          font-size: 30px;
        }
      }

      .vip {
        width: 100px;
        height: 25px;
        border-radius: 2px;
        margin-left: 14px;
        background: linear-gradient(205deg, #fdcaa4 0%, #fce3c3 100%);
        overflow: hidden;
        font-size: 12px;
        color: #0f0f0f;

        .iconfont {
          width: 32px;
          background: url("~assets/images/svip.png") center/cover no-repeat;
          height: 25px;
        }

        .iconfontVip {
          width: 32px;
          background: url("~assets/images/vip.png") center/cover no-repeat;
          height: 25px;
        }

        .money {
          flex: 1;
          min-width: 0;

          span {
            font-size: 14px;
          }
        }
      }

      .sales {
        position: relative;
        height: 100%;
        padding-right: 20px;
        padding-left: 20px;
        font-size: 12px;

        &::before {
          content: "";
          position: absolute;
          top: 14px;
          bottom: 12px;
          left: 0;
          width: 1px;
          border-left: 1px solid rgba(255, 255, 255, 0.24);
        }

        .num {
          margin-bottom: 3px;
          font-weight: bold;
          font-size: 18px;
        }
      }

      .timer-wrapper {
        width: 180px;
        margin-right: 15px;
        font-size: 12px;
        color: #ffffff;

        /deep/.styleAll {
          width: 24px;
          height: 24px;
          margin-right: 3px;
          margin-left: 3px;
          background-color: #ffffff;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #e93323;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }

        .progress-group {
          margin-top: 10px;
        }

        .progress {
          width: 120px;
          height: 8px;
          border: 1px solid #ffffff;
          border-radius: 4px;
          font-size: 0;

          span {
            display: inline-block;
            width: 50%;
            height: 100%;
            border-radius: 4px;
            background-color: #ffffff;
          }
        }
      }
    }

    .coupon-wrapper {
      background-color: #f7f7f7;

      .coupon-bd {
        padding-top: 18px;
        padding-bottom: 18px;
        font-size: 12px;
        color: #5a5a5a;

        .label {
          width: 80px;
          padding-left: 20px;
        }

        .list {
          flex: 1;
          min-width: 0;
          padding-right: 24px;
          max-height: 240px;
          overflow-y: auto;
          overflow-x: hidden;

          &.on {
            max-height: 100px;
            overflow: hidden;
          }
        }

        .item {
          margin-top: 11px;

          &:first-child {
            margin-top: 0;
          }
        }

        .cell-left {
          width: 65px;
        }

        .cell-right {
          flex: 1;
          min-width: 0;
          color: #e93323;
        }

        .cell {
          width: 165px;
          height: 24px;
          background: url("~assets/images/coupon-back.png") left top/100% 100%
            no-repeat;
          font-size: 13px;
          color: #ffffff;
          &.svip {
            background-image: url("~assets/images/vipCou.png");
            color: #fdd7b4;
            .cell-right {
              color: #333333;
            }
          }
        }

        .time {
          flex: 1;
          min-width: 0;
          padding-right: 8px;
          padding-left: 8px;
          font-size: 12px;
          color: #727272;
        }

        button {
          border: none;
          border-bottom: 1px solid #e93323;
          background: none;
          font-size: 12px;
          color: #e93323;

          &:disabled {
            border-color: #c0c4cc;
            color: #c0c4cc;
            cursor: not-allowed;
          }
        }
      }

      .coupon-ft {
        height: 36px;
        padding-right: 24px;
        background-color: #f2f2f2;

        .button {
          font-size: 12px;
          color: #666666;
          cursor: pointer;

          .iconfont {
            margin-left: 7px;
            font-size: 10px;
            color: #666666;
          }
        }
      }
    }
    .attribute {
      margin-top: 30px;
      .size-wrapper {
        .label {
          width: 78px;
          padding-left: 20px;
          font-size: 12px;
          color: #5a5a5a;
          margin-right: 2px;
          word-break: break-all;
          margin-top: 8px;
        }

        .list {
          flex: 1;
          min-width: 0;
        }

        .item {
          margin-right: 12px;
          margin-bottom: 16px;
          box-sizing: border-box;
          cursor: pointer;

          .cont {
            position: relative;
            height: 32px;
            border: 1px solid #d3d3d3;
          }

          &:hover {
            .cont {
              border-color: #e93323;
              color: #e93323;
            }
          }

          input:checked {
            + .cont {
              border-color: #e93323;
              color: #e93323;

              .iconfont {
                display: block;
              }
            }
          }
        }

        .image {
          width: 34px;
          height: 34px;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
        }

        .name {
          padding-right: 20px;
          padding-left: 20px;
          font-size: 12px;
        }

        .iconfont {
          position: absolute;
          right: -3px;
          bottom: -3px;
          display: none;
          font-size: 22px;
        }
      }
    }

    .number-wrapper {
      margin-top: 18px;
      align-items: center;

      .label {
        width: 78px;
        padding-left: 20px;
        font-size: 12px;
        color: #5a5a5a;
        margin-right: 2px;
        word-break: break-all;
      }

      .counter-wrap {
        flex: 1;
        min-width: 0;
        span {
          vertical-align: bottom;
          font-size: 14px;
          color: #5a5a5a;
        }
      }

      .counter {
        display: inline-block;
        border: 1px solid #d3d3d3;
        font-size: 0;

        button {
          width: 44px;
          height: 36px;
          border: none;
          background: none;
          outline: none;
          font-weight: inherit;
          font-size: 12px;
          font-family: inherit;
          color: #707070;
          vertical-align: middle;

          &:disabled {
            color: #d0d0d0;
            cursor: not-allowed;
          }
        }

        input {
          width: 64px;
          height: 36px;
          border: none;
          border-right: 1px solid #d3d3d3;
          border-left: 1px solid #d3d3d3;
          outline: none;
          font-weight: inherit;
          font-size: 18px;
          font-family: inherit;
          text-align: center;
          color: #5a5a5a;
          vertical-align: middle;
        }
      }
    }

    .button-wrapper {
      margin-top: 46px;
      font-size: 0;

      .btn {
        width: 158px;
        height: 50px;
        border: 1px solid #e93323;
        border-radius: 4px;
        font-size: 16px;
        color: #e93323;

        ~ .btn {
          margin-left: 18px;
        }
      }

      button {
        background: none;
        outline: none;
        vertical-align: middle;

        &:disabled {
          border-color: #ebeef5;
          color: #c0c4cc;
          cursor: not-allowed;
        }

        &.cart {
          background-color: #e93323;
          color: #ffffff;

          &:disabled {
            border-color: #fab6b6;
            background-color: #fab6b6;
          }
        }

        ~ button {
          margin-left: 18px;
        }
      }

      a {
        display: inline-block;
        background-color: #e93323;
        vertical-align: middle;
        line-height: 50px;
        text-align: center;

        &.btn {
          color: #ffffff;
        }
      }
    }
  }

  .detail-wrapper {
    margin-top: 70px;

    .detail-hd {
      background-color: #f7f7f7;

      .tab {
        flex: 1;
        min-width: 0;
      }

      .item {
        position: relative;
        height: 56px;
        padding-right: 30px;
        padding-left: 30px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;

        &.on {
          background: url("~assets/images/checked.png") center top/100% 7px
            no-repeat;
          color: #e93323;
        }

        &::before {
          content: "";
          position: absolute;
          top: 18px;
          bottom: 18px;
          left: 0;
          width: 1px;
          border-left: 1px solid #d9d9d9;
        }

        &:first-child::before {
          display: none;
        }

        &:hover {
          color: #e93323;
        }
      }

      .qrcode-button {
        position: relative;
        width: 160px;
        height: 56px;
        background-color: #ededed;
        font-size: 14px;
        color: #333333;
        cursor: pointer;

        &:hover {
          .qrcode {
            display: block;
          }
        }

        .icon-saoma {
          margin-right: 6px;
          font-size: 13px;
          line-height: 1;
          color: #000000;
        }

        .icon-xiangxia2,
        .icon-xiangshang1 {
          margin-left: 10px;
          font-size: 10px;
          line-height: 12px;
          color: #d0d0d0;
        }

        .qrcode {
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 99;
          display: none;
          width: 160px;
          height: 160px;
          padding: 6px;
          background-color: #ffffff;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .detail-bd {
      min-height: 165px;
      .detail-html {
        /deep/div {
          width: 100% !important;
        }

        /deep/img {
          display: block;
          width: 100% !important;
        }
      }
    }

    .comment {
      .comment-hd {
        padding-top: 30px;
        padding-bottom: 30px;

        .rate {
          font-size: 0;

          span {
            font-size: 14px;
            color: #e93323;

            ~ span {
              margin-left: 5px;
            }
          }
        }

        .score {
          font-size: 14px;
          color: #7e7e7e;

          .cont {
            margin-left: 8px;
          }

          .iconfont {
            font-size: 12px;
            color: #e6e6e6;

            ~ .iconfont {
              margin-left: 5px;
            }

            &.on {
              color: #e93323;
            }
          }
        }

        .menu {
          margin-top: 20px;
          font-size: 0;

          .item {
            display: inline-block;
            width: 86px;
            height: 34px;
            border-radius: 2px;
            background-color: #f7f7f7;
            font-size: 14px;
            line-height: 34px;
            text-align: center;
            color: #282828;
            cursor: pointer;

            &:hover {
              color: #e93323;
            }

            &.on {
              background-color: #e93323;
              color: #ffffff;
            }

            ~ .item {
              margin-left: 14px;
            }
          }
        }
      }

      .comment-bd {
        > img {
          width: 200px;
          margin: 50px auto;
        }

        .item {
          padding-top: 20px;
          padding-bottom: 20px;

          .item-hd {
            .image {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
            }

            img {
              display: block;
              width: 100%;
              height: 100%;
            }

            .text {
              flex: 1;
              margin-left: 12px;
              font-size: 14px;
              color: #868686;
            }

            .name {
              margin-bottom: 4px;
              font-size: 16px;
              color: #282828;
            }

            .star {
              margin-left: 12px;
              font-size: 0;
            }

            .iconfont {
              font-size: 12px;
              color: #e6e6e6;

              &.on {
                color: #e93323;
              }

              ~ .iconfont {
                margin-left: 5px;
              }
            }
          }

          .item-bd {
            padding-bottom: 20px;
            border-bottom: 1px solid #e3e3e3;
            margin-left: 52px;
            font-size: 14px;
            color: #282828;

            > div {
              margin-top: 15px;
            }

            .image-wrapper {
              font-size: 0;
            }

            .image {
              display: inline-block;
              width: 54px;
              height: 54px;
              margin-right: 8px;
              margin-bottom: 10px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .reply {
              background-color: #f7f7f7;

              .item {
                padding: 7px 12px;
                font-size: 14px;
                color: #282828;

                span {
                  color: #e93323;
                }
              }
            }
          }
        }
      }
    }
  }

  .recom-section {
    align-self: flex-start;
    min-width: 210px;
    padding-right: 20px;
    padding-left: 20px;
    border: 1px solid #efefef;
    border-radius: 4px;

    .title {
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      text-align: center;
      color: #5a5a5a;

      span {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          margin-right: 18px;
          width: 35px;
          height: 1px;
          border-top: 1px solid #efefef;
          transform: translateY(-50%);
        }

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 100%;
          margin-left: 18px;
          width: 35px;
          height: 1px;
          border-top: 1px solid #efefef;
          transform: translateY(-50%);
        }
      }
    }

    .item {
      display: block;
      width: 170px;
      margin-bottom: 20px;
      cursor: pointer;
      padding: 10px 0;
      border-bottom: 1px solid #f2f2f2;
      .image {
        width: 170px;
        height: 170px;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .text {
        .name {
          margin-top: 10px;
          margin-bottom: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 13px;
          color: #666666;
        }

        .money {
          font-weight: bold;
          font-size: 14px;
          color: #e93323;

          span {
            font-size: 18px;
          }
        }

        .sales {
          font-size: 12px;
          color: #888888;
        }
      }
    }
  }

  .el-pagination {
    padding: 0;
    border: 1px solid #cccccc;

    /deep/button {
      width: 78px;
      height: 38px;
      padding: 0;
      font-size: 15px;
      color: #707070;

      &.btn-prev {
        border-right: 1px solid #cccccc;
      }

      &.btn-next {
        border-left: 1px solid #cccccc;
      }
    }

    /deep/li {
      width: 38px;
      height: 38px;
      padding: 0;
      font-weight: normal;
      font-size: 15px;
      line-height: 38px;
      color: #707070;

      ~ li {
        border-left: 1px solid #cccccc;
      }

      &.active {
        background-color: #e93323;
        color: #ffffff;
      }
    }
  }

  .nothing {
    margin-top: 100px;
    font-size: 16px;
    text-align: center;
    color: #999999;

    img {
      margin: 0 auto;
    }
  }
}
</style>
