<template>
  <div class="user-index">
    <div class="user-com-title" style="padding-left: 16px">账户管理</div>
    <div class="user-content">
      <div class="item user-info">
        <!-- <div class="title">我的信息</div> -->
        <div class="info">
          <span class="label">我的头像：</span>
          <img class="user-header" :src="userInfo.avatar" alt="" />
        </div>
        <div class="edit-txt">
          <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :on-success="handleSuccess"
            :show-file-list="false"
            :multiple="false"
            :limit="3"
            :on-exceed="handleExceed"
            :on-error="handleError"
            :headers="myHeaders"
            :file-list="fileList"
          >
            修改
          </el-upload>
        </div>
      </div>
      <div class="item text-info">
        <span class="label">我的昵称：</span>
        <span
          class="txt line1"
          style="display: inline-block; vertical-align: middle"
          >{{ userInfo.nickname }}</span
        >
        <div class="edit-txt" @click="editName">修改</div>
      </div>
      <div class="item text-info">
        <span class="label">手机号：</span>
        <span class="txt">{{ userInfo.phone }}</span>
        <div class="edit-txt" @click="isPhone = true">修改</div>
      </div>
      <div class="item text-info">
        <span class="label">我的ID：</span>
        <span class="txt">{{ userInfo.uid }}</span>
      </div>
      <div class="item text-info">
        <span class="label">密码设置：</span>
        <span class="txt">******</span>
        <div class="edit-txt" @click="isPassword = true">修改密码</div>
      </div>
      <!--        <div class="item user-info acea-row row-middle" style="padding-top: 20px">-->
      <!--          <span class="label">密码设置：</span>-->
      <!--          <span class="txt">******</span>-->
      <!--          <div class="edit-txt">-->
      <!--            <div @click="isPassword = true" style="cursor:pointer;">修改密码</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <div class="out-btn">
        <span @click="longOut">退出登录</span>
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="isPassword"
      width="545px"
      :before-close="handleClose"
    >
      <div class="form-box">
        <div class="input-item">
          <el-input
            placeholder="请输入手机号码"
            v-model="userInfo.phone"
            disabled
          >
            <template slot="prepend">+86</template>
          </el-input>
        </div>
        <div class="input-item">
          <el-input placeholder="请输入验证码" v-model="passwordData.code">
          </el-input>
          <el-button
            plain
            class="code-box"
            @click="getCode(0)"
            :disabled="disabled"
            >{{ text }}</el-button
          >
        </div>
        <div class="input-item">
          <el-input
            placeholder="请输入新密码"
            type="password"
            v-model="passwordData.newPassword"
          >
          </el-input>
        </div>
      </div>
      <div class="dialog-footer">
        <span slot="footer">
          <el-button type="primary" @click="bindPassword">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 修改手机号码 -->
    <el-dialog
      title="修改手机号码"
      :visible.sync="isPhone"
      width="545px"
      :before-close="handleClose"
    >
      <div class="form-box">
        <div class="input-item">
          <el-input placeholder="请输入新手机号码" v-model="phoneData.newPhone">
            <template slot="prepend">+86</template>
          </el-input>
        </div>
        <div class="input-item">
          <el-input placeholder="请输入验证码" v-model="phoneData.code">
          </el-input>
          <el-button
            plain
            class="code-box"
            @click="getCode(1)"
            :disabled="disabled"
            >{{ text }}</el-button
          >
        </div>
      </div>
      <div class="dialog-footer">
        <span slot="footer">
          <el-button type="primary" @click="bindNewPhone">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sendVerifyCode from "@/mixins/SendVerifyCode";
import { Message, MessageBox } from "element-ui";
import setting from "~/setting";
export default {
  name: "index",
  auth: "guest",
  mixins: [sendVerifyCode],
  data() {
    return {
      userInfo: {},
      fileList: [],
      upLoadUrl: setting.apiBaseURL + "/upload/image",
      myHeaders: {},
      isPassword: false, //修改密码号码弹窗
      passwordData: {
        phone: "",
        code: "",
        newPassword: "",
      },
      isPhone: false, //修改手机号码弹窗
      phoneData: {
        code: "",
        newPhone: "",
      },
      keyCode: "",
    };
  },
  fetch({ store }) {
    store.commit("isHeader", true);
    store.commit("isFooter", true);
  },
  head() {
    return {
      title: "账户管理-" + this.$store.state.titleCon,
    };
  },
  created() {},
  mounted() {
    let local = this.$cookies.get("auth.strategy");
    this.myHeaders = {
      Authorization: this.$cookies.get(`auth._token.${local}`),
    };
    this.userInfo = this.$auth.user;
    this.getCodeKey();
  },
  methods: {
    // 获取验证码的key
    getCodeKey() {
      this.$axios.$get("/verify_code").then((res) => {
        this.keyCode = res.key;
      });
    },
    handleSuccess(data) {
      if (data.status == 400) {
        return this.$message.error(data.msg);
      }
      this.$axios
        .post("user/edit", {
          avatar: data.data.url,
          nickname: this.userInfo.nickname,
        })
        .then((res) => {
          let jsonData = JSON.parse(JSON.stringify(this.userInfo));
          jsonData.avatar = data.data.url;
          this.$auth.$storage.setUniversal("user", jsonData);
          this.userInfo = this.$auth.user;
          this.$message.success("修改成功");
        })
        .catch((error) => {});
    },
    handleExceed(files, fileList) {
      this.$message.warning("请勿频繁重复上传");
    },
    handleError(file, fileList) {
      this.$message.error("上传失败");
    },
    // 修改昵称
    editName() {
      MessageBox.prompt("请输入昵称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "昵称不能为空",
      })
        .then(({ value }) => {
          this.$axios
            .post("user/edit", {
              nickname: value,
              avatar: this.userInfo.avatar,
            })
            .then((res) => {
              let jsonData = JSON.parse(JSON.stringify(this.userInfo));
              jsonData.nickname = value;
              this.$auth.$storage.setUniversal("user", jsonData);
              this.userInfo = this.$auth.user;
              this.$message.success("修改成功");
            });
        })
        .catch(() => {});
    },
    // 退出登录
    async longOut() {
      let val = this.$cookies.get("auth.strategy");
      await this.$auth.logout(val).then((res) => {
        this.$store.commit("cartNum", 0);
        this.$router.replace({
          path: "/",
        });
      });
    },
    // 修改密码
    bindPassword() {
      let that = this;
      if (!that.passwordData.code) return Message.error("请填写验证码");
      if (!that.passwordData.newPassword) return Message.error("请填写新密码");
      this.$axios
        .post("register/reset", {
          account: that.userInfo.phone,
          captcha: that.passwordData.code,
          password: that.passwordData.newPassword,
        })
        .then((res) => {
          Message.success(res.msg);
          this.isPassword = false;
          this.passwordData.phone = "";
          this.passwordData.code = "";
          this.passwordData.newPassword = "";
        })
        .catch((err) => {
          return Message.error(err);
        });
    },
    handleClose() {
      this.isPassword = false;
      this.isPhone = false;
      this.passwordData.phone = "";
      this.passwordData.code = "";
      this.passwordData.newPassword = "";
      this.phoneData.code = "";
      this.phoneData.newPhone = "";
    },
    // 发送验证码
    async getCode(type) {
      let that = this;
      if (type == 0) {
        await this.$axios
          .post("/register/verify", {
            phone: that.userInfo.phone,
            type: "mobile",
            key: that.keyCode,
          })
          .then((res) => {
            Message.success(res.msg);
            that.sendCode();
          })
          .catch((res) => {
            Message.error(res);
          });
      } else {
        await this.$axios
          .post("/register/verify", {
            phone: that.phoneData.newPhone,
            type: "mobile",
            key: that.keyCode,
          })
          .then((res) => {
            Message.success(res.msg);
            that.sendCode();
          })
          .catch((res) => {
            Message.error(res);
          });
      }
    },
    // 绑定新手机号码
    async bindNewPhone() {
      let that = this;
      if (!that.phoneData.newPhone) return Message.error("请填写新手机号码");
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phoneData.newPhone))
        return Message.error("请输入正确的手机号码");
      if (!that.phoneData.code) return Message.error("请填写验证码");
      this.$axios
        .post("user/updatePhone", {
          phone: that.phoneData.newPhone,
          captcha: that.phoneData.code,
          key: that.keyCode,
        })
        .then((res) => {
          Message.success(res.msg);
          this.isPhone = false;
          this.phoneData.newPhone = "";
          this.phoneData.code = "";
        })
        .catch((err) => {
          return Message.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-index {
  .user-content {
    padding: 34px 0;
    .item {
      padding-left: 16px;
      position: relative;
      font-size: 14px;
      border-bottom: 1px dashed #dddddd;
      margin-right: 54px;
      .edit-txt {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #e93323;
        cursor: pointer;
      }
      .label {
        display: inline-block;
        width: 80px;
        color: #777777;
      }
      &.user-info {
        padding-bottom: 20px;
        .title {
          color: #282828;
          font-size: 18px;
        }
        .info {
          margin-top: 20px;
          color: #777777;
          font-size: 14px;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            vertical-align: -44px;
            display: inline-block;
          }
        }
      }
      &.text-info {
        height: 70px;
        line-height: 70px;
        .edit-txt {
          top: 0;
        }
        .txt {
          color: #282828;
          width: 700px;
        }
      }
    }
    .out-btn {
      text-align: right;
      margin-right: 54px;
      span {
        display: inline-block;
        width: 130px;
        height: 40px;
        margin-top: 38px;
        line-height: 40px;
        text-align: center;
        background: #e93323;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .code-box {
    width: 115px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    margin-left: 30px;
  }
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  border-top: 1px solid #efefef;
  button {
    width: 190px;
    height: 45px;
  }
}
.user-header:hover {
  transform: rotate(666turn);
  transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 1s;
}
</style>
