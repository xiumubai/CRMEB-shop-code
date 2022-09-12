<template>
  <div class="seckill">
    <div class="title-section">
      <img src="@/assets/images/seckill-title.png" />
    </div>
    <div v-swiper:navSwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="item in seckillTime"
          :key="item.id"
          :class="{
            'row-column': item.status !== 1,
            on: currentTimeId == item.id
          }"
          class="acea-row row-center-wrapper swiper-slide"
        >
          <div>{{ item.time }}</div>
          <div v-if="item.status === 1">
            距结束
            <countDown
              v-if="item.stop"
              :is-day="false"
              :tip-text="' '"
              :day-text="' '"
              :hour-text="' : '"
              :minute-text="' : '"
              :second-text="' '"
              :datatime="item.stop"
            ></countDown>
          </div>
          <div v-else>{{ item.state }}</div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="goods-section">
      <ul v-if="goodsList.length">
        <li v-for="item in goodsList" :key="item.id">
          <nuxt-link
            :to="{
              path: '/goods_seckill_detail',
              query: {
                id: item.id,
                productId: item.product_id,
                time: currentStopTime,
                status: currentTimeStatus
              }
            }"
          >
            <div class="image">
              <img :src="item.image" />
            </div>
            <div class="text">
              <div class="name">{{ item.title }}</div>
              <div class="group">
                <div class="info">
                  <div>
                    <div class="price">
                      ￥<span>{{ item.price }}</span>
                    </div>
                    <del>￥{{ item.ot_price }}</del>
                  </div>
                  <div class="progress">
                    <div class="txt">已抢{{ item.percent }}%</div>
                    <div class="bar">
                      <span :style="{ width: `${item.percent}%` }"></span>
                    </div>
                  </div>
                </div>
                <button>{{ currentTimeState }}</button>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div v-else-if="seckillTime.length" class="nothing">
        <img src="@/assets/images/noGoods.png" />
        暂无秒杀商品，去看点别的吧
      </div>
    </div>
    <div v-if="!seckillTime.length" class="nothing">
      <img src="@/assets/images/noGoods.png" />
      暂无秒杀商品，去看点别的吧
    </div>
  </div>
</template>

<script>
import countDown from "@/components/countDown";
export default {
  auth: false,
  components: { countDown },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto"
      },
      page: 1,
      limit: 16,
      goodsList: [],
      finished: false,
      currentTimeId: "",
      currentStopTime: "",
      currentTimeState: "",
      currentTimeStatus: "",
      seckillTime: []
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "秒杀列表-"+this.$store.state.titleCon
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$axios.get("/seckill/index").then(res => {
        if (res.data.seckillTime.length) {
          this.currentTimeId =
            res.data.seckillTime[res.data.seckillTimeIndex].id;
          this.currentStopTime =
            res.data.seckillTime[res.data.seckillTimeIndex].stop;
          this.currentTimeState =
            res.data.seckillTime[res.data.seckillTimeIndex].state;
          this.currentTimeStatus =
            res.data.seckillTime[res.data.seckillTimeIndex].status;
          this.seckillTime = res.data.seckillTime;
          this.navSwiper.slideTo(res.data.seckillTimeIndex - 1);
          this.getGoodsList();
        }
      });
      if (this.navSwiper) {
        this.navSwiper.on("click", () => {
          if(this.navSwiper.clickedIndex>2){
            this.navSwiper.slideNext();
          }
          this.currentTimeId = this.seckillTime[this.navSwiper.clickedIndex].id;
          this.currentStopTime = this.seckillTime[
            this.navSwiper.clickedIndex
          ].stop;
          this.currentTimeState = this.seckillTime[
            this.navSwiper.clickedIndex
          ].state;
          this.currentTimeStatus = this.seckillTime[
            this.navSwiper.clickedIndex
          ].status;
          this.goodsList = [];
          this.page = 1;
          this.finished = false;
          this.getGoodsList();
        });
      }
    });
  },
  methods: {
    getGoodsList() {
      this.$axios
        .get(`/seckill/list/${this.currentTimeId}`, {
          params: {
            page: this.page,
            limit: this.limit
          }
        })
        .then(res => {
          let data = res.data;
          this.goodsList = this.goodsList.concat(data);
          this.finished = data.length < this.page.limit;
          this.page++;
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
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

        button {
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

  .swiper-container {
    width: 1200px;
    background: #ffffff;

    .swiper-slide {
      width: 253px;
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
          width: 76px;
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
    }
  }
}
</style>
