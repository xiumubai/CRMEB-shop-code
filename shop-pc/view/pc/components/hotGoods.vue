<template>
  <div class="hotGoods">
    <div class="header acea-row row-center-wrapper">
      <div class="lines"></div>
      <div class="name">热销推荐</div>
      <div class="lines"></div>
    </div>
    <div class="list acea-row row-middle">
      <div
        class="item"
        v-for="(item, index) in hotGoodList"
        :key="index"
        v-if="index < 5"
        @click="goDetail(item)"
      >
        <div class="pictrue"><img :src="item.image" /></div>
        <div class="info line2">{{ item.store_name }}</div>
        <div class="money font-color">¥{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotGoods",
  data() {
    return {
      hotGoodList: [],
    };
  },
  created() {
    this.getHotGoods();
  },
  mounted() {},
  methods: {
    getHotGoods() {
      let that = this;
      that.$axios
        .get("/product/hot", {
          page: 1,
          limit: 5,
        })
        .then((res) => {
          this.hotGoodList = res.data;
        });
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
  },
};
//    product/hot
</script>

<style scoped lang="scss">
.hotGoods {
  .header {
    .lines {
      width: 522px;
      height: 1px;
      background-color: #e8e8e8;
    }
    .name {
      font-size: 22px;
      color: #333333;
      margin: 0 28px;
    }
  }
  .list {
    width: 1220px;
    .item {
      width: 224px;
      height: 312px;
      background-color: #fff;
      padding: 16px 16px 20px 16px;
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
      .info {
        margin-top: 10px;
        color: #666;
        height: 40px;
        text-align: center;
      }
      .money {
        margin-top: 10px;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
</style>
