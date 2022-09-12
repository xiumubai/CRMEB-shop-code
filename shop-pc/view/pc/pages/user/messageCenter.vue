<template>
  <div class="user-coupon">
    <div class="main-section">
      <div class="main-hd acea-row row-middle">站内信</div>
      <div class="main-bd">
        <div>
          <div
            class="msg-list"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <div class="msg">
              <span class="title">
                {{ item.title }}
                <div class="no-look" v-if="!item.look"></div>
              </span>
              <span class="control" @click="openRrad(index, item)">
                {{ index === selectIndex ? "收起" : "展开" }}
              </span>
            </div>
            <div class="content" v-if="index === selectIndex">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="pages-box" v-if="total > 0">
          <el-pagination
            background
            :page-size="reqData.limit"
            layout="prev, pager, next"
            @current-change="bindPageCur"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="empty-box" v-if="couponList.length == 0">
          <img src="~/assets/images/noCoupou.png" alt="" />
          <p>亲，暂无消息哟~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  auth: "guest",
  props: {},
  data() {
    return {
      reqData: {
        page: 1,
        limit: 7,
      },
      couponList: [],
      selectIndex: null,
      total: 0,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "站内信",
    };
  },
  computed: {},
  watch: {},
  async asyncData({ app }) {},
  created() {
    this.getCouponList();
  },
  mounted() {},
  methods: {
    getCouponList() {
      this.$axios
        .get("user/message_system/list", {
          params: this.reqData,
        })
        .then((res) => {
          this.couponList = res.data.list;
          this.total = res.data.count;
        })
        .catch((err) => {
          Message.success(err);
        });
    },
    openRrad(index, data) {
      if (this.selectIndex === index) {
        this.selectIndex = null;
      } else {
        this.selectIndex = index;
        this.$axios.get(`user/message_system/detail/${data.id}`).then((res) => {
          this.couponList[index].look = true;
        });
        if (!this.couponList[index].look)
          this.$store.commit("serviceNum", this.$store.state.service_num - 1);
      }
    },
    // 分页点击
    bindPageCur(data) {
      this.reqData.page = data;
      this.selectIndex = null;
      this.getCouponList();
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
  .msg-list {
    margin: 10px;
    .msg {
      display: flex;
      padding: 20px;
      background-color: #f2f2f2;
      justify-content: space-between;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      .title {
        color: #333;
        display: flex;
        align-items: center;
        .no-look {
          width: 8px;
          height: 8px;
          margin-left: 6px;
          background-color: red;
          border-radius: 50%;
        }
      }
      .control {
        color: rgb(136, 125, 125);
        cursor: pointer;
      }
    }
    .content {
      padding: 20px;
      background-color: #fcfbfb;
    }
  }
  .pages-box {
    margin-top: 30px;
    text-align: right;
  }
}
</style>
