<template>
  <div class="user-wrapper wrapper_1200">
    <div class="router-tips">
      <nuxt-link to="/">首页></nuxt-link>
      <nuxt-link :to="{ path: '/user', query: { type: 0 } }"
        >个人中心></nuxt-link
      >
      <span>{{ userMenu[indexCur].title }}</span>
    </div>
    <div class="content clearfix">
      <div class="left-box" v-if="$auth.user">
        <div class="user-info">
          <div
            :class="
              $auth.user.is_open_member && $auth.user.is_money_level
                ? 'svip'
                : ''
            "
          >
            <img class="avatar" :src="$auth.user.avatar" alt="" />
            <img
              src="~assets/images/svipSign.png"
              class="sign"
              v-if="$auth.user.is_open_member && $auth.user.is_money_level"
            />
          </div>
          <p class="name line2">{{ $auth.user.nickname }}</p>
        </div>
        <div class="user-menu">
          <div
            @click="goPage(menu, index)"
            class="menu-item"
            v-for="(menu, index) in userMenu"
            :key="index"
            :class="{ active: menuCur == menu.key }"
          >
            {{ menu.title }}
          </div>
        </div>
      </div>
      <div class="right-box">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  auth: "guest",
  data() {
    return {
      userMenu: [
        {
          key: 0,
          link: "/user",
          title: "账户管理",
        },
        {
          key: 4,
          title: "我的订单",
          link: "/user/orderList",
        },
        {
          key: 7,
          title: "站内信",
          link: "/user/messageCenter",
        },
        {
          key: 1,
          title: "我的优惠券",
          link: "/user/myCoupon",
        },
        {
          key: 2,
          title: "我的余额",
          link: "/user/balance",
        },
        {
          key: 6,
          title: "我的收藏",
          link: "/user/collect",
        },
        {
          key: 3,
          title: "地址管理",
          link: "/user/address_list",
        },

        {
          key: 5,
          title: "领取优惠券",
          link: "/user/userCoupon",
        },
      ],
      menuCur: 0,
      userInfo: {},
      indexCur: 0,
    };
  },
  async asyncData({ query }) {
    return {
      indexCur: query.page_type,
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.userMenu.forEach((el, index) => {
          if (el.link == val.path) {
            this.menuCur = el.key;
            this.indexCur = index;
          }
        });
      },
      // 深度观察监听
      deep: true,
    },
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "个人中心-" + this.$store.state.titleCon,
    };
  },
  created() {
    this.userMenu.forEach((el) => {
      if (el.link == this.$route.path) {
        this.menuCur = el.key;
      }
    });
  },
  methods: {
    goPage(menu, index) {
      this.menuCur = menu.key;
      this.$router.push({
        path: `${menu.link}`,
        query: { page_type: `${index}` },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-wrapper {
  .left-box {
    width: 180px;
    float: left;
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 170px;
      background: #fff;
      color: #282828;
      font-size: 14px;
      .svip {
        background: url("~assets/images/vipUser.png") center/cover no-repeat;
        width: 59px;
        height: 62px;
        position: relative;
        .sign {
          width: 32px;
          height: 14px;
          position: absolute;
          bottom: -12px;
          left: 50%;
          margin-left: -18px;
        }
      }
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin: 9px 1px;
      }
      .name {
        margin-top: 10px;
        padding: 0 15px;
      }
    }
    .user-menu {
      margin-top: 8px;
      padding: 40px 0;
      background: #fff;
      .menu-item {
        display: block;
        margin-bottom: 30px;
        text-align: center;
        color: #666666;
        cursor: pointer;
        font-size: 14px;
        &.active {
          color: #e93323;
          background: url("~assets/images/left-icon.png") no-repeat left center;
        }
      }
    }
  }
  .right-box {
    width: 1012px;
    min-height: 730px;
    margin-left: 8px;
    padding-bottom: 30px;
    float: right;
    background: #fff;
    padding-left: 54px;
  }
}
.router-tips {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  a {
    color: #333;
  }
  span {
    color: #999999;
  }
}
.avatar:hover {
  transform: rotate(666turn);
  transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 1s;
}
</style>
