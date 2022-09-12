<template>
  <div>
    <div class="header wrapper_1200">
      <span class="home">首页 > 订单详情 > </span>申请退款
    </div>
    <div class="refund wrapper_1200">
      <table class="table">
        <thead>
          <tr>
            <td>商品信息</td>
            <td>退货件数</td>
            <!-- <td>退款金额</td> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderData.cartInfo" :key="index">
            <td class="td">
              <table>
                <tr>
                  <td>
                    <img :src="item.productInfo.image" />
                    <div>
                      <div class="name">
                        {{ item.productInfo.store_name
                        }}<template v-if="item.productInfo.attrInfo">
                          {{ item.productInfo.attrInfo.suk }}</template
                        >
                      </div>
                      <div v-if="item.productInfo.attrInfo">
                        ￥{{ item.productInfo.attrInfo.price
                        }}<span>x{{ item.cart_num }}</span>
                      </div>
                      <div v-else>
                        ￥{{ item.productInfo.price
                        }}<span>x{{ item.cart_num }}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td class="td">
              <!-- {{ orderData.total_num }} -->
              <div
                class="num"
                v-if="
                  orderData.total_num == 1 && orderData.cartInfo.length == 1
                "
              >
                {{ item.cart_num }}
              </div>
              <el-input-number
                v-else
                v-model="item.refund_cart_num"
                :min="1"
                :max="item.surplus_refund_num"
                label="描述文字"
              ></el-input-number>
            </td>
            <!-- <td class="td">¥{{ orderData.pay_price }}</td> -->
            <!-- <td class="td">
              ￥{{ ((one_price * (refund_num || 1)) / 10000).toFixed(2) }}
            </td> -->
          </tr>
        </tbody>
      </table>
      <client-only>
        <el-form ref="form" :model="form" label-width="80px">
          <div class="cont">
            <!-- <el-form-item
              label="退款类型"
              v-if="
               
              "
            >
              <el-select v-model="refund_type" placeholder="请选择退款类型">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in returnGoodsData"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item
              label="退款类型"
              v-if="
                orderData._status &&
                orderData._status._type !== 1 &&
                orderData.delivery_type !== 'fictitious'
              "
            >
              <el-radio-group v-model="refund_type">
                <el-radio
                  :label="item.value"
                  v-for="(item, index) in returnGoodsData"
                  :key="index"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="退款原因">
              <el-select v-model="form.region" placeholder="请选择退款原因">
                <el-option
                  :label="item"
                  :value="item" 
                  v-for="(item, index) in refundArray"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
                type="textarea"
                placeholder="填写备注信息，100字以内"
                :autosize="{ minRows: 4 }"
                maxlength="100"
                v-model="form.desc"
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">申请退款</el-button>
          </el-form-item>
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
          <p class="title">退款申请提交成功</p>
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
      form: {
        region: "",
        desc: "",
      },
      upLoadUrl: setting.apiBaseURL + "/upload/image",
      pics: [],
      refundArray: [],
      refund_type: "1",
      returnGoodsData: [
        {
          label: "仅退款",
          value: "1",
        },
        {
          label: "退货并退款",
          value: "2",
        },
      ],
      orderData: {},
      myHeaders: {},
      isDialog: false,
      one_price: 0,
      refund_num: 0,
    };
  },
  async asyncData({ app, query }) {
    // this.cart_id = query.cart_id ? query.cart_id : 0;
    let [data, refund] = await Promise.all([
      app.$axios.get(
        `/order/refund_detail/${query.orderId}${
          query.cart_id ? `/${query.cart_id}` : ""
        }`
      ),
      app.$axios.get(`/order/refund/reason`),
    ]);
    data.data.cartInfo.map((e) => {
      e.refund_cart_num = e.cart_num;
    });
    return {
      one_price:
        (data.data.cartInfo[0].truePrice +
          Number(data.data.cartInfo[0].one_postage_price)) *
        10000,
      refund_num: data.data.total_num,
      orderData: data.data,
      refundArray: refund.data,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "申请退款-" + this.$store.state.titleCon,
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
      if (that.form.region === "") {
        return Message.error("请选择退款原因");
      }
      let cartId = [];
      this.orderData.cartInfo.map((i) => {
        cartId.push({
          cart_id: i.id,
          cart_num: i.refund_cart_num,
        });
      });
      console.log(cartId);
      that.$axios
        .post(`/order/refund/apply/${that.orderData.id}`, {
          text: that.form.region || "",
          refund_reason_wap_explain: that.form.desc,
          refund_reason_wap_img: that.pics.join(","),
          uni: that.orderData.order_id,
          refund_type: that.refund_type,
          cart_ids: cartId,
        })
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
    inputNumber(e, item) {
      let v = e + "";
      v.indexOf(".") > -1 ? (v = v.split(".")[0]) : "";
      if (v > this.orderData.total_num) {
        this.$nextTick(() => {
          item.refund_cart_num = this.orderData.total_num;
        });
      } else {
        this.$nextTick(() => {
          item.refund_cart_num = v;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  line-height: 60px;
  color: #999999;
  .home {
    color: #282828;
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

      td {
        height: 40px;
        font-size: 14px;
        text-align: center;
        color: #282828;
      }
    }

    tbody {
      .td {
        width: 219px;
        border: 1px solid #efefef;
        font-size: 14px;
        text-align: center;
        color: #282828;

        &:first-child {
          width: auto;
          padding: 20px 50px;
          text-align: left;

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

      + div {
        margin-left: 90px;
      }
    }

    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 13px;
      overflow: hidden;
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
        padding-bottom: 25px;
        margin-bottom: 0;

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
