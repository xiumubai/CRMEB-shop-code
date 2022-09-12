<template>
  <div class="order_confirm wrapper_1200">
    <div class="header">
      <span class="home">首页 > <span v-if="!news">购物车 > </span> </span
      >提交订单
    </div>
    <div v-if="!virtual_type" class="address">
      <div class="title">收货地址</div>
      <div class="lines">
        <img src="../assets/images/line.png" />
      </div>
      <div class="list acea-row row-middle" :class="isShow ? 'on' : ''">
        <div
          class="item"
          :class="current === index ? 'on' : ''"
          v-for="(item, index) in addressList"
          :key="index"
          @click="tapCurrent(index, item)"
        >
          <div class="default bg-color" v-if="item.is_default">默认</div>
          <div class="name line1">{{ item.real_name }}</div>
          <div class="phone">{{ item.phone }}</div>
          <div class="details line4">
            {{ item.province }}{{ item.city }}{{ item.district
            }}{{ item.detail }}
          </div>
          <div
            class="iconfont icon-xuanzhong4 font-color"
            v-if="current === index"
          ></div>
        </div>
        <div class="item add" @click="addAddress">
          <div class="iconfont icon-dizhi-tianjia"></div>
          <div class="tip">添加新地址</div>
        </div>
      </div>
    </div>
    <div class="isShow" @click="open" v-if="!isShow && addressList.length > 3">
      显示更多收货地址<span class="iconfont icon-xiangxia"></span>
    </div>
    <div style="margin-top: 10px" v-if="addressList.length <= 3"></div>
    <div class="isShow" @click="close" v-if="isShow && addressList.length > 3">
      隐藏更多收货地址<span class="iconfont icon-xiangshang"></span>
    </div>
    <div class="wrapper wrapper_1200">
      <div class="title">订单信息</div>
      <div class="order">
        <div class="list">
          <div
            class="item acea-row row-between-wrapper"
            :class="!item.is_valid ? 'op' : ''"
            v-for="(item, index) in cartInfo"
            :key="index"
          >
            <div class="txtPic acea-row row-middle">
              <div class="pictrue">
                <img
                  :src="item.productInfo.attrInfo.image"
                  v-if="item.productInfo.attrInfo"
                />
                <img :src="item.productInfo.image" v-else />
              </div>
              <div class="text">
                <div class="name line2">{{ item.productInfo.store_name }}</div>
                <div class="info" v-if="item.productInfo.attrInfo">
                  {{ item.productInfo.attrInfo.suk }}
                </div>
                <div class="info" v-else>默认</div>
              </div>
            </div>
            <div>
              <span class="money" v-if="item.productInfo.attrInfo"
                >¥{{ item.productInfo.attrInfo.price }}</span
              >
              <span class="money" v-else>{{ item.productInfo.price }}</span>
              <span class="num">x{{ item.cart_num }}</span>
              <span class="font-color" v-if="item.is_valid">{{
                item.priceCon
              }}</span>
              <span class="font-color" v-else>不送达</span>
              <!-- <span class="font-color" v-if="item.productInfo.attrInfo">¥{{comsys.Mul(item.productInfo.attrInfo.price,item.cart_num)}}</span>
              <span class="font-color" v-else>¥{{comsys.Mul(item.productInfo.price,item.cart_num)}}</span> -->
            </div>
          </div>
        </div>
        <div class="coupon" v-if="!deduction">
          <div class="couponTitle acea-row row-between-wrapper">
            <div>使用优惠券</div>
            <div class="couponPrice font-color" v-if="couponList.length">
              -¥{{ couponPrice }}
            </div>
            <div class="couponPriceNo font-color" v-else>无可使用优惠券</div>
          </div>
          <div class="couponList acea-row row-middle">
            <div
              class="item acea-row row-middle"
              :class="item.receive_type === 4 ? 'svip' : ''"
              v-for="(item, index) in couponList"
              :key="index"
              @click="getCouponUser(index, item)"
            >
              <div class="name" v-if="item.type === 0">通用券</div>
              <div class="name" v-else-if="item.type === 1">品类券</div>
              <div class="name" v-else>商品券</div>
              <div class="money">
                满{{ item.use_min_price }}减{{ item.coupon_price }}
              </div>
              <div
                class="iconfont icon-xuanzhong4"
                :class="item.receive_type === 4 ? '' : 'font-color'"
                v-if="couponCurrent === index && couponUser"
              ></div>
            </div>
          </div>
        </div>
        <div class="coupon" v-if="!deduction">
          <div class="couponTitle acea-row row-between-wrapper">
            <div>积分抵扣</div>
            <div
              class="couponPrice font-color"
              v-if="parseFloat(userInfo.integral)"
            >
              -¥{{ computeData.deduction_price || 0 }}
            </div>
            <div class="couponPriceNo font-color" v-else>无可使用积分</div>
          </div>
          <div class="acea-row row-middle" v-if="parseFloat(userInfo.integral)">
            <div class="checkbox-wrapper">
              <label class="well-check">
                <input type="checkbox" name="" v-model="useIntegral" />
                <i class="icon"></i>
              </label>
            </div>
            <div class="integralCurrent">
              当前积分<span class="num font-color">{{
                useIntegral ? computeData.SurplusIntegral : userInfo.integral
              }}</span>
            </div>
          </div>
        </div>
        <!-- confirm -->
        <div v-if="confirm.length">
          <div
            class="coupon message acea-row"
            v-for="(item, index) in confirm"
            :key="index"
          >
            <div class="msgTitle">
              <span v-if="item.status" style="color: red">*</span>
              <span v-else style="marginleft: 15px"></span>
              <span class="confirmtit">{{ item.title }}</span>
            </div>
            <!-- text -->
            <div v-if="item.label == 'text'" class="confirm">
              <input
                type="text"
                :placeholder="'请填写' + item.title"
                v-model="item.value"
              />
            </div>
            <!-- number -->
            <div v-if="item.label == 'number'" class="confirm">
              <input
                type="number"
                :placeholder="'请填写' + item.title"
                v-model="item.value"
              />
            </div>
            <!-- email -->
            <div v-if="item.label == 'email'" class="confirm">
              <input
                type="text"
                :placeholder="'请填写' + item.title"
                v-model="item.value"
              />
            </div>
            <!-- data -->
            <div v-if="item.label == 'data'">
              <el-date-picker
                class="confirm selet"
                v-model="item.value"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <!-- time -->
            <div v-if="item.label == 'time'">
              <el-time-select
                v-model="item.value"
                class="confirm selet"
                :picker-options="{
                  start: '00:00',
                  step: '00:01',
                  end: '23:59',
                }"
                placeholder="选择时间"
              >
              </el-time-select>
            </div>
            <!-- id -->
            <div v-if="item.label == 'id'" class="confirm">
              <input
                type="idcard"
                :placeholder="'请填写' + item.title"
                v-model="item.value"
              />
            </div>
            <!-- phone -->
            <div v-if="item.label == 'phone'" class="confirm">
              <input
                type="tel"
                :placeholder="'请填写' + item.title"
                v-model="item.value"
              />
            </div>
            <!-- img -->
            <div v-if="item.label == 'img'">
              <el-upload
                class="confirm selet"
                list-type="picture-card"
                :action="upLoadUrl"
                :headers="myHeaders"
                :limit="8"
                :on-remove="
                  (i, b) => {
                    handleRemove(i, b, item);
                  }
                "
                :on-success="
                  (i, b) => {
                    handleSuccess(i, b, item);
                  }
                "
                :on-exceed="handleExceed"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>

        <div class="coupon message acea-row">
          <div class="msgTitle">买家留言</div>
          <textarea
            class="textarea"
            placeholder="填写内容与商家协商并确认，限150字内~"
            v-model="mark"
            maxlength="150"
          ></textarea>
        </div>
      </div>
      <div class="totalCon">
        <div class="total acea-row row-middle row-right">
          <div>
            <span class="font-color">{{ totalNmu }} </span>件商品，总商品金额：
          </div>
          <div class="money">
            ¥{{
              (
                parseFloat(priceGroup.totalPrice) +
                parseFloat(priceGroup.vipPrice)
              ).toFixed(2) || 0
            }}
          </div>
        </div>
        <div class="total acea-row row-middle row-right">
          <div>运费：</div>
          <div class="money">¥{{ freight || 0 }}</div>
        </div>
        <div
          class="total acea-row row-middle row-right"
          v-if="priceGroup.storePostageDiscount"
        >
          <div>运费折扣：</div>
          <div class="money">- ¥{{ priceGroup.storePostageDiscount || 0 }}</div>
        </div>
        <div
          class="total acea-row row-middle row-right"
          v-if="priceGroup.vipPrice"
        >
          <div>会员折扣：</div>
          <div class="money">- ¥{{ priceGroup.vipPrice || 0 }}</div>
        </div>
      </div>
      <div class="totalAmount">
        应付总额：<span class="money font-color">¥{{ totalPrice }}</span>
      </div>
      <div class="bnt acea-row row-right">
        <div class="submit bg-color" v-if="validCount > 0" @click="SubOrder">
          提交订单
        </div>
        <div class="submit bg-color-hui" v-else>提交订单</div>
      </div>
    </div>
    <!-- 添加地址弹窗 -->
    <el-dialog
      title="添加收货地址"
      :visible.sync="dialogVisible"
      width="700"
      :before-close="handleClose"
    >
      <div class="form-box">
        <div class="input-item" style="width: 48%; display: inline-block">
          <el-input
            v-model="formData.name"
            maxlength="25"
            placeholder="姓名"
          ></el-input>
        </div>
        <div
          class="input-item"
          style="width: 48%; display: inline-block; margin-left: 3%"
        >
          <el-input v-model="formData.phone" placeholder="手机号"></el-input>
        </div>
        <div class="input-item text-wrapper">
          <p @click="bindAdd" v-if="!cityData.province.city_id">
            请选择省/市/区/街道
          </p>
          <p
            @click="bindAdd"
            v-if="cityData.province.city_id"
            style="color: #333"
          >
            <span v-if="cityData.province.name"
              >{{ cityData.province.name }}/</span
            >
            <span v-if="cityData.city.name">{{ cityData.city.name }}/</span>
            <span>{{ cityData.district.name }}</span>
          </p>
          <div class="select-wrapper" v-if="isShowSelect">
            <div class="title-box" v-if="!cityData.province.city_id">
              选择省/自治区
            </div>
            <div class="title-box" v-if="cityData.step == 2">
              <span>{{ cityData.province.name }}</span
              >选择区县
            </div>
            <div class="title-box" v-if="cityData.step == 3">
              <span>{{ cityData.province.name }}</span>
              <span>{{ cityData.city.name }}</span
              >请选择配送区域
            </div>
            <div class="label-txt">
              <span
                v-for="(item, index) in cityData.list"
                :key="index"
                @click="bindCity(item)"
                :class="{ on: cityData.pid == item.city_id }"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
        <div class="input-item">
          <el-input
            type="textarea"
            rows="3"
            v-model="formData.con"
            placeholder="详细地址"
          ></el-input>
        </div>
        <div class="input-item">
          <el-checkbox v-model="formData.checked">设为默认</el-checkbox>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="bindSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import setting from "~/setting";

export default {
  name: "order_confirm",
  auth: "guest",
  data() {
    return {
      upLoadUrl: setting.apiBaseURL + "/upload/image",
      myHeaders: {},
      pics: [],
      dialogVisible: false,
      isShowSelect: false,
      formData: {
        name: "",
        phone: "",
        con: "",
        checked: false,
      },
      cityData: {
        pid: 0,
        step: 1,
        list: [],
        con: "",
        province: {},
        city: {},
        district: {},
      },
      addressList: [],
      current: 0,
      // cartId:"",//购物车id
      news: 1,
      cartInfo: [],
      confirm: [], //自定义留言
      couponList: [],
      couponCurrent: -1,
      couponUser: false,
      couponPrice: 0,
      userInfo: {},
      deduction: false, //判断是否为
      orderKey: "",
      addressId: 0,
      useIntegral: false, //是否使用积分
      couponId: 0,
      computeData: {},
      mark: "", //备注信息
      totalNmu: 0,
      priceGroup: {},
      totalPrice: 0, //最终商品金额；
      seckillId: 0,
      isShow: false,
      freight: 0,
      virtual_type: 0,
      validCount: 0,
    };
  },
  watch: {
    couponCurrent(n) {
      this.couponUser = true;
      this.couponPrice = this.couponList[n].coupon_price;
      this.couponId = this.couponList[n].id;
      this.computedPrice();
    },
    useIntegral() {
      this.computedPrice();
    },
  },
  async asyncData({ app, query }) {
    let [addressMsg, confirmMsg, couponListMsg] = await Promise.all([
      app.$axios.get("/address/list", {
        page: 1,
        limit: 50,
      }),
      app.$axios.post("/order/confirm", {
        cartId: query.cartId,
        new: query.new ? 1 : 0,
      }),
      app.$axios.get("/coupons/order/" + 0, {
        params: {
          cartId: query.cartId,
          new: query.new ? 1 : 0,
        },
      }),
    ]);
    confirmMsg.data.custom_form.map((e) => {
      if (e.label === "img") e.value = [];
    });
    return {
      addressList: addressMsg.data,
      cartId: query.cartId,
      cartInfo: confirmMsg.data.cartInfo,
      confirm: confirmMsg.data.custom_form || [],
      userInfo: confirmMsg.data.userInfo,
      deduction: confirmMsg.data.deduction,
      virtual_type: confirmMsg.data.virtual_type,
      orderKey: confirmMsg.data.orderKey,
      priceGroup: confirmMsg.data.priceGroup,
      totalPrice: confirmMsg.data.priceGroup.totalPrice,
      seckillId: confirmMsg.data.seckill_id,
      couponList: couponListMsg.data,
      freight: confirmMsg.data.priceGroup.storePostage,
      news: query.new ? 1 : 0,
      validCount: confirmMsg.data.valid_count,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "确认订单-" + this.$store.state.titleCon,
    };
  },
  created() {
    //计算数量的；
    let that = this,
      num = 0;
    that.cartInfo.forEach((item, index) => {
      num += item.cart_num;
    });
    that.totalNmu = num;
    that.addressList.forEach((item, index) => {
      if (item.is_default) {
        that.addressId = item.id;
        that.current = index;
      } else {
        that.addressId = that.addressList[0].id;
        that.current = 0;
      }
    });
    let local = this.$cookies.get("auth.strategy");
    this.myHeaders = {
      Authorization: this.$cookies.get(`auth._token.${local}`),
    };
    this.computedPrice();
    // that.getCouponList();
  },
  mounted() {
    //计算商品价格；
    let that = this;
    let tempArr = that.cartInfo.map((item, index) => {
      if (item.productInfo.attrInfo) {
        item.priceCon = that.comsys.Mul(
          item.productInfo.attrInfo.price,
          item.cart_num
        );
      } else {
        item.priceCon = that.comsys.Mul(item.productInfo.price, item.cart_num);
      }
      return {
        ...item,
      };
    });
    this.cartInfo = tempArr;
  },
  methods: {
    handleSuccess(response, i, c) {
      console.log(response, i, c);
      if (response.status === 200) {
        c.value.push(response.data.url);
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
    handleRemove(file, fileList, item) {
      console.log(file, fileList, item);
      item.value = [];
      fileList.forEach((i) => {
        item.value.push(i.response.data.url);
      });
    },
    handleExceed() {
      this.$message.warning("最多上传8张图片");
    },
    // 表单重置
    formReset() {
      this.formData.name = "";
      this.formData.phone = "";
      this.formData.con = "";
      this.formData.checked = false;
      this.cityData.province = {};
      this.cityData.city = {};
      this.cityData.district = {};
      this.cityData.step = 1;
      this.cityData.pid = 0;
    },
    handleClose() {
      this.formReset();
      this.dialogVisible = false;
    },
    getList() {
      this.$axios.get("address/list").then((res) => {
        this.addressList = res.data;
        this.addressId = res.data[0].id;
        this.computedPrice();
      });
    },
    bindAdd() {
      this.isShowSelect = !this.isShowSelect;
      if (this.cityData.step == 3) {
        return;
      } else {
        this.cityData.city = {};
        this.cityData.district = {};
        this.getCityList();
      }
    },
    getCityList() {
      this.$axios.get(`pc/get_city/${this.cityData.pid}`).then((res) => {
        this.cityData.list = res.data;
      });
    },
    addAddress() {
      this.dialogVisible = true;
    },
    // 选择城市
    bindCity(item) {
      if (this.cityData.step == 3) {
        this.cityData.district = item;
        this.cityData.pid = item.city_id;
        this.isShowSelect = false;
      } else {
        if (this.cityData.step == 1) {
          this.cityData.province = item;
        }
        if (this.cityData.step == 2) {
          this.cityData.city = item;
        }
        this.cityData.pid = item.city_id;
        this.cityData.step++;
        this.getCityList();
      }
    },
    bindSubmit() {
      if (!this.formData.name) {
        return Message.error("请填写姓名");
      }
      if (
        !this.formData.phone ||
        !/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.formData.phone)
      ) {
        return Message.error("请填写正确的手机号码");
      }
      if (!this.cityData.province.name) {
        return Message.error("请选择省市区");
      }
      if (!this.formData.con) {
        return Message.error("请填写详细地址");
      }
      this.$axios
        .post("address/edit", {
          address: {
            province: this.cityData.province.name,
            city: this.cityData.city.name,
            district: this.cityData.district.name,
            city_id: this.cityData.city.city_id,
          },
          is_default: this.formData.checked ? 1 : 0,
          real_name: this.formData.name,
          phone: this.formData.phone,
          detail: this.formData.con,
          id: this.editId,
        })
        .then((res) => {
          this.addressId = res.data.id;
          this.dialogVisible = false;
          this.getList();
          this.formReset();
          return Message.success("添加成功");
        })
        .catch((err) => {
          return Message.error(err);
        });
    },
    SubOrder() {
      let that = this;
      if (!that.addressId && !that.virtual_type)
        return Message.error("请添加收货地址");
      //遍历自定义留言筛选出图片这一项并将选择的照片赋值
      //赛选出状态为必填项无值时提示
      for (let i = 0; i < that.confirm.length; i++) {
        if (that.confirm[i].status && that.confirm[i].value == "") {
          return Message.error("请填写" + that.confirm[i].title);
        }
      }

      let data = {
        custom_form: that.confirm,
        addressId: that.addressId,
        formId: "",
        couponId: that.couponId,
        useIntegral: that.useIntegral,
        seckill_id: that.seckillId,
        mark: that.mark,
        from: "pc",
        new: that.news,
      };
      that.$axios
        .post("/order/create/" + that.orderKey, data)
        .then((res) => {
          if (that.totalPrice <= 0) {
            that.goPay(res.data.result.orderId);
          } else {
            that.$router.replace({
              path: "/payment",
              query: { result: res.data.result.orderId },
            });
          }
        })
        .catch((err) => {
          return Message.error(err);
        });
    },
    goPay(orderId) {
      let that = this;
      that.$axios
        .post("/order/pay", {
          uni: orderId,
          paytype: "yue",
          from: "pc",
        })
        .then((res) => {
          Message.success(res.msg);
          that.$store.commit("cartNum", 0);
          that.getOrderCoupon(orderId);
          setTimeout(function () {
            that.$router.push({
              path: "/order_detail",
              query: { orderId: orderId },
            });
          }, 1000);
        })
        .catch((err) => {
          Message.error(err.msg);
        });
    },
    //支付成功发送优惠券；
    getOrderCoupon(orderId) {
      let that = this;
      that.$axios.post("/v2/order/product_coupon/" + orderId).then((res) => {});
    },
    computedPrice() {
      this.$axios
        .post("/order/computed/" + this.orderKey, {
          addressId: this.addressId,
          useIntegral: this.useIntegral ? 1 : 0,
          couponId: this.couponId,
        })
        .then((res) => {
          this.computeData = res.data.result;
          this.totalPrice = res.data.result.pay_price;
          this.freight = res.data.result.pay_postage;
        })
        .catch((err) => {
          Message.error(err);
        });
    },
    getCouponUser(index) {
      this.couponCurrent = index;
      this.couponUser = !this.couponUser;
      if (this.couponCurrent !== index || !this.couponUser) {
        this.couponPrice = 0;
        this.couponId = 0;
      } else {
        this.couponPrice = this.couponList[index].coupon_price;
        this.couponId = this.couponList[index].id;
      }
      this.computedPrice();
    },
    // getConfirm(){
    //   let that = this;
    //   that.$axios.post("/order/confirm",{
    //       cartId: that.cartId,
    //       new: that.news
    //   }).then(res=>{
    //     that.cartInfo = res.data.cartInfo;
    //     that.userInfo = res.data.userInfo;
    //     that.deduction = res.data.deduction;
    //     that.orderKey = res.data.orderKey;
    //     that.priceGroup = res.data.priceGroup;
    //     that.totalPrice = that.comsys.Add(parseFloat(res.data.priceGroup.totalPrice), parseFloat(res.data.priceGroup.storePostage));
    //     that.seckillId = res.data.seckill_id;
    //   })
    // },
    // getCouponList(){
    //   let that = this;
    //   that.$axios.get('/coupons/order/'+0,{params:{
    //     cartId: this.cartId,
    //     new: this.news
    //   }}).then(res=>{
    //     that.couponList = res.data;
    //   })
    // },
    tapCurrent(index, item) {
      this.current = index;
      this.addressId = item.id;
      this.computedPrice();
    },
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
.input-item {
  margin-bottom: 20px;
}
.text-wrapper {
  position: relative;
  height: 40px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 4px;
  color: #cfcfcf;
  .select-wrapper {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 45px;
    width: 100%;
    padding: 0 15px;
    background: #fff;
    border: 1px solid #e93323;
    border-radius: 4px;
    line-height: 2;
    .title-box {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #efefef;
      color: #e93323;
      font-size: 14px;
      span {
        margin-right: 8px;
        color: #666666;
      }
    }
    .label-txt {
      margin: 8px 0 18px;
      color: #666666;
      font-size: 14px;
      span {
        margin-right: 10px;
        cursor: pointer;
        &.on {
          color: #e93323;
        }
      }
    }
  }
}
.order_confirm {
  .header {
    height: 60px;
    line-height: 60px;
    color: #999999;
    .home {
      color: #282828;
    }
  }
  .address {
    background-color: #fff;
    .title {
      height: 64px;
      font-size: 18px;
      padding: 0 28px;
      line-height: 64px;
    }
    .lines {
      width: 100%;
      height: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list {
      padding: 0 25px 26px 25px;
      height: 217px;
      overflow: hidden;
      &.on {
        height: auto;
      }
      .item {
        width: 250px;
        height: 170px;
        border: 1px solid #eaeaea;
        padding: 22px 27px;
        overflow: hidden;
        margin: 30px 0 0 30px;
        position: relative;
        cursor: pointer;
        &.on {
          border-color: #e93323;
        }
        .icon-xuanzhong4 {
          position: absolute;
          right: -4px;
          bottom: -4px;
          font-size: 27px;
        }
        .default {
          position: absolute;
          width: 56px;
          height: 23px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          line-height: 23px;
          top: 0;
          right: 0;
        }
        &.add {
          text-align: center;
          .iconfont {
            font-size: 35px;
            color: #bfbfbf;
            margin-top: 25px;
          }
          .tip {
            color: #c8c8c8;
            margin-top: 8px;
          }
        }
        .name {
          font-size: 16px;
        }
        .phone {
          margin-top: 9px;
        }
        .details {
          color: #999;
          margin-top: 4px;
        }
      }
    }
  }
  .isShow {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #707070;
    cursor: pointer;

    .iconfont {
      margin-left: 8px;
      font-size: 12px;
    }
  }
  .wrapper {
    background-color: #fff;
    padding-bottom: 56px;
    .title {
      height: 64px;
      line-height: 64px;
      padding: 0 28px;
      font-size: 18px;
    }
    .order {
      width: 1160px;
      margin: 0 auto;
      border: 1px solid #efefef;
      padding: 26px 32px;
      .list {
        .item {
          margin-bottom: 26px;
          .txtPic {
            .pictrue {
              width: 62px;
              height: 62px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .text {
              width: 342px;
              margin-left: 10px;
              .name {
                width: 100%;
                height: 38px;
              }
              .info {
                margin-top: 4px;
                color: #919191;
              }
            }
          }
          .font-color {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            width: 130px;
            text-align: right;
          }
          .money {
            font-size: 16px;
          }
          .num {
            margin-left: 6px;
          }
        }
      }
      .coupon {
        border-top: 1px solid #efefef;
        .couponTitle {
          font-size: 18px;
          margin: 20px 0;
          .couponPrice {
            font-size: 16px;
            font-weight: bold;
          }
          .couponPriceNo {
            font-size: 14px;
          }
        }
        .couponList {
          .item {
            height: 40px;
            width: 176px;
            border: 1px solid #e93323;
            margin: 0 15px 15px 0;
            position: relative;
            cursor: pointer;
            &.grey {
              border-color: #b4b4b4;
            }
            .iconfont {
              position: absolute;
              right: -3px;
              bottom: -3px;
              font-size: 20px;
            }
            .name {
              width: 70px;
              height: 100%;
              color: #fff;
              text-align: center;
              line-height: 40px;
              background-color: #e93323;
              &.grey {
                background-color: #b4b4b4;
              }
            }
            .money {
              width: 103px;
              text-align: center;
              color: #e93323;
              &.grey {
                color: #b4b4b4;
              }
            }
            &.svip {
              border-color: #333;
              .name {
                background-color: #333;
                color: #fdd7b4;
              }
              .money {
                color: #333;
              }
            }
          }
        }
        .integralCurrent {
          margin-left: 33px;
          .num {
            margin-left: 6px;
          }
        }
        .msgTitle {
          font-size: 18px;
        }
      }
      .message {
        padding-top: 26px;
        margin-top: 26px;
        .confirmtit {
          width: 90px;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        /deep/.el-input__inner {
          border: 1px solid #f7f7f7;
        }
        .selet {
          width: 820px;
        }
        .confirm {
          margin-left: 26px;
          font-size: 22rpx;
          input {
            width: 820px;
            padding: 12px 14px;
            // height: 120px;
            border: 1px solid #f7f7f7;
          }
        }
        .textarea {
          width: 820px;
          height: 120px;
          background-color: #f7f7f7;
          border: 0;
          outline: none;
          resize: none;
          padding: 12px 14px;
          // margin-left: 26px;
          margin-left: 60px;
        }
      }
      .integral {
        padding: 26px 0;
      }
    }
    .totalCon {
      padding: 27px 46px;
      .total {
        & ~ .total {
          margin-top: 12px;
        }
        .money {
          width: 120px;
          text-align: right;
          font-size: 16px;
        }
      }
    }
    .totalAmount {
      width: 1160px;
      height: 70px;
      line-height: 70px;
      background: #f7f7f7;
      text-align: right;
      padding-right: 22px;
      margin: 0 auto;
      .money {
        font-size: 20px;
        font-weight: bold;
        margin-left: 4px;
        width: 120px;
        display: inline-block;
      }
    }
    .bnt {
      margin: 38px 20px 0 0;
      cursor: pointer;
      .submit {
        width: 180px;
        height: 46px;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 46px;
      }
    }
  }
  .bg-color-hui {
    background-color: #bbb;
  }
  .op {
    opacity: 0.5;
  }
}
</style>
