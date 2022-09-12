<template>
  <div class="seckill">
    <div class="title-section">
      <img src="@/assets/images/presell.png" />
    </div>
    <div v-swiper:navSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in timeList"
          :key="index"
          :class="{
            on: active == item.key,
          }"
          @click="selectType(item.key)"
          class="acea-row row-center-wrapper swiper-slide"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="goods-section">
      <ul v-if="goodsList.length">
        <li v-for="item in goodsList" :key="item.id" @click="jump(item)">
          <div class="goods-box">
            <div class="image">
              <img :src="item.image" />
            </div>
            <div class="text">
              <div class="name">{{ item.store_name }}</div>
              <div class="group">
                <div class="info">
                  <div>
                    <div class="price">
                      ￥<span>{{ item.price }}</span>
                    </div>
                    <del>￥{{ item.ot_price }}</del>
                  </div>
                </div>
                <button class="btn" v-if="active !== 1">
                  {{ active === 2 ? "立即预定" : "已结束" }}
                </button>
                <button v-else class="time-btn">
                  <span>开售时间</span>
                  <div>
                    {{
                      new Date(item.presale_start_time * 1000).getMonth() + 1
                    }}/{{ new Date(item.presale_start_time * 1000).getDate() }}
                    {{
                      new Date(item.presale_start_time * 1000).getHours() < 10
                        ? "0" +
                          new Date(item.presale_start_time * 1000).getHours()
                        : new Date(item.presale_start_time * 1000).getHours() ||
                          "00"
                    }}:
                    {{
                      new Date(item.presale_start_time * 1000).getMinutes() < 10
                        ? "0" +
                          new Date(item.presale_start_time * 1000).getMinutes()
                        : new Date(
                            item.presale_start_time * 1000
                          ).getMinutes() || "00"
                    }}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else-if="!goodsList.length && !loading" class="nothing">
        <img src="@/assets/images/noGoods.png" />
        暂无预售商品，去看点别的吧
      </div>
    </div>
  </div>
</template>

<script>
import countDown from "@/components/countDown";
import { Message } from "element-ui";
export default {
  auth: false,
  components: { countDown },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
      },
      page: 1,
      limit: 16,
      active: 2,
      goodsList: [],
      finished: false,
      currentTimeId: "",
      currentStopTime: "",
      currentTimeState: "",
      currentTimeStatus: "",
      timeList: [
        {
          name: "未开始",
          key: 1,
        },
        {
          name: "正在进行",
          key: 2,
        },
        {
          name: "已结束",
          key: 3,
        },
      ],
      loading: false,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "预售列表-" + this.$store.state.titleCon,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getGoodsList();
    });
  },
  methods: {
    selectType(type) {
      if (this.loading) return Message.warning("正在获取数据");
      if (this.active !== type) {
        this.active = type;
        this.page = 1;
        this.goodsList = [];
        this.getGoodsList();
      }
    },
    getGoodsList() {
      this.loading = true;
      this.$axios
        .get(`/advance/list`, {
          params: {
            page: this.page,
            limit: this.limit,
            time_type: this.active,
          },
        })
        .then((res) => {
          this.loading = false;
          let data = res.data.list;
          this.goodsList = this.goodsList.concat(data);
          this.finished = data.length < this.page.limit;
          this.page++;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err);
        });
    },
    jump(item) {
      this.$router.push({
        path: "/goods_presell_detail",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seckill {
  min-height: 330px;
  background: url("~assets/images/seckill-back.png") center top/100% no-repeat;

  .title-section {
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;

    img {
      display: inline-block;
      width: 200px;
      height: 48px;
      vertical-align: middle;
    }
  }

  .goods-section {
    width: 1200px;
    min-height: 596px;
    margin: 20px auto;

    ul {
      margin-bottom: -16px;
      margin-left: -16px;

      &::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }

      li {
        float: left;
        width: 288px;
        margin-bottom: 16px;
        margin-left: 16px;
        background: #ffffff;
        .goods-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      }

      a {
        display: block;
        padding: 24px;
      }

      .image {
        width: 240px;
        height: 240px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 1s;
        }
      }

      .text {
        margin-top: 18px;
        width: 100%;
        .name {
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
          line-height: 20px;
          color: #282828;
        }

        .group {
          display: flex;
          align-items: center;
          margin-top: 12px;
        }

        .info {
          flex: 1;
        }

        .price {
          display: inline-block;
          font-weight: bold;
          font-size: 14px;
          color: #e93323;

          span {
            font-size: 22px;
          }
        }

        del {
          font-size: 12px;
          color: #969696;
        }

        .progress {
          margin-top: 4px;

          .txt {
            display: inline-block;
            width: 57px;
            vertical-align: middle;
            font-size: 12px;
            color: #969696;
          }

          .bar {
            display: inline-block;
            width: 80px;
            height: 8px;
            border-radius: 4px;
            background: #e2e2e2;
            overflow: hidden;
            vertical-align: middle;
            font-size: 0;

            span {
              display: inline-block;
              width: 50%;
              height: 100%;
              background: #e93323;
            }
          }
        }

        .btn {
          width: 70px;
          height: 38px;
          border: none;
          border-radius: 4px;
          background: #e93323;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
  .swiper-wrapper {
    width: 103%;
  }
  .swiper-container {
    width: 1200px;
    background: #ffffff;

    .swiper-slide {
      width: 33.33%;
      height: 80px;
      padding-right: 18px;
      margin-right: -18px;
      background: url("~assets/images/seckill-slide-arrow.png") right top/18px
        80px no-repeat;
      font-size: 14px;
      color: #282828;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.row-column {
        div {
          &:first-child {
            width: auto;
            height: auto;
            margin-right: 0;
            margin-bottom: 4px;
            background: none;
            font-weight: bold;
            font-size: 18px;
            line-height: normal;
            text-align: inherit;
          }
        }
      }

      &.off {
        color: #969696;
      }

      &.on {
        background: url("~assets/images/seckill-slide-back.png") center/100%
          100% no-repeat;
        color: #ffffff;
      }

      > div {
        &:first-child {
          height: 60px;
          margin-right: 16px;
          background: url("~assets/images/seckill-slide-clock.png") center/60px
            60px no-repeat;
          font-weight: bold;
          font-size: 24px;
          line-height: 60px;
          text-align: center;
        }
      }

      .time {
        margin-top: 8px;
        margin-right: -3px;
        margin-left: -3px;
        font-weight: bold;
        font-size: 17px;
      }

      /deep/.styleAll {
        width: 25px;
        height: 25px;
        margin-right: 3px;
        margin-left: 3px;
        background-color: #222222;
        line-height: 25px;
        text-align: center;
        color: #ffffff;
      }
    }
  }

  .nothing {
    padding-top: 250px;
    padding-bottom: 150px;
    font-size: 16px;
    text-align: center;
    color: #969696;

    img {
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
}
.time-btn {
  width: 100px;
  height: 45px;
  border: none;
  border-radius: 4px;
  background: #e93323;
  font-size: 14px;
  color: #ffffff;
}
</style>
