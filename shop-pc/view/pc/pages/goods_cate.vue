<template>
  <div class="goods_cate">
    <div class="title wrapper_1200">
      <nuxt-link class="home" to="/">首页 > </nuxt-link>{{ titleName }}
    </div>
    <div class="nav">
      <div class="navCon wrapper_1200 acea-row row-between-wrapper">
        <div class="list acea-row row-middle">
          <div
            class="item"
            :class="current === index ? 'font-color' : ''"
            v-for="(item, index) in categoryList"
            :key="index"
            @click="category(index)"
          >
            {{ item.cate_name }}
          </div>
        </div>
        <div class="moreCon" @mouseleave="leave()">
          <div
            class="more"
            :class="current === -1 ? 'font-color' : ''"
            @mouseenter="enter"
          >
            <span class="iconfont icon-gengduofenlei"></span>更多分类
          </div>
          <div class="moreCategory acea-row row-middle" v-if="seen">
            <div
              class="item"
              :class="moreCurrent === index ? 'font-color' : ''"
              v-for="(item, index) in categoryList"
              :key="index"
              @click="moreItem(index)"
            >
              {{ item.cate_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper wrapper_1200">
      <div class="acea-row">
        <div class="name">分类：</div>
        <div class="list acea-row row-middle">
          <div
            class="item"
            :class="erCurrent === index ? 'font-color' : ''"
            v-for="(item, index) in categoryCurrent"
            :key="index"
            @click="erCategory(item.id, index)"
          >
            {{ item.cate_name }}
          </div>
        </div>
      </div>
      <div class="sort acea-row">
        <div class="name">排序：</div>
        <div class="acea-row row-middle">
          <div
            class="item"
            :class="iSdefaults === 0 ? 'font-color' : ''"
            @click="defaults"
          >
            默认
          </div>
          <div
            class="item"
            :class="iSdefaults === 1 ? 'font-color' : ''"
            @click="priceSort('desc')"
            v-if="priceOrder === 'asc'"
          >
            价格
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiageshaixuanshang"></use>
            </svg>
          </div>
          <div
            class="item"
            :class="iSdefaults === 1 ? 'font-color' : ''"
            @click="priceSort('asc')"
            v-else-if="priceOrder === ''"
          >
            价格
            <span class="iconfont icon-jiageshaixuan"></span>
          </div>
          <div
            class="item"
            :class="iSdefaults === 1 ? 'font-color' : ''"
            @click="priceSort('')"
            v-else
          >
            价格
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiageshaixuanxia"></use>
            </svg>
          </div>
          <div
            class="item"
            :class="iSdefaults === 2 ? 'font-color' : ''"
            @click="timeNews"
          >
            上架时间
            <span
              class="iconfont icon-shangjiashijian"
              :class="news ? 'font-color' : ''"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper_1200">
      <div class="goods acea-row row-middle" v-if="productslist.length">
        <div
          class="item"
          v-for="(item, index) in productslist"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="pictrue"><img :src="item.image" /></div>
          <div class="money acea-row row-between-wrapper">
            <div>
              <span class="font-color">¥{{ item.price }}</span
              ><span class="y_money">¥{{ item.ot_price }}</span>
            </div>
            <div class="label font-color" v-if="item.checkCoupon">券</div>
          </div>
          <div class="name line2">{{ item.store_name }}</div>
          <div class="bottom acea-row row-between-wrapper">
            <div>{{ item.sales }}人付款</div>
            <div>{{ item.star }}分</div>
          </div>
        </div>
      </div>
      <div
        class="loadingicon acea-row row-center-wrapper"
        v-if="productslist.length && productslist.length >= limit"
      >
        <span class="loading iconfont icon-jiazai" v-if="!pullRefreshss"></span
        >{{ title }}
      </div>
    </div>
    <div class="noGoods" v-if="!productslist.length">
      <div class="pictrue">
        <img src="../assets/images/noGoods.png" />
      </div>
      <div class="name">亲，该分类暂无商品哟~</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods_cate",
  auth: false,
  data() {
    return {
      categoryList: [],
      categoryCurrent: [],
      current: 0,
      moreCurrent: 0,
      seen: false,
      titleName: "",
      erCurrent: 0,
      iSdefaults: 0,
      productslist: [],
      pullRefreshss: true, // 代表可以进行下拉加载，false代表不能
      page: 1, //代表页面的初始页数
      limit: 10,
      scollY: null, // 离底部距离有多少
      pageTotal: 0, //总页数
      title: "下拉加载更多",
      cid: 0, //一级分类
      sid: 0, //二级分类
      priceOrder: "",
      news: 0,
    };
  },
  async asyncData({ app, query }) {
    let [categoryMsg] = await Promise.all([
      //获取banner分类
      app.$axios.get("/category"),
    ]);
    let category = categoryMsg.data;
    category.forEach((item) => {
      item.children.unshift({
        id: 0,
        cate_name: "全部",
      });
    });
    console.log(query);
    let cidIndex = query.cidIndex ? query.cidIndex : 0,
      cid = query.cid
        ? query.cid
        : categoryMsg.data.length
        ? categoryMsg.data[0].id
        : 0,
      sid = query.sid ? query.sid : 0,
      sidIndex = query.sidIndex ? parseInt(query.sidIndex) + 1 : 0,
      sidCategory =
        query.cid && categoryMsg.data.length
          ? categoryMsg.data[parseInt(cidIndex)].children
          : categoryMsg.data.length
          ? categoryMsg.data[0].children
          : "",
      titleName =
        query.cid && categoryMsg.data.length
          ? categoryMsg.data[parseInt(cidIndex)].cate_name
          : categoryMsg.data.length
          ? categoryMsg.data[0].cate_name
          : "";
    return {
      categoryList: category,
      categoryCurrent: sidCategory,
      titleName: titleName,
      cid: parseInt(cid),
      sid: parseInt(sid),
      current: parseInt(cidIndex),
      erCurrent: sidIndex,
      moreCurrent: parseInt(cidIndex),
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "商品分类-" + this.$store.state.titleCon,
    };
  },
  created() {
    this.getProductslist();
  },
  mounted() {
    this.pullRefresh();
  },
  beforeDestroy() {
    window.onscroll = null;
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
    getProductslist() {
      let _this = this,
        currentPage = {
          page: this.page,
          limit: this.limit,
          cid: this.cid,
          sid: this.sid,
          priceOrder: this.priceOrder,
          news: this.news,
        };
      _this.$axios
        .get("/pc/get_products", {
          params: currentPage,
        })
        .then(function (res) {
          _this.pageTotal = res.data.count;
          // 请求完成后，把得到的数据拼接到当前dom里面
          _this.productslist = _this.productslist.concat(res.data.list);
        })
        .catch(function (err) {
          _this.$message.error(err);
        });
    },
    // 下拉加载ajax
    pullRefresh: function () {
      var _this = this;
      window.onscroll = function () {
        _this.scrollChange();
      };
    },
    scrollChange: function () {
      let _this = this;
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
        _this.title = "正在加载中....";
        // 加页码数
        this.page++;
        _this.getProductslist();
      } else {
        // 其他时候把下拉刷新置为true
        _this.pullRefreshss = true;
        this.title = "下拉加载更多";
      }
    },
    category(index) {
      this.current = index;
      this.moreCurrent = index;
      this.categoryCurrent = this.categoryList[index].children;
      this.titleName = this.categoryList[index].cate_name;
      this.productslist = [];
      this.pullRefreshss = true;
      this.page = 1;
      this.cid = this.categoryList[index].id;
      this.sid = 0;
      this.erCurrent = 0;
      this.priceOrder = "";
      this.news = 0;
      this.getProductslist();
    },
    enter() {
      this.current = -1;
      this.seen = true;
    },
    leave() {
      this.seen = false;
      this.current = this.moreCurrent;
    },
    moreItem(index) {
      this.moreCurrent = index;
      this.categoryCurrent = this.categoryList[index].children;
      this.titleName = this.categoryList[index].cate_name;
      this.seen = false;
      this.current = index;
      this.productslist = [];
      this.pullRefreshss = true;
      this.page = 1;
      this.cid = this.categoryList[index].id;
      this.sid = 0;
      this.erCurrent = 0;
      this.priceOrder = "";
      this.news = 0;
      this.getProductslist();
    },
    erCategory(id, index) {
      this.erCurrent = index;
      this.productslist = [];
      this.pullRefreshss = true;
      this.page = 1;
      this.sid = id;
      this.priceOrder = "";
      this.news = 0;
      this.getProductslist();
    },
    defaults() {
      this.iSdefaults = 0;
      this.productslist = [];
      this.pullRefreshss = true;
      this.page = 1;
      this.news = 0;
      this.priceOrder = "";
      this.getProductslist();
    },
    priceSort(sort) {
      this.iSdefaults = 1;
      this.productslist = [];
      this.pullRefreshss = true;
      this.page = 1;
      this.news = 0;
      this.priceOrder = sort;
      this.getProductslist();
    },
    timeNews() {
      this.iSdefaults = 2;
      this.productslist = [];
      this.pullRefreshss = true;
      this.priceOrder = "";
      this.page = 1;
      this.news = !this.news === true ? 1 : 0;
      this.getProductslist();
    },
  },
};
</script>

<style scoped lang="scss">
.goods_cate {
  margin-top: 2px;
  .noGoods {
    text-align: center;
    .pictrue {
      width: 274px;
      height: 174px;
      margin: 130px auto 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 14px;
      color: #969696;
      margin-top: 20px;
      margin-bottom: 290px;
    }
  }
  .nav {
    width: 100%;
    height: 50px;
    cursor: pointer;
    margin-bottom: 10px;
    .navCon {
      &.wrapper_1200 {
        overflow: unset !important;
        background-color: #fff;
      }
      height: 100%;
      .moreCon {
        position: relative;
        .moreCategory {
          padding: 44px 44px 16px 44px;
          position: absolute;
          top: 50px;
          right: 0;
          width: 1200px;
          background-color: #fff;
          box-shadow: 0 3px 16px rgba(0, 0, 0, 0.06);
          .item {
            margin: 0 40px 28px 0;
            &:hover {
              color: #e93323;
            }
          }
        }
      }
      .list {
        height: 100%;
        width: 1050px;
        overflow: hidden;
        padding-left: 35px;
        .item {
          height: 100%;
          line-height: 50px;
          overflow: hidden;
          & ~ .item {
            margin-left: 50px;
          }
          &:hover {
            color: #e93323;
          }
          &.font-color {
            border-bottom: 2px solid #e93323;
          }
        }
      }
      .more {
        position: relative;
        height: 100%;
        line-height: 50px;
        width: 132px;
        text-align: center;
        &:before {
          position: absolute;
          content: " ";
          left: 0;
          top: 50%;
          margin-top: -8px;
          width: 1px;
          height: 16px;
          background-color: #efefef;
        }
        &.font-color {
          border-bottom: 2px solid #e93323;
        }
        .iconfont {
          margin-right: 6px;
        }
      }
    }
  }
  .title {
    color: #999999;
    height: 46px;
    line-height: 46px;
    .home {
      color: #282828;
    }
  }
  .wrapper {
    background-color: #fff;
    padding: 25px 17px;
    cursor: pointer;
    .list {
      width: 1100px;
      border-bottom: 1px dotted #efefef;
      padding-bottom: 10px;
      .item {
        margin-right: 30px;
        margin-bottom: 10px;
        &:hover {
          color: #e93323;
        }
      }
    }
    .name {
      color: #969696;
      margin-right: 20px;
    }
    .sort {
      margin-top: 20px;
      .item {
        margin-right: 30px;
        &:hover {
          color: #e93323;
        }
        .icon {
          font-size: 15px;
          margin-left: 5px;
        }
        .iconfont {
          font-size: 15px;
          color: #e2e2e2;
          margin-left: 5px;
        }
      }
    }
  }
  .goods {
    width: 1220px;
    .item {
      background-color: #fff;
      padding: 16px;
      width: 224px;
      height: 340px;
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
          font-weight: bold;
          font-size: 22px;
        }
        .y_money {
          font-size: 12px;
          color: #aaaaaa;
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
        color: #5a5a5a;
        margin-top: 8px;
        height: 40px;
      }
      .bottom {
        font-size: 12px;
        color: #aaaaaa;
        margin-top: 10px;
      }
    }
  }
}
</style>
