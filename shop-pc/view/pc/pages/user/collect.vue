<template>
  <div class="collect">
    <div class="user-com-title">我的收藏</div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="hd">
          <div class="img-box"><img :src="item.image" alt="" /></div>
          <div class="info line2">{{ item.store_name }}</div>
        </div>
        <div class="bd">
          <el-button @click="offCollect(item)">取消收藏</el-button>
          <el-button @click="goDetail(item)">查看商品</el-button>
        </div>
      </li>
    </ul>
    <div class="pages-box" v-if="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="bindPageCur"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="empty-box" v-if="list.length == 0">
      <img src="~assets/images/nocollect.png" alt="" />
      <p>亲，暂无收藏哟~</p>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "collect",
  auth: "guest",
  data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "我的收藏-" + this.$store.state.titleCon,
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get("pc/get_collect_list", {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.count;
        });
    },
    //取消收藏
    offCollect(item) {
      this.$axios
        .post("collect/del", {
          id: item.product_id,
        })
        .then((res) => {
          Message.success(res.msg);
          this.getList();
        })
        .catch((error) => {
          return Message.error(error);
        });
    },
    //去详情
    goDetail(item) {
      let path = item.presale
        ? (path = {
            path: "/goods_presell_detail",
            query: {
              id: item.product_id,
            },
          })
        : (path = { path: `/goods_detail/${item.product_id}` });
      this.$router.push(path);
    },
    // 分页点击
    bindPageCur(data) {
      this.page = data;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.collect {
  ul {
    li {
      padding: 30px 5px;
      border-bottom: 1px solid #e1e1e1;
      .hd {
        display: flex;
        padding-bottom: 30px;
        border-bottom: 1px dashed #e1e1e1;
        .img-box {
          width: 120px;
          height: 120px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          display: flex;
          align-items: center;
          margin-left: 25px;
          width: 60%;
        }
      }
      .bd {
        display: flex;
        justify-content: flex-end;
        padding-top: 25px;
        padding-right: 25px;
      }
    }
  }
}
.pages-box {
  margin-top: 30px;
  text-align: right;
}
</style>
