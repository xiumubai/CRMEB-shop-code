<template>
  <div class="index wrapper_1200">
    <!--轮播分类-->
    <div class="wrapper">
      <div class="slider-banner banner">
        <client-only>
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <nuxt-link
                :to="item.url === undefined ? '' : item.url"
                class="swiper-slide"
                v-for="(item, index) in swiperData"
                :key="index"
                v-if="index < 10"
              >
                <img :src="item.image" />
              </nuxt-link>
            </div>
            <div
              class="swiper-pagination paginationBanner"
              slot="pagination"
            ></div>
            <div class="swiper-button-prev" slot="pagination"></div>
            <div class="swiper-button-next" slot="pagination"></div>
          </div>
        </client-only>
      </div>
      <div class="category acea-row row-middle" @mouseleave="leave()">
        <div class="sort">
          <div
            class="item acea-row row-between-wrapper"
            :class="index === current ? 'bg-color' : ''"
            v-for="(item, index) in categoryList"
            :key="index"
            v-if="index < 10"
            @mouseenter="enter(index)"
          >
            <div class="name line1">{{ item.cate_name }}</div>
            <div class="iconfont icon-you"></div>
          </div>
        </div>
        <div class="sortCon scale-up-hor-left" v-if="seen">
          <!--<div class="title">-->
          <!--<span class="font-color">{{ categoryCurrent.cate_name }}</span>-->
          <!--</div>-->
          <div class="erSort acea-row row-top">
            <div
              @click="goCate(item, index)"
              class="item acea-row row-middle"
              v-for="(item, index) in categoryCurrent.children"
              :key="index"
            >
              <div class="pictrue">
                <img :src="item.pic" v-if="item.pic" />
                <img src="~assets/images/no_sort.jpg" alt="" v-else />
              </div>
              <div class="name line1">{{ item.cate_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--秒杀-->
    <div class="seckill acea-row row-middle" v-if="seckillList.length">
      <div class="header">
        <div class="title">限时秒杀</div>
        <div class="timeCurrent">
          <span>{{ currentTime }}</span
          >点场
        </div>
        <div class="lines"></div>
        <div class="tip">距离结束还剩</div>
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
      <div class="seckillList">
        <div v-swiper:myScroll="swiperScroll">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide item"
              v-for="(item, index) in seckillList"
              :key="index"
            >
              <div
                class="picTxt"
                @click="
                  goSeckillDetail(
                    item.id,
                    item.product_id,
                    datatime,
                    dataStatus
                  )
                "
              >
                <div class="pictrue"><img :src="item.image" /></div>
                <div class="name line1">{{ item.title }}</div>
                <div class="money">
                  <span class="font-color">¥{{ item.price }}</span
                  ><span class="y_money">¥{{ item.ot_price }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev" slot="pagination"></div>
          <div class="swiper-button-next" slot="pagination"></div>
        </div>
      </div>
    </div>
    <!--精品推荐-->
    <div class="boutique" v-if="boutiqueTwo.length">
      <div class="publicTitle acea-row row-between-wrapper">
        <div class="title acea-row row-middle">
          <div class="pictrue">
            <img src="../assets/images/boutiqueTitle.png" />
          </div>
          <div>诚意推荐 品质商品</div>
        </div>
        <nuxt-link
          :to="{ path: '/goods_list', query: { type: 1 } }"
          class="more acea-row row-center-wrapper"
        >
          更多<span class="iconfont icon-you"></span>
        </nuxt-link>
      </div>
      <div class="list acea-row row-middle">
        <div
          class="oneItem acea-row row-between"
          @click="goDetail(boutiqueOne)"
        >
          <div class="text">
            <div class="name line2">{{ boutiqueOne.store_name }}</div>
            <div class="info line1">{{ boutiqueOne.store_info }}</div>
            <div class="money">
              <span class="font-color">¥{{ boutiqueOne.price }}</span
              ><span class="y_money">¥{{ boutiqueOne.ot_price }}</span>
            </div>
          </div>
          <div class="pictrue">
            <img :src="boutiqueOne.image" v-if="boutiqueOne.image" />
            <img src="~assets/images/no_goods.jpg" alt="" v-else />
          </div>
        </div>
        <div
          class="item"
          v-for="(item, index) in boutiqueTwo"
          :key="index"
          v-if="index < 2"
          @click="goDetail(item)"
        >
          <div class="name line1">{{ item.store_name }}</div>
          <div class="font-color">¥{{ item.price }}</div>
          <div class="y_money">¥{{ item.ot_price }}</div>
          <div class="pictrue">
            <img :src="item.image" v-if="item.image" />
            <img src="~assets/images/no_goods.jpg" alt="" v-else />
          </div>
        </div>
      </div>
    </div>
    <!--首发新品-->
    <div class="newGoods" v-if="newGoods.length">
      <div class="publicTitle acea-row row-between-wrapper">
        <div class="title acea-row row-middle">
          <div class="pictrue">
            <img src="../assets/images/newsTitle.png" />
          </div>
          <div>永远好奇 永远年轻</div>
        </div>
        <nuxt-link
          :to="{ path: '/goods_list', query: { type: 3 } }"
          class="more acea-row row-center-wrapper"
        >
          更多<span class="iconfont icon-you"></span>
        </nuxt-link>
      </div>
      <div class="list acea-row row-middle">
        <div
          class="item"
          v-for="(item, index) in newGoods"
          v-if="index < 5"
          @click="goDetail(item)"
        >
          <div class="pictrue">
            <img :src="item.image" v-if="item.image" />
            <img src="~assets/images/no_goods.jpg" alt="" v-else />
          </div>
          <div class="name line1">{{ item.store_name }}</div>
          <div class="money line1">
            <span class="label">优惠价</span>
            <span class="font-color">¥{{ item.price }}</span>
            <span class="y_money">¥{{ item.ot_price }}</span>
          </div>
          <div class="stock">已抢 {{ item.sales }}{{ item.unit_name }}</div>
        </div>
      </div>
    </div>
    <!--分类-->
    <div class="classify">
      <div class="list" v-for="(item, index) in classifyList" :key="index">
        <div class="title acea-row row-between-wrapper">
          <div class="name">{{ item.cate_name }}</div>
          <nuxt-link
            :to="{
              path: '/goods_cate',
              query: { cid: item.id, cidIndex: index },
            }"
            class="more acea-row row-center-wrapper"
          >
            更多<span class="iconfont icon-you"></span>
          </nuxt-link>
        </div>
        <div class="acea-row row-middle">
          <div class="itemOne">
            <nuxt-link
              :to="{
                path: '/goods_cate',
                query: { cid: item.id, cidIndex: index },
              }"
              class="more acea-row row-center-wrapper"
            >
              <img :src="item.big_pic" v-if="item.big_pic" />
              <img src="~assets/images/no_goods.jpg" alt="" v-else />
            </nuxt-link>
          </div>
          <div
            class="item"
            v-for="(itemn, indexn) in item.productList"
            :key="indexn"
            @click="goDetail(itemn)"
          >
            <div class="pictrue">
              <img :src="itemn.image" v-if="itemn.image" />
              <img src="~assets/images/no_goods.jpg" alt="" v-else />
            </div>
            <div class="money acea-row row-between-wrapper">
              <div>
                <span class="font-color">¥{{ itemn.price }}</span
                ><span class="y_money">¥{{ itemn.ot_price }}</span>
              </div>
              <div class="label font-color" v-if="itemn.couponId.length">
                券
              </div>
            </div>
            <div class="name line2">{{ itemn.store_name }}</div>
            <div class="payment acea-row row-between-wrapper">
              <span>{{ itemn.sales }}人付款</span>
              <span>{{ itemn.star }}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="loadingicon acea-row row-center-wrapper"
      v-if="classifyList.length && classifyList.length >= limit"
    >
      <span class="loading iconfont icon-jiazai" v-if="!pullRefreshss"></span
      >{{ title }}
    </div>
  </div>
</template>

<script>
import countDown from "@/components/countDown";
export default {
  name: "index",
  auth: false,
  components: {
    countDown,
  },
  data() {
    return {
      seen: false,
      current: -1,
      swiperData: [],
      categoryList: [],
      categoryCurrent: {},
      datatime: 0,
      dataStatus: 0,
      currentTime: "00:00",
      seckillList: [],
      boutiqueOne: {},
      boutiqueTwo: [],
      newGoods: [],
      classifyList: [], //初始数据代码
      pullRefreshss: true,
      page: 1, //代表页面的初始页数
      limit: 3,
      scollY: null, // 离底部距离有多少
      pageTotal: 0, //总页数
      title: "下拉加载更多",
      swiperOption: {
        pagination: {
          el: ".paginationBanner",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true,
      },
      swiperScroll: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
      },
    };
  },
  async asyncData({ app }) {
    let [categoryMsg, seckillMsg, indexMsg, bannerMsg] = await Promise.all([
      //获取banner分类
      app.$axios.get("/category"),
      app.$axios.get("/seckill/index"),
      app.$axios.get("/index"),
      app.$axios.get("/pc/get_banner"),
    ]);
    return {
      categoryList: categoryMsg.data,
      seckillTime: seckillMsg.data,
      boutiqueOne: indexMsg.data.info.bastList.length
        ? indexMsg.data.info.bastList.shift()
        : {},
      boutiqueTwo: indexMsg.data.info.bastList,
      newGoods: indexMsg.data.info.firstList,
      // logoUrl: indexMsg.data.logoUrl,
      swiperData: bannerMsg.data.list,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "首页",
    };
  },
  created() {
    this.getClassifyList();
    // this.$store.commit('logo', this.logoUrl);
    // this.$cookies.set('logo',this.logoUrl);
  },
  mounted() {
    this.getSeckillIndexTime();
    this.pullRefresh();
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    goCate(item, index) {
      this.$router.push({
        path: "/goods_cate",
        query: {
          cid: this.categoryCurrent.id,
          sid: item.id,
          cidIndex: this.current,
          sidIndex: index,
        },
      });
    },
    getSeckillIndexTime() {
      let seckillTime = this.seckillTime;
      if (seckillTime.seckillTimeIndex < 0) return;
      this.datatime =
        seckillTime.seckillTime[seckillTime.seckillTimeIndex].stop;
      this.dataStatus =
        seckillTime.seckillTime[seckillTime.seckillTimeIndex].status;
      this.currentTime =
        seckillTime.seckillTime[seckillTime.seckillTimeIndex].time;
      let id = seckillTime.seckillTime[seckillTime.seckillTimeIndex].id;
      this.$axios
        .get("/seckill/list/" + id, {
          page: 1,
          limit: 10,
          type: "index",
        })
        .then((res) => {
          this.seckillList = res.data;
        });
    },
    enter(index) {
      this.seen = true;
      this.current = index;
      this.categoryCurrent = this.categoryList[index];
    },
    leave() {
      this.seen = false;
      this.current = -1;
    },
    getClassifyList() {
      let _this = this,
        currentPage = { page: this.page, limit: this.limit };
      _this.$axios
        .get("/pc/get_category_product", {
          params: currentPage,
        })
        .then(function (res) {
          _this.pageTotal = res.data.count;
          // 请求完成后，把得到的数据拼接到当前dom里面
          _this.classifyList = _this.classifyList.concat(res.data.list);
        })
        .catch(function (err) {
          _this.$message.error(err);
        });
    },
    // 下拉加载ajax
    pullRefresh: function () {
      let _this = this;
      window.onscroll = function () {
        _this.scrollChange();
      };
    },
    scrollChange: function () {
      var _this = this;
      this.scollY =
        this.comsys.getScrollTop() +
        this.comsys.getWindowHeight() -
        this.comsys.getScrollHeight();
      // 把下拉刷新置为false，防止多次请求
      if (this.scollY >= -50) {
        if (this.page > Math.ceil(this.pageTotal / this.limit)) {
          this.title = "已没有更多数据";
          this.pullRefreshss = true;
          return false;
        }
        if (!this.pullRefreshss) {
          return false;
        }
        _this.pullRefreshss = false;
        this.title = "正在加载中....";
        // 加页码数
        this.page++;
        _this.getClassifyList();
      } else {
        // 其他时候把下拉刷新置为true
        _this.pullRefreshss = true;
        this.title = "下拉加载更多";
      }
    },
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
    goSeckillDetail: function (id, productId, time, status) {
      this.$router.push({
        path: "/goods_seckill_detail",
        query: { id: id, productId: productId, time: time, status: status },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.index {
  .publicTitle {
    margin-top: 30px;
    .title {
      color: #8b8b8b;
      .pictrue {
        width: 110px;
        height: 30px;
        margin-right: 13px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .more {
      width: 58px;
      height: 24px;
      border: 1px solid #c6c6c6;
      color: #818181;
      font-size: 12px;
      cursor: pointer;
      .iconfont {
        font-size: 10px;
      }
    }
  }
  .wrapper {
    height: 420px;
    position: relative;
    cursor: pointer;
    .banner {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .category {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      height: 100%;
    }
    .sort {
      width: 208px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 14px 0;
      .item {
        height: 39px;
        padding: 0 21px;
        .name {
          width: 150px;
        }
        .iconfont {
          font-size: 10px;
        }
      }
    }
    .sortCon {
      width: 664px;
      height: 100%;
      background-color: #fff;
      box-shadow: 5px 1px 10px rgba(0, 0, 0, 0.2);
      border: 1px solid #f2f2f2;
      border-left: 0;
      border-right: 0;
      padding: 0 5px 20px 29px;
      .title {
        padding-bottom: 8px;
        border-bottom: 1px solid #f1f1f1;
        .font-color {
          padding-bottom: 8px;
          font-size: 16px;
          border-bottom: 2px solid #e93323;
        }
      }
      .erSort {
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 400px;
        .item {
          margin-top: 30px;
          width: 25%;

          &:hover {
            .name {
              color: #e93323;
            }
          }
          .name {
            color: #282828;
            margin-left: 14px;
            width: 82px;
          }
          .pictrue {
            width: 50px;
            height: 50px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .seckill {
    margin-top: 30px;
    .header {
      background: url("../assets/images/skillBg.jpg") no-repeat;
      background-size: 100% 100%;
      width: 208px;
      height: 266px;
      color: #fff;
      text-align: center;
      padding: 44px 0;
      font-size: 16px;
      .title {
        font-size: 28px;
        font-weight: bold;
      }
      .timeCurrent {
        margin-top: 20px;
        span {
          font-weight: bold;
        }
      }
      .lines {
        width: 17px;
        height: 2px;
        background: #ffffff;
        margin: 10px auto 0 auto;
      }
      .tip {
        margin-top: 10px;
      }
      .time {
        margin-top: 20px;
      }
    }
    .seckillList {
      width: 992px;
      height: 266px;
      background-color: #fff;
      position: relative;
      .item {
        cursor: pointer;
        display: inline-block;
        width: 248px;
        position: relative;
        padding: 21px 0;
        .picTxt {
          width: 164px;
          margin: 0 auto;
        }
        & ~ .item:before {
          content: " ";
          position: absolute;
          width: 1px;
          height: 98px;
          background-color: #f4f4f4;
          top: 50%;
          margin-top: -49px;
        }
        .pictrue {
          width: 164px;
          height: 164px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          color: #282828;
          text-align: center;
          width: 164px;
          margin: 10px auto 0 auto;
        }
        .money {
          text-align: center;
          width: 164px;
          margin: 12px auto 0 auto;
          .font-color {
            font-weight: bold;
            font-size: 16px;
          }
          .y_money {
            color: #a3a3a3;
            text-decoration: line-through;
            margin-left: 6px;
          }
        }
      }
    }
  }
  .boutique {
    .list {
      margin-top: 14px;
      .oneItem {
        padding: 28px;
        width: 586px;
        height: 250px;
        background: url("../assets/images/boutique1.jpg") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }
        .text {
          width: 310px;
          .name {
            font-size: 18px;
            color: #282828;
          }
          .info {
            font-size: 16px;
            color: #a3a3a3;
            margin-top: 8px;
          }
          .money {
            margin-top: 26px;
            .font-color {
              font-size: 20px;
              font-weight: bold;
            }
            .y_money {
              color: #a3a3a3;
              margin-left: 12px;
              text-decoration: line-through;
            }
          }
        }
        .pictrue {
          width: 194px;
          height: 194px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .item {
        width: 287px;
        height: 250px;
        background: url("../assets/images/boutique2.jpg") no-repeat;
        background-size: 100% 100%;
        padding: 28px;
        position: relative;
        margin-left: 20px;
        cursor: pointer;
        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }

        .name {
          font-size: 18px;
        }
        .font-color {
          font-size: 20px;
          font-weight: bold;
          margin-top: 12px;
        }
        .y_money {
          color: #a3a3a3;
          text-decoration: line-through;
          margin-top: 4px;
        }
        .pictrue {
          width: 130px;
          height: 130px;
          position: absolute;
          right: 28px;
          bottom: 28px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .newGoods {
    .list {
      margin-top: 14px;
      .item {
        width: 224px;
        height: 320px;
        background-color: #fff;
        padding: 16px 16px 22px 16px;
        cursor: pointer;
        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }

        .pictrue {
          width: 192px;
          height: 192px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin-top: 12px;
        }
        .money {
          margin-top: 10px;
          .label {
            background: url("../assets/images/label.jpg") no-repeat;
            background-size: 100% 100%;
            width: 45px;
            height: 20px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 20px;
            display: inline-block;
          }
          .font-color {
            font-size: 18px;
            font-weight: bold;
            margin-left: 10px;
          }
          .y_money {
            font-size: 12px;
            color: #a3a3a3;
            margin-left: 10px;
            text-decoration: line-through;
          }
        }
        .stock {
          color: #969696;
          font-size: 12px;
          margin-top: 14px;
        }
        & ~ .item {
          margin-left: 20px;
        }
      }
    }
  }
  .classify {
    width: 1250px;
    .list {
      margin-top: 30px;
      .title {
        .name {
          font-size: 22px;
          color: #333333;
          font-weight: bold;
        }
        .more {
          width: 58px;
          height: 24px;
          border: 1px solid #c6c6c6;
          font-size: 12px;
          color: #818181;
          margin-right: 50px;
          cursor: pointer;
          .iconfont {
            font-size: 10px;
          }
        }
      }
      .itemOne {
        width: 468px;
        height: 340px;
        margin: 20px 20px 0 0;
        cursor: pointer;
        background-color: #fff;
        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }

        img {
          width: 100%;
          height: 340px;
          object-fit: contain;
        }
      }
      .item {
        width: 224px;
        height: 340px;
        background-color: #fff;
        padding: 16px;
        margin: 20px 20px 0 0;
        cursor: pointer;
        &:hover {
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }

        .pictrue {
          width: 192px;
          height: 192px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .money {
          margin-top: 12px;
          .font-color {
            font-size: 22px;
            font-weight: bold;
          }
          .y_money {
            color: #aaaaaa;
            font-size: 12px;
            text-decoration: line-through;
            margin-left: 8px;
          }
          .label {
            width: 20px;
            height: 20px;
            background: linear-gradient(
              330deg,
              rgba(231, 85, 67, 0.15) 0%,
              rgba(244, 103, 83, 0.15) 100%
            );
            font-size: 12px;
            text-align: center;
            line-height: 20px;
          }
        }
        .name {
          margin-top: 8px;
          color: #5a5a5a;
          height: 37px;
        }
        .payment {
          font-size: 12px;
          color: #aaaaaa;
          margin-top: 10px;
        }
      }
    }
  }
}
.scale-up-hor-left {
  -webkit-animation: scale-up-hor-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-hor-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes scale-up-hor-left {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}
@keyframes scale-up-hor-left {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}
</style>
