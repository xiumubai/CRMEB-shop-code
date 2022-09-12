<template>
  <div class="login">
    <div class="wrapper_1200">
      <div class="header acea-row row-between-wrapper" v-show="isShow">
        <div class="acea-row row-middle">
          <div class="icon" @click="goHome">
            <img :src="info.logoUrl" />
          </div>
          <div class="name" @click="goHome">官方商城</div>
        </div>
        <div class="acea-row row-middle">
          <div class="item">
            <span class="iconfont icon-pinzhongqiquan font-color"></span
            >品种齐全
          </div>
          <div class="item">
            <span class="iconfont icon-dijiachangxuan font-color"></span
            >低价畅选
          </div>
          <div class="item">
            <span class="iconfont icon-zhengpinhanghuo font-color"></span
            >正品行货
          </div>
        </div>
      </div>
    </div>
    <div class="loginBg min_wrapper_1200">
      <div class="wrapper" v-show="current === 1">
        <div class="title">
          快速登录/注册
          <!--@click="current = 3"-->
          <span
            @click="ewmLogin"
            v-if="appidNum"
            class="iconfont icon-weixindenglu1"
          ></span>
          <!-- <a :href="`https://open.weixin.qq.com/connect/qrconnect?appid=${appidNum}&redirect_uri=${hosts}&response_type=code&scope=snsapi_login&state=EqMkUDWh8F3euWlt23jHJ8ZJuaTAVPZyiKEoq5U0`" v-if="appidNum" class="iconfont icon-weixindenglu1"></a> -->
        </div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" v-model="account" />
        </div>
        <div class="item verificat acea-row row-between-wrapper">
          <input type="text" placeholder="请输入验证码" v-model="captcha" />
          <button
            class="code font-color"
            :disabled="disabled"
            :class="disabled === true ? 'on' : ''"
            @click="code"
          >
            {{ text }}
          </button>
        </div>
        <div class="isAgree">
          <el-checkbox v-model="agreement"></el-checkbox
          ><span class="agree"
            >我已阅读并同意<span class="agreement" @click="agreementTap(4)"
              >《用户协议》</span
            >和<span class="agreement" @click="agreementTap(3)"
              >《隐私协议》</span
            ></span
          >
        </div>
        <div class="signIn bg-color" @click="loginMobile">登录/注册</div>
        <div class="fastLogin font-color" @click="current = 2">账号登录</div>
      </div>
      <div class="wrapper" v-show="current === 2">
        <div class="title">
          账号登录
          <!--@click="current = 3"-->
          <span
            @click="ewmLogin"
            v-if="appidNum"
            class="iconfont icon-weixindenglu1"
          ></span>
          <!-- <a :href="`https://open.weixin.qq.com/connect/qrconnect?appid=${appidNum}&redirect_uri=${hosts}&response_type=code&scope=snsapi_login&state=EqMkUDWh8F3euWlt23jHJ8ZJuaTAVPZyiKEoq5U0`" v-if="appidNum" class="iconfont icon-weixindenglu1"></a> -->
        </div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input
            type="text"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="account"
          />
        </div>
        <div class="item pwd">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="isAgree">
          <el-checkbox v-model="agreement"></el-checkbox
          ><span class="agree"
            >我已阅读并同意<span class="agreement" @click="agreementTap(4)"
              >《用户协议》</span
            >和<span class="agreement" @click="agreementTap(3)"
              >《隐私协议》</span
            ></span
          >
        </div>
        <div class="signIn bg-color" @click="loginH5">登录</div>
        <div class="fastLogin font-color" @click="current = 1">
          快速登录/注册
        </div>
      </div>
      <!--<div class="wxLogin" v-if="current === 3">-->
      <!--<div class="title">扫码登录<div class="iconfont icon-zhanghaodenglu1" @click="current = 1"></div></div>-->
      <!--<div class="wxCode">-->
      <!--<div class="acea-row row-between-wrapper">-->
      <!--<span class="iconfont icon-erweimabianjiao"></span>-->
      <!--<span class="iconfont icon-erweimabianjiao right"></span>-->
      <!--</div>-->
      <!--<div class="pictrue">-->
      <!--<img src="../assets/images/loginBg.jpg">-->
      <!--</div>-->
      <!--<div class="acea-row row-between-wrapper">-->
      <!--<span class="iconfont icon-erweimabianjiao bottomL"></span>-->
      <!--<span class="iconfont icon-erweimabianjiao right bottomR"></span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="tip">请使用微信扫一扫登录</div>-->
      <!--</div>-->
    </div>
    <div class="footer wrapper_1200">
      <div>
        <span>联系电话：{{ info.contact_number }}</span>
        <span class="adress">地址：{{ info.company_address }}</span>
      </div>
      <div class="record">
        {{ info.copyright
        }}<a href="https://beian.miit.gov.cn/" target="_blank" class="num">{{
          info.record_No
        }}</a>
      </div>
    </div>
    <el-dialog
      class="detail-bd"
      :title="agreementTitle"
      :visible.sync="userAgreement"
      :show-close="false"
      width="900px"
      center
    >
      <div class="userAgree" v-html="agreementCon"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreementClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";
export default {
  name: "login",
  auth: false,
  mixins: [sendVerifyCode],
  data() {
    return {
      current: 1,
      account: "",
      password: "",
      captcha: "",
      keyCode: "",
      info: "",
      isShow: true,
      appidNum: "",
      hosts: "",
      codes: "",
      fromPath: "",
      agreement: false,
      userAgreement: false,
      agreementCon1: "",
      agreementCon2: "",
      agreementCon: "",
      agreementTitle: ""
    };
  },
  async asyncData({ $axios, query }) {
    const keyCode = await $axios.$get("/verify_code");
    const companyInfo = await $axios.$get("/pc/get_company_info");
    const appidNum = await $axios.$get("/pc/get_appid");
    const agreement1 = await $axios.$get("/get_agreement/4");
    const agreement2 = await $axios.$get("/get_agreement/3");
    return {
      keyCode: keyCode.key,
      info: companyInfo,
      appidNum: appidNum.appid,
      codes: query.code || "",
      agreementCon1: agreement1.content,
      agreementCon2: agreement2.content,
    };
  },
  fetch({ store }) {
    store.commit("isHeader", false);
    store.commit("isFooter", false);
  },
  head() {
    return {
      title: this.$store.state.titleCon,
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
    this.hosts = location.origin + location.pathname;
    this.fromPath = this.$cookies.get("fromPath");
    if (this.codes) {
      this.loginCode();
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      if (e.keyCode === 13) {
        if (this.current === 1) {
          this.loginMobile();
        } else if (this.current === 2) {
          this.loginH5();
        }
      }
    },
    ewmLogin() {
      if (!this.agreement) return this.$message.error("请确认阅读用户协议");
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${this.appidNum}&redirect_uri=${this.hosts}&response_type=code&scope=snsapi_login&state=EqMkUDWh8F3euWlt23jHJ8ZJuaTAVPZyiKEoq5U0`;
    },
    agreementTap(type) {
      if(type == 4){
        this.agreementTitle = '用户协议'
        this.agreementCon = this.agreementCon1
      }else{
        this.agreementTitle = '隐私协议'
        this.agreementCon = this.agreementCon2
      }
      this.userAgreement = true;
    },
    agreementClose() {
      this.userAgreement = false;
      this.agreement = true;
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    async loginCode() {
      let that = this;
      await that.$auth
        .loginWith("local3", { params: { code: this.codes } })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch((err) => {
          // that.$layer.msg('登录失败');
        });
    },
    async loginH5() {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      if (!that.password) return that.$message.error("请填写密码");
      let userInfo = {
        account: that.account,
        password: that.password,
      };
      await that.$auth
        .loginWith("local1", { data: userInfo })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch((err) => {
          that.$message.error(err);
        });
    },
    async loginMobile() {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      if (!that.captcha) return that.$message.error("请填写验证码");
      if (!/^[\w\d]+$/i.test(that.captcha))
        return that.$message.error("请输入正确的验证码");
      let userInfo = {
        phone: that.account,
        captcha: that.captcha,
      };
      await that.$auth
        .loginWith("local2", { data: userInfo })
        .then(() => {
          that.isShow = false;
          if (this.fromPath) {
            let path = this.fromPath.split(that.$router.history.base);
            let fromPath = path.join("");
            that.$router.push(fromPath);
          } else {
            that.$router.push("/");
          }
          that.$cookies.remove("fromPath");
        })
        .catch((err) => {
          that.$message.error("验证码错误");
        });
    },
    async code() {
      let that = this;
      if (!that.agreement) return that.$message.error("请确认阅读用户协议");
      if (!that.account) return that.$message.error("请填写手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$message.error("请输入正确的手机号码");
      await this.$axios
        .post("/register/verify", {
          phone: that.account,
          type: "mobile",
          key: that.keyCode,
        })
        .then((res) => {
          that.$message.success(res.msg);
          that.sendCode();
        })
        .catch((err) => {
          that.$message.error(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  .header {
    height: 110px;
    .icon {
      cursor: pointer;
      width: 112px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 28px;
      margin-left: 15px;
      cursor: pointer;
    }
    .item {
      margin-left: 40px;
      font-size: 16px;
      color: #666666;
      .iconfont {
        margin-right: 6px;
        font-size: 20px;
      }
    }
  }
  .loginBg {
    width: 100%;
    height: 608px;
    background: url(../assets/images/loginBg.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .wxLogin {
      width: 450px;
      height: 427px;
      background: #ffffff;
      position: absolute;
      right: 360px;
      top: 91px;
      padding-top: 34px;
      .title {
        font-weight: 400;
        font-size: 20px;
        padding-left: 30px;
        position: relative;
        .iconfont {
          font-size: 60px;
          position: absolute;
          right: 0;
          top: -35px;
        }
      }
      .wxCode {
        width: 220px;
        margin: 38px auto 0 auto;
        .iconfont {
          font-size: 30px;
          color: #cbcbcb;
          &.right {
            transform: rotateY(180deg);
          }
          &.bottomL {
            transform: rotateX(180deg);
          }
          &.bottomR {
            transform: rotateX(180deg);
          }
        }
        .pictrue {
          width: 190px;
          height: 190px;
          margin: -15px auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .tip {
        color: #666;
        font-size: 16px;
        margin-top: 20px;
        text-align: center;
      }
    }
    .wrapper {
      width: 450px;
      height: 427px;
      background-color: #fff;
      position: absolute;
      top: 91px;
      right: 360px;
      text-align: center;
      padding: 70px 0;
      .title {
        font-size: 20px;
        font-weight: 400;
        position: relative;
        .iconfont {
          position: absolute;
          top: -71px;
          right: 0;
          font-size: 60px;
          cursor: pointer;
        }
      }
      .item {
        width: 358px;
        height: 50px;
        border: 1px solid #dbdbdb;
        margin: 0 auto;
        &.phone {
          margin-top: 34px;
          .number {
            width: 65px;
            height: 100%;
            line-height: 50px;
            color: #666666;
            border-right: 1px solid #dbdbdb;
          }
          input {
            width: 291px;
          }
        }
        &.pwd {
          margin-top: 20px;
          input {
            width: 100%;
          }
        }
        &.verificat {
          margin-top: 20px;
          input {
            width: 246px;
          }
          .code {
            width: 110px;
            height: 100%;
            border: 0;
            background-color: #fff;
            border-left: 1px solid #dbdbdb;
            &.on {
              color: #ccc !important;
            }
          }
        }
        input {
          padding-left: 15px;
          height: 100%;
          border: 0;
          outline: none;
        }
      }
      .signIn {
        width: 358px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin: 24px auto 0 auto;
        color: #fff;
        cursor: pointer;
      }
      .fastLogin {
        margin-top: 14px;
        cursor: pointer;
      }
    }
  }
  .isAgree {
    width: 358px;
    margin: 12px auto 0 auto;
    text-align: left;
    .agree {
      margin-left: 6px;
      color: #999999;
      cursor: pointer;
      .agreement {
        color: #e93323;
      }
    }
  }
  .footer {
    text-align: center;
    font-size: 12px;
    color: #555;
    margin-top: 100px;
    .adress {
      margin-left: 40px;
    }
    .record {
      margin-top: 6px;
      .num {
        margin-left: 10px;
        &:hover {
          color: #e93323;
        }
      }
    }
  }
}
</style>
