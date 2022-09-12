<template>
  <div>
    <div class="header wrapper_1200">
      <span class="home"><nuxt-link to="/">首页 ></nuxt-link> 订单详情 > </span
      >申请退货
    </div>
    <div class="refund wrapper_1200">
      <table class="table">
        <thead>
          <tr>
            <td class="td pictrue">商品信息</td>
            <td class="td">商品价格</td>
            <td class="td">返回件数</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderData.cart_info" :key="index">
            <td class="td pictrue">
              <table border="0">
                <tr>
                  <td class="acea-row row-center-wrapper">
                    <img
                      :src="
                        item.productInfo.attrInfo
                          ? item.productInfo.attrInfo.image
                          : item.productInfo.image
                      "
                    />
                    <div>
                      <div class="name">
                        {{ item.productInfo.store_name
                        }}<template v-if="item.productInfo.attrInfo">
                          {{ item.productInfo.attrInfo.suk }}</template
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td class="td">{{ item.truePrice }}</td>
            <td class="td">{{ item.cart_num }}</td>
          </tr>
        </tbody>
      </table>
      <client-only>
        <el-form ref="form" :model="form" label-width="80px">
          <div class="cont">
            <el-form-item label="物流公司">
              <el-select
                v-model="form.refund_express_name"
                filterable
                placeholder="请选择物流公司"
              >
                <el-option
                  :label="item.name"
                  :value="item.name"
                  v-for="(item, index) in expressList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流单号">
              <el-input
                style="width: 219px"
                type="text"
                placeholder="请填写物流单号"
                v-model="form.refund_express"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input
                style="width: 219px"
                type="text"
                placeholder="请填写联系电话"
                v-model="form.refund_phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
                type="textarea"
                placeholder="填写备注信息，100字以内"
                :autosize="{ minRows: 4 }"
                maxlength="100"
                v-model="form.refund_explain"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传凭证">
              <div class="img-box-wrapper">
                <el-upload
                  list-type="picture-card"
                  :action="upLoadUrl"
                  :headers="myHeaders"
                  :limit="3"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-exceed="handleExceed"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
              <p style="color: #999">最多上传3张图片</p>
            </el-form-item>
          </div>
          <div class="buttonSub acea-row row-between-wrapper">
            <div></div>
            <el-button type="primary" @click="onSubmit">申请退货</el-button>
          </div>
        </el-form>
      </client-only>
    </div>
    <!-- 弹窗 -->
    <client-only>
      <el-dialog
        :modal="true"
        :visible.sync="isDialog"
        width="370px"
        :show-close="false"
      >
        <div class="refund-box">
          <img src="~assets/images/refund.png" alt="" />
          <p class="title">退货申请提交成功</p>
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
      orderData: {},
      expressList: [],
      form: {
        refund_express_name: "",
        refund_express: "",
        refund_explain: "",
        refund_phone: "",
        refund_img: "",
        id: "",
      },
      id: "",
      upLoadUrl: setting.apiBaseURL + "/upload/image",
      myHeaders: {},
      pics: [],
      isDialog: false,
    };
  },
  async asyncData({ app, query }) {
    let [data] = await Promise.all([
      app.$axios.get(`/order/refund/detail/${query.orderId}`),
    ]);
    return {
      orderData: data.data,
      expressList: data.data.express_list,
      id: data.data.id,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "申请退货-" + this.$store.state.titleCon,
    };
  },
  created() {
    let local = this.$cookies.get("auth.strategy");
    this.myHeaders = {
      Authorization: this.$cookies.get(`auth._token.${local}`),
    };
  },
  methods: {
    handleClose() {
      this.isDialog = false;
    },
    subBtn() {
      this.isDialog = false;
      return this.$router.replace({
        path: "/user/orderList",
        query: { page_type: 1 },
      });
    },
    onSubmit() {
      let that = this;
      if (that.form.refund_express_name === "") {
        return Message.error("请选择物流公司");
      }
      if (that.form.refund_express === "") {
        return Message.error("请输入快递单号");
      }
      if (that.form.refund_phone === "") {
        return Message.error("请输入手机号");
      }
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.form.refund_phone)) {
        return Message.error("请输入正确的手机号码");
      }
      that.form.id = that.id;
      that.form.refund_img = that.pics.join(",");
      that.$axios
        .post(`/order/refund/express`, this.form)
        .then((res) => {
          this.isDialog = true;
        })
        .catch((err) => {
          return Message.error(err);
        });
    },
    handleExceed() {
      this.$message.warning("最多上传3张图片");
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
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-checkbox__inner {
  border-radius: 50%;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #dcdfe6;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #e93323;
}
.buttonSub {
  margin-top: 20px;
}
.header {
  height: 60px;
  line-height: 60px;
  color: #999999;
  .home {
    color: #282828;
  }
}
.cartNum {
  .iconfont {
    width: 40px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #d3d3d3;
    text-align: center;
    color: #707070;
    background-color: #fff;
    &.on {
      color: #d3d3d3;
    }
  }
  .numCon {
    width: 54px;
    height: 36px;
    border: 0;
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    font-size: 15px;
    color: #5a5a5a;
    text-align: center;
    line-height: 36px;
    outline: none;
  }
}
.refund {
  padding: 40px 20px 46px;
  background: #ffffff;

  .el-icon-plus {
    margin-top: 20px;
  }

  .table {
    width: 100%;
    border: 1px solid #efefef;
    border-collapse: collapse;

    thead {
      background: #efefef;
      .tableHead {
        width: 100%;
      }
      .td {
        width: 183px;
        height: 40px;
        font-size: 14px;
        text-align: left;
        color: #282828;
        &.checkboxs {
          padding-left: 21px;
          width: 115px;
        }
        &.pictrue {
          width: auto;
          text-align: left;
          padding-left: 35px;
        }
      }
    }

    tbody {
      .tableHead {
        width: 100%;
      }
      .td {
        width: 183px;
        font-size: 14px;
        text-align: left;
        color: #282828;
        padding: 20px 0;

        &.checkboxs {
          width: 115px;
          padding-left: 21px;
        }

        &.pictrue {
          width: auto;
          text-align: left;
          padding-left: 35px;

          span {
            margin-left: 10px;
            font-size: 12px;
            color: #b1b1b1;
          }
        }
      }
    }

    img {
      float: left;
      width: 70px;
      height: 70px;
      border: 1px solid #eee;
      border-radius: 5px;

      + div {
        margin-left: 20px;
      }
    }

    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 13px;
      overflow: hidden;
      width: 345px;
    }
  }

  .el-form {
    margin-top: 20px;

    .cont {
      padding-right: 25px;
      padding-left: 25px;
      border: 1px solid #efefef;

      .el-form-item {
        padding-top: 25px;
        //padding-bottom: 25px;

        ~ .el-form-item {
          border-top: 1px solid #efefef;
        }
      }
    }

    > .el-form-item {
      margin-top: 25px;
      margin-bottom: 0;
      text-align: right;
    }

    .el-textarea {
      width: 820px;
    }

    /deep/.el-textarea__inner {
      border: none;
      background: #f7f7f7;
    }

    /deep/.el-upload--picture-card {
      width: 70px;
      height: 70px;
      border-style: solid;
      line-height: 68px;
    }

    /deep/.el-upload-list--picture-card .el-upload-list__item {
      width: 70px;
      height: 70px;
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
</style>
