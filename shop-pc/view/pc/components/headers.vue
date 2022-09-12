<template>
  <div v-if="$route.path !== '/login'">
    <div class="header min_wrapper_1200">
      <div class="headerCon wrapper_1200 acea-row row-between-wrapper">
        <a href="javascript:void(0);" rel="sidebar" @click="AddFavorite()"><span
            class="iconfont icon-shoucang2"></span>收藏本站</a>
        <div class="user acea-row row-middle">
          <nuxt-link :to="{ path: '/user', query: { type: 0 } }" class="item acea-row row-middle" v-if="$auth.loggedIn"
            style="margin-right: 8px">
            <div class="pictrue" v-if="$auth.user.avatar">
              <img :src="$auth.user.avatar" />
            </div>
            <p class="line1" style="max-width: 135px">
              {{ $auth.user.nickname }}
            </p>
            <img src="~/assets/images/king.png" class="king"
              v-if="$auth.user.is_open_member && $auth.user.is_money_level" />
          </nuxt-link>
          <nuxt-link to="/login" class="item" v-else>登录/注册</nuxt-link>
          <nuxt-link :to="{ path: '/user/messageCenter?page_type=2' }" class="item service_color">
            <div class="iconfont icon-duoshanghupc-daohuotongzhi"></div>
            <view v-if="userInfo.service_num" class="num"> </view>
            <span class="service_num" v-if="$store.state.service_num">{{
              $store.state.service_num >= 100 ? "99+" : $store.state.service_num
            }}</span>
          </nuxt-link>
          <nuxt-link :to="{ path: '/user/orderList', query: { page_type: 1 } }" class="item">我的订单</nuxt-link>
          <nuxt-link :to="{ path: '/user/balance', query: { page_type: 3 } }" class="item">我的余额</nuxt-link>
          <nuxt-link to="/shoppingCart" class="cartNum" :class="$store.state.cartnumber > 0 ? 'on' : ''"><span
              class="iconfont icon-dingbu-gouwuche"></span>购物车 ({{
                $store.state.cartnumber
              }})</nuxt-link>
        </div>
      </div>
    </div>
    <div class="nav min_wrapper_1200" v-if="$route.path !== '/goods_search' && $route.path !== '/goods_search/'">
      <div class="navCon wrapper_1200 acea-row row-between-wrapper">
        <div class="textPic acea-row row-middle">
          <div class="icon" @click="goHome">
            <img :src="$store.state.logoUrl" />
          </div>
          <div class="list">
            <nuxt-link :to="
              item.url === 1
                ? $auth.loggedIn
                  ? { path: '/user/userCoupon', query: { page_type: 6 } }
                  : '/login'
                : item.url
            " class="item" :class="{ 'font-color': item.url === $route.path }" v-for="(item, index) in headerList"
              :key="index">{{ item.name }}</nuxt-link>
          </div>
        </div>
        <div class="search acea-row row-between-wrapper">
          <div class="text acea-row row-middle">
            <span class="iconfont icon-xiazai5"></span><input type="text" placeholder="搜索商品" v-model="search" />
          </div>
          <div class="bnt bg-color" @click="submit">搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      headerList: [
        {
          name: "首页",
          url: "/",
        },
        {
          name: "产品分类",
          url: "/goods_cate",
        },
        {
          name: "限时秒杀",
          url: "/goods_seckill",
        },
        {
          name: "限时预售",
          url: "/goods_presell",
        },
        {
          name: "领优惠券",
          url: 1,
        },
      ],
      search: "",
      userInfo: {},
      service_num: "",
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.gainCount();
      this.service_num = this.$auth.user.service_num;
      this.$store.commit("serviceNum", this.$auth.user.service_num);
    }
  },
  mounted() { },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    AddFavorite() {
      let url = window.location;
      let title = document.title;
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("360se") > -1) {
        this.$message("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
      } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
      } else if (document.all) {
        try {
          window.external.addFavorite(url, title);
        } catch (e) {
          this.$message("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
        }
      } else if (window.sidebar) {
        this.$message("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
      } else {
        this.$message("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
      }
    },
    gainCount: function () {
      let that = this;
      that.$axios
        .get("/cart/count", {
          params: {
            numType: 0,
          },
        })
        .then((res) => {
          that.$store.commit("cartNum", res.data.count);
        });
    },
    submit() {
      if (this.search.trim() !== "") {
        this.$router.push({
          path: "/goods_search",
          query: { title: this.search.trim() },
        });
        this.search = "";
      } else {
        this.$message.error("请输入要搜索的内容");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 40px;
  background-color: #282828;
  font-size: 12px;
  color: #b4b4b4;
  cursor: pointer;

  .headerCon {
    height: 100%;

    a {
      color: #b4b4b4;

      &:hover {
        color: #fff;
      }
    }

    .icon-shoucang2 {
      margin-right: 5px;
    }

    .user {
      .item {
        display: flex;
        align-items: center;
        margin-right: 8px;
        position: relative;
        padding-left: 8px;
        color: #b4b4b4;

        &:hover {
          color: #fff;
        }

        &~.item:before {
          position: absolute;
          content: " ";
          width: 1px;
          height: 14px;
          background-color: rgba(255, 255, 255, 0.11);
          left: 0;
          top: 50%;
          margin-top: -7px;
        }

        .pictrue {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 8px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .king {
          width: 13px;
          height: 12px;
          display: block;
          margin-left: 6px;
          margin-top: -5px;
        }
      }

      .cartNum {
        width: 118px;
        height: 40px;
        background: #3c3c3c;
        text-align: center;
        line-height: 40px;
        color: #b4b4b4;
        margin-left: 10px;

        &:hover {
          color: #fff;
        }

        &.on {
          background: #e93323;
          color: #fff;
          opacity: 0.75;

          &:hover {
            opacity: 1;
          }
        }

        .iconfont {
          margin-right: 7px;
        }
      }
    }
  }
}

.nav {
  width: 100%;
  height: 96px;
  background: #ffffff;

  .navCon {
    height: 100%;

    .textPic {
      height: 100%;

      .icon {
        cursor: pointer;
        width: 140px;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .list {
        margin-left: 85px;

        .item {
          padding: 15px 10px;
          margin-right: 13px;
          color: #282828;
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;

          &:hover {
            color: #e93323;
          }
        }
      }
    }

    .search {
      width: 360px;
      height: 40px;
      border: 1px solid #e93323;
      border-radius: 2px;
      cursor: pointer;

      .text {
        width: 290px;
        padding-left: 14px;
        color: #c1c1c1;

        input {
          width: 250px;
          height: 36px;
          border: none;
          outline: none;
          padding-left: 10px;
          margin-top: -2px;
        }

        .iconfont {
          font-size: 15px;
          margin-right: 5px;
        }
      }

      .bnt {
        width: 64px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
      }
    }
  }
}

.icon-duoshanghupc-daohuotongzhi {
  font-size: 14px;
  color: #fff;
  padding: 0 5px 0 2px;
  animation: shock 3s infinite ease;
}

@keyframes shock {

  5%,
  25%,
  45% {
    transform: rotate(8deg);
  }

  0%,
  10%,
  30%,
  50% {
    transform: rotate(-8deg);
  }

  15%,
  35%,
  55% {
    transform: rotate(4deg);
  }

  20%,
  40%,
  60% {
    transform: rotate(-4deg);
  }

  65%,
  100% {
    transform: rotate(0deg);
  }
}

.service_num {
  position: absolute;
  transform: scale(0.7);
  top: -6px;
  left: 14px;
  font-size: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 3px;
  color: rgb(201, 18, 18);
}

.service_color:hover {
  color: #000 !important;
}
</style>
