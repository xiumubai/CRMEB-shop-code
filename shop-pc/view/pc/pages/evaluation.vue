<template>
  <div class="evaluation wrapper_1200">
    <ul class="goods">
      <li class="acea-row item">
        <div class="image">
          <img :src="info.productInfo.image" alt="" />
        </div>
        <div class="text">
          <div>{{ info.productInfo.store_name }}</div>
          <div>
            ￥{{ info.productInfo.price }}<span>x{{ info.cart_num }}</span>
          </div>
        </div>
      </li>
    </ul>
    <client-only>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="cont">
          <div class="rate-group">
            <div class="group-hd">商品评分</div>
            <el-form-item label="商品质量">
              <el-rate v-model="value1" show-text> </el-rate>
            </el-form-item>
            <el-form-item label="服务态度">
              <el-rate
                v-model="value2"
                :colors="['#E93323', '#E93323', '#E93323']"
                :icon-classes="iconClasses"
                void-icon-class="iconfont icon-fuwu"
                show-text
              >
              </el-rate>
            </el-form-item>
          </div>

          <el-form-item label="商品描述" class="fontSize">
            <el-input
              type="textarea"
              placeholder="商品满足您的期待吗？说说你的想法，分享给想买的他们吧~"
              :autosize="{ minRows: 4 }"
              maxlength="100"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片" class="fontSize">
            <div class="img-box-wrapper">
              <el-upload
                list-type="picture-card"
                :action="upLoadUrl"
                :headers="myHeaders"
                :limit="8"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-exceed="handleExceed"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="tip">
              每张图片大小不超过5M，支持jpg,png,jpeg格式文件
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isLoading"
            >立即评价</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 弹窗 -->
      <el-dialog
        :modal="true"
        :visible.sync="isDialog"
        width="370px"
        :show-close="false"
      >
        <div class="refund-box">
          <img src="~assets/images/evaluation.png" alt="" />
          <p class="title">评价成功</p>
          <span>我们会继续为您提供更优质的商品及服务</span>
          <el-button type="primary" @click="subBtn">确认</el-button>
        </div>
      </el-dialog>
    </client-only>
  </div>
</template>

<script>
import { Message } from "element-ui";
import setting from "~/setting";
export default {
  auth: "guest",
  data() {
    return {
      isDialog: false,
      isLoading: false,
      form: {
        desc: "",
      },
      value1: null,
      value2: null,
      iconClasses: [
        "iconfont icon-fuwu",
        "iconfont icon-fuwu",
        "iconfont icon-fuwu",
      ],
      unique: "",
      pics: [],
      upLoadUrl: setting.apiBaseURL + "/upload/image",
      myHeaders: {},
      info: {
        productInfo: {},
      },
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "我的评价-" + this.$store.state.titleCon,
    };
  },
  created() {
    this.unique = this.$route.query.unique;
    let local = this.$cookies.get("auth.strategy");
    this.myHeaders = {
      Authorization: this.$cookies.get(`auth._token.${local}`),
    };
    this.getOrderProduct();
  },
  mounted() {},
  methods: {
    //获取订单商品
    getOrderProduct() {
      this.$axios
        .post("order/product", {
          unique: this.unique,
        })
        .then((res) => {
          this.info = res.data;
        })
        .catch((error) => {
          return Message.error(error);
        });
    },
    onSubmit() {
      if (!this.value1) {
        return Message.error("请选择商品质量");
      }
      if (!this.value2) {
        return Message.error("请选择服务态度");
      }
      this.isLoading = true;
      this.$axios
        .post("order/comment", {
          unique: this.unique,
          comment: this.form.desc,
          pics: this.pics,
          product_score: this.value1,
          service_score: this.value2,
        })
        .then((res) => {
          this.isDialog = true;
        })
        .catch((error) => {
          this.isLoading = false;
          return Message.error(error);
        });
    },
    handleExceed() {
      this.$message.warning("最多上传8张图片");
    },
    handleSuccess(response) {
      if (response.status === 200) {
        this.pics.push(response.data.url);
      } else if (response.status === 400) {
        this.$message.error(response.msg);
      }
    },
    beforeUpload(file) {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImage) {
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
      }
      return isImage;
    },
    handleRemove(file, fileList) {
      this.pics = [];
      fileList.forEach((item) => {
        this.pics.push(item.response.data.url);
      });
    },
    subBtn() {
      this.isDialog = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluation {
  padding: 0 20px 46px;
  margin-top: 60px;
  background: #ffffff;

  .fontSize {
    /deep/.el-form-item__label {
      font-size: 16px;
    }
    .tip {
      font-size: 12px;
      color: #969696;
    }
  }

  .goods {
    width: 450px;

    .item {
      padding: 36px 14px;
    }

    .image {
      width: 70px;
      height: 70px;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .text {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      color: #282828;

      div {
        &:first-child {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: 13px;
          overflow: hidden;
        }

        span {
          margin-left: 10px;
          font-size: 12px;
          color: #b1b1b1;
        }
      }
    }
  }

  .el-form {
    .cont {
      padding: 25px 30px;
      border: 1px solid #efefef;

      > .el-form-item {
        padding-top: 25px;
        padding-bottom: 25px;
        border-top: 1px solid #efefef;
      }
    }

    .el-rate {
      display: inline-block;
      vertical-align: middle;
    }

    > .el-form-item {
      margin-top: 25px;
      margin-bottom: 0;
      text-align: right;
    }

    .rate-group {
      padding-bottom: 21px;

      .group-hd {
        width: 80px;
        text-align: center;
        margin-bottom: 10px;
        font-size: 16px;
      }

      .el-form-item {
        margin-left: 20px;
        margin-bottom: 0;
        /deep/.el-form-item__label {
          line-height: 30px;
        }
        /deep/.el-form-item__content {
          line-height: 30px;
        }
      }
    }

    .el-textarea {
      width: 820px;
    }

    /deep/.el-textarea__inner {
      border: none;
      background-color: #f7f7f7;
    }

    /deep/.el-upload--picture-card {
      width: 70px;
      height: 70px;
      border-style: solid;
      border-color: #d0d0d0;
      line-height: 68px;
      i {
        margin-top: 20px;
      }
    }

    /deep/.el-upload-list--picture-card .el-upload-list__item {
      width: 70px;
      height: 70px;
    }

    /deep/.el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: none;
    }
  }
}
.img-box-wrapper {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    position: relative;
    width: 70px;
    height: 70px;
    margin-right: 20px;
    margin-bottom: 12px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .icon {
      position: absolute;
      right: -10px;
      top: -8px;
      font-size: 20px;
      cursor: pointer;
      color: #e93323;
    }
  }
}
.refund-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    color: #e93323;
    font-size: 20px;
    margin-top: 20px;
  }
  span {
    margin: 10px 0 40px;
    color: #939393;
    font-size: 14px;
  }
  button {
    width: 150px;
  }
}
</style>
