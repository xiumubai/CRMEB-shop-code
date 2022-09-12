<template>
  <div class="chat-room">
    <div class="room" :class="{ win: !chatOptions.popup }" @click="roomClick">
      <div v-drag class="head">
        <div class="image">
          <img :src="service && service.avatar" />
        </div>
        <div class="name">{{ service && service.wx_name }}</div>
        <div
          :class="[
            'iconfont',
            muted ? 'icon-shengyinjingyinxianxing' : 'icon-shengyinyinliang',
          ]"
          @click="muted = !muted"
        ></div>
        <div class="iconfont icon-guanbi5" @click="close"></div>
      </div>
      <div class="main">
        <div class="chat">
          <div ref="record" class="record" @scroll="onScroll">
            <ul>
              <template v-for="item in records">
                <li
                  :key="item.id"
                  :class="{ right: item.uid === $auth.user.uid }"
                >
                  <div v-if="item.show" class="time-tag">
                    {{ item._add_time }}
                  </div>
                  <div class="avatar">
                    <img :src="item.avatar" />
                  </div>
                  <div class="content">
                    <div
                      v-if="item.msn_type === 1"
                      class="text"
                      v-html="item.msn"
                    ></div>
                    <div v-if="item.msn_type === 2" class="image">
                      <div class="text">
                        <i :class="`em ${item.msn}`"></i>
                      </div>
                    </div>
                    <div v-if="item.msn_type === 3" class="image">
                      <img :src="item.msn" />
                    </div>
                    <div v-if="item.msn_type === 5" class="goods">
                      <div class="thumb">
                        <img :src="item.productInfo.image" />
                      </div>
                      <div class="intro">
                        <div class="name">
                          {{ item.productInfo.store_name }}
                        </div>
                        <div class="attr">
                          <span>库存：{{ item.productInfo.stock }}</span>
                          <span>销量：{{ item.productInfo.sales }}</span>
                        </div>
                        <div class="group">
                          <div class="money">
                            ￥{{ item.productInfo.price }}
                          </div>
                          <nuxt-link
                            target="_blank"
                            :to="{
                              path: `/goods_detail/${item.productInfo.id}`,
                            }"
                            >查看商品 ></nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                    <template v-if="item.msn_type === 6">
                      <div
                        v-for="itm in item.orderInfo.cartInfo"
                        :key="itm.id"
                        class="order"
                      >
                        <div class="thumb">
                          <img :src="itm.productInfo.image" />
                        </div>
                        <div class="intro">
                          <div class="name">
                            订单ID：{{ item.orderInfo.order_id }}
                          </div>
                          <div class="attr">商品数量：{{ itm.cart_num }}</div>
                          <div class="group">
                            <div class="money">
                              ￥{{ itm.productInfo.price }}
                            </div>
                            <nuxt-link
                              target="_blank"
                              :to="{
                                path: '/order_detail',
                                query: { orderId: item.orderInfo.order_id },
                              }"
                              >查看订单 ></nuxt-link
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="editor">
            <div class="editor-hd">
              <div>
                <button
                  class="emoji-btn"
                  title="表情"
                  @click.stop="emojiSwitch"
                >
                  <i class="iconfont icon-biaoqing1"></i>
                </button>
                <button title="图片">
                  <el-upload
                    :action="uploadAction"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeUpload"
                  >
                    <i class="iconfont icon-tupian1"></i>
                  </el-upload>
                </button>
              </div>
              <div>
                <button class="end" @click="chatEnd">
                  <i class="iconfont icon-guanji"></i>结束
                </button>
              </div>
              <div v-show="emojiShow" class="emoji-panel">
                <i
                  v-for="(emoji, index) in emojiList"
                  :key="index"
                  :class="`em ${emoji}`"
                  @click="selectEmoji(emoji)"
                ></i>
              </div>
            </div>
            <div class="editor-bd">
              <textarea
                v-model="chatCont"
                placeholder="请输入文字内容"
                @keydown.enter="ctrlEnter"
              ></textarea>
            </div>
            <div class="editor-ft">
              <button :disabled="!chatCont" @click="sendMessage">发送</button>
            </div>
          </div>
        </div>
        <div class="notice">
          <div v-if="notice" class="rich" v-html="notice"></div>
          <div class="copy">
            <a href="http://www.crmeb.com/" target="_blank"
              >CRMEB提供技术支持</a
            >
          </div>
        </div>
      </div>
      <audio ref="audio" :src="audioSrc"></audio>
    </div>
  </div>
</template>

<script>
import "@/utils/emoji.css";
import emojiList from "@/utils/emoji";
import Socket from "@/libs/socket";
import Setting from "@/setting";
export default {
  name: "ChatRoom",
  auth: false,
  props: {
    chatOptions: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
  },
  directives: {
    drag: {
      inserted: function (el) {
        let x = 0;
        let y = 0;
        let l = 0;
        let t = 0;
        let isDown = false;
        el.onmousedown = function (e) {
          x = e.clientX;
          y = e.clientY;
          l = el.parentNode.offsetLeft;
          t = el.parentNode.offsetTop;
          isDown = true;
          el.style.cursor = "move";
          window.onmousemove = function (e) {
            if (isDown == false) {
              return;
            }
            let nx = e.clientX;
            let ny = e.clientY;
            let nl = nx - (x - l);
            let nt = ny - (y - t);
            el.parentNode.style.left = nl + "px";
            el.parentNode.style.top = nt + "px";
          };
          window.onmouseup = function () {
            isDown = false;
            el.style.cursor = "default";
            window.onmousemove = null;
            window.onmouseup = null;
          };
          return false;
        };
      },
    },
  },
  data() {
    return {
      emojiList: emojiList,
      emojiShow: false,
      recordList: [],
      page: 1,
      limit: 20,
      loading: false,
      finished: false,
      chatCont: "",
      service: {},
      serviceList: [],
      toUid: 0,
      uidTo: 0,
      uploadAction: `${Setting.apiBaseURL}/upload/image`,
      headers: null,
      notice: "",
      audio: null,
      muted: false,
      audioSrc: "",
      chatShow: false,
    };
  },
  watch: {
    chatOptions: {
      handler(newVal) {
        this.chatShow = newVal.show;
        if (newVal.show) {
          this.getService();
          this.getNotice();
        }
      },
      deep: true,
    },
    toUid() {
      this.socket.send({
        data: { id: this.toUid },
        type: "to_chat",
      });
      if (this.serviceList.length) {
        let result = this.serviceList.find((item) => {
          return item.uid === this.toUid;
        });
        if (result) {
          this.service = result;
        } else {
          this.service = this.serviceList[0];
        }
      } else {
        this.getService();
      }
    },
    muted(value) {
      this.audio.muted = value;
    },
  },
  computed: {
    records() {
      return this.recordList.map((item, index) => {
        if (index) {
          if (
            new Date(item._add_time) -
              new Date(this.recordList[index - 1]._add_time) >=
            300000
          ) {
            item.show = true;
          } else {
            item.show = false;
          }
        } else {
          item.show = false;
        }
        return item;
      });
    },
  },
  created() {
    let strategy = this.$auth.$storage.getCookie("strategy"),
      token = this.$auth.$storage.getCookie(`_token.${strategy}`);
    this.headers = {
      Authorization: token,
    };
    // this.getService();
    // this.getNotice();
  },
  mounted() {
    let that = this;
    this.$store.commit("unreadKefu", this.$cookies.get("unreadKefu"));
    this.$nextTick(() => {
      this.audio = this.$refs.audio;
      this.$axios
        .get("/get_workerman_url", {})
        .then((res) => {
          this.socket = new Socket(res.data.chat);
          this.socket.vm(this);
          this.$on(["reply", "chat"], (data) => {
            this.recordList.push(data);
            this.$nextTick(function () {
              this.$refs.record.scrollTop =
                this.$refs.record.scrollHeight - this.$refs.record.clientHeight;
            });
          });
          this.$on("socket_error", () => {
            this.$layer.msg("连接失败");
          });
          this.$on("err_tip", (data) => {
            this.$layer.msg(data.msg);
          });
        })
        .catch((err) => {
          that.$message.error(err);
        });
    });
    window.addEventListener("click", function () {
      that.emojiShow = false;
    });
  },
  beforeDestroy() {
    // this.socket.close();
  },
  methods: {
    roomClick(event) {
      if (
        !event.target.classList.contains("emoji-panel") &&
        !event.target.classList.contains("emoji-btn") &&
        !event.target.classList.contains("icon-biaoqing") &&
        this.emojiShow
      ) {
        // this.emojiShow = false;
      }
    },
    // enter 发送
    ctrlEnter(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
      if (this.chatCont.trim()) {
        this.sendMessage();
      }
    },
    // 关闭聊天窗口
    close() {
      this.$emit("chat-close");
    },
    // 选择表情
    selectEmoji(emoji) {
      this.emojiShow = false;
      // this.socket.send({
      //   data: {
      //     msn: emoji,
      //     type: 2,
      //     to_uid: this.toUid,
      //   },
      //   type: "chat",
      // });
      let val = `[${emoji}]`;
      this.chatCont += val;
    },
    onScroll(event) {
      if (event.target.scrollTop <= 30) {
        this.getRecordList();
      }
    },
    // 聊天记录
    getRecordList() {
      if (this.loading) {
        return;
      }
      if (this.finished) {
        return;
      }
      this.loading = true;
      this.$axios
        .get("/v2/user/service/record", {
          params: {
            toUid: this.toUid,
            page: this.page,
            limit: this.limit,
            uidTo: this.uidTo,
          },
        })
        .then((res) => {
          if (!this.toUid) {
            this.toUid = res.data.uid;
          }
          res.data.serviceList.forEach((el) => {
            if (el.msn_type == 1) {
              el.msn = this.replace_em(el.msn);
            }
          });
          let record = res.data.serviceList.length
            ? res.data.serviceList[0]
            : { id: 0 };
          this.uidTo = record.id;
          this.recordList = res.data.serviceList.concat(this.recordList);
          this.loading = false;
          this.finished = res.data.serviceList.length < this.limit;
          this.service.wx_name = res.data.nickname;
          this.service.avatar = res.data.avatar;
          this.page++;
          if (this.page === 2) {
            this.$nextTick(() => {
              this.$refs.record.scrollTop =
                this.$refs.record.scrollHeight - this.$refs.record.clientHeight;
            });
            if (this.chatOptions.goodsId) {
              this.sendGoods();
            }
            if (this.chatOptions.orderId) {
              this.sendOrder();
            }
          }
        })
        .catch((err) => {
          this.$layer.msg(err);
        });
    },
    // 表情包显示隐藏
    emojiSwitch() {
      this.emojiShow = !this.emojiShow;
    },
    // 发送消息
    sendMessage() {
      this.socket.send({
        data: {
          msn: this.chatCont,
          type: 1,
          to_uid: this.toUid,
        },
        type: "chat",
      });
      this.chatCont = "";
    },
    getService() {
      this.$axios
        .get("/user/service/list")
        .then((res) => {
          this.serviceList = res.data;
          this.getRecordList();
        })
        .catch((err) => {
          this.$layer.msg(err);
        });
    },
    chat(data) {
      if (data.uid != this.$auth.user.uid && this.audio) {
        this.audio.play();
      }
      if (data.msn_type == 1) {
        if (data.msn.includes("[") && data.msn.includes("]")) {
          // data.msn = data.msn.replace("[","").replace("]","")
          // data.msn_type = 2
          data.msn = this.replace_em(data.msn);
        }
      }
      this.recordList.push(data);
      this.$nextTick(() => {
        this.$refs.record.scrollTop =
          this.$refs.record.scrollHeight - this.$refs.record.clientHeight;
      });
    },
    chatNum(data) {
      if (!this.chatShow) {
        let num = this.$store.state.unreadNum + 1;
        this.$store.commit("unreadKefu", num);
        this.$cookies.set("unreadKefu", num);
      }
    },
    toTransfer(data) {
      this.socket.send({
        data: {
          id: data.toUid,
        },
        type: "to_chat",
      });
    },
    // 聊天表情转换
    replace_em(str) {
      str = str.replace(/\[em-([\s\S]*)\]/g, "<span class='em em-$1'/></span>");
      return str;
    },
    sendGoods() {
      if (this.chatOptions.goodsId) {
        if (this.socket) {
          this.socket.send({
            data: {
              msn: this.chatOptions.goodsId,
              type: 5,
              to_uid: this.toUid,
            },
            type: "chat",
          });
        } else {
          this.$message.warning("正在连接中");
        }
      }
    },
    sendOrder() {
      if (this.chatOptions.orderId) {
        if (this.socket) {
          this.socket.send({
            data: {
              msn: this.chatOptions.orderId,
              type: 6,
              to_uid: this.toUid,
            },
            type: "chat",
          });
        } else {
          this.$message.warning("正在连接中");
        }
      }
    },
    chatEnd() {
      this.socket.send({
        data: {
          msn: "结束聊天",
          type: 1,
          to_uid: this.toUid,
        },
        type: "chat",
      });
    },
    getNotice() {
      this.$axios.get("/user/service/get_adv").then((res) => {
        this.notice = res.data.content;
        this.audioSrc = res.data.sound;
      });
    },
    beforeUpload(file) {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImage) {
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
      }
      return isImage;
    },
    uploadSuccess(response) {
      if (response.status === 200) {
        this.socket.send({
          data: {
            msn: response.data.url,
            type: 3,
            to_uid: this.toUid,
          },
          type: "chat",
        });
      } else if (response.status === 400) {
        this.$message.error(response.msg);
      }
    },
    uploadError(error) {
      this.$message.error(error);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  .room {
    border-radius: 10px;
    position: fixed;
    top: calc(50% - 327px);
    left: calc(50% - 365px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 730px;
    height: 654px;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 1px 1px 15px 0 rgba(0, 0, 0, 0.1);

    &.win {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .head {
      display: flex;
      align-items: center;
      height: 50px;
      padding-right: 15px;
      padding-left: 20px;
      background: linear-gradient(270deg, #1890ff 0%, #3875ea 100%);

      .image {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .name {
        flex: 1;
        min-width: 0;
        margin-left: 15px;
        font-size: 16px;
        color: #ffffff;
      }

      .iconfont {
        width: 25px;
        height: 25px;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
    }

    .main {
      flex: 1;
      display: flex;
      min-height: 0;

      .chat {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .record {
        flex: 1;
        min-height: 0;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          padding: 20px;
        }

        li {
          ~ li {
            margin-top: 20px;
          }

          &::after {
            content: "";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }

          &.right {
            .avatar {
              float: right;
            }

            .content {
              text-align: right;

              > div {
                text-align: left;
              }
            }
          }
        }

        .time-tag {
          padding-top: 10px;
          padding-bottom: 30px;
          text-align: center;
          color: #999999;
        }

        .avatar {
          float: left;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;

          &.right {
            float: right;
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .content {
          margin-right: 56px;
          margin-left: 56px;
        }

        .text {
          display: inline-block;
          min-height: 41px;
          padding: 10px 12px;
          border-radius: 10px;
          background-color: #f5f5f5;
          font-size: 15px;
          line-height: 21px;
          color: #000000;
          word-break: break-all;
        }

        .image {
          display: inline-block;
          max-width: 50%;
          border-radius: 10px;
          overflow: hidden;

          img {
            display: block;
            max-width: 100%;
          }
        }

        .goods,
        .order {
          display: inline-flex;
          align-items: center;
          width: 320px;
          padding: 10px 13px;
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        .thumb {
          width: 60px;
          height: 60px;
          border-radius: 5px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .intro {
          flex: 1;
          min-width: 0;
          margin-left: 10px;

          .name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 15px;
            color: #000000;
          }

          .attr {
            margin-top: 5px;
            font-size: 12px;
            color: #999999;

            span {
              vertical-align: middle;

              ~ span {
                margin-left: 10px;
              }
            }
          }

          .group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;

            .money {
              font-size: 14px;
              color: #ff0000;
            }

            a {
              font-size: 12px;
              color: #1890ff;
            }
          }
        }
      }

      .editor {
        display: flex;
        flex-direction: column;
        height: 162px;
        border-top: 1px solid #ececec;

        > div {
          &:first-child {
            font-size: 0;
          }
        }

        button {
          border: none;
          background: none;
          outline: none;

          ~ button {
            margin-left: 20px;
          }

          &.end {
            font-size: 15px;
          }

          &:hover {
            color: #1890ff;

            .iconfont {
              color: #1890ff;
            }
          }
        }

        .editor-hd {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          padding-right: 20px;
          padding-left: 20px;

          .iconfont {
            line-height: 1;
            color: #333333;
          }

          .emoji-panel {
            position: absolute;
            bottom: 100%;
            left: 5px;
            width: 390px;
            padding-bottom: 10px;
            border: 1px solid #ececec;
            margin-bottom: 5px;
            background-color: #ffffff;
            box-shadow: 1px 0 16px 0 rgba(0, 0, 0, 0.05);

            .em {
              width: 28px;
              height: 28px;
              padding: 4px;
              margin-top: 10px;
              margin-left: 10px;
              box-sizing: border-box;

              &:hover {
                background-color: #ececec;
              }
            }
          }
        }

        .icon-biaoqing1,
        .icon-tupian1 {
          font-size: 22px;
        }

        .icon-guanji {
          margin-right: 5px;
          font-size: 15px;
        }

        .editor-bd {
          flex: 1;
          min-height: 0;

          textarea {
            display: block;
            width: 100%;
            height: 100%;
            padding-right: 20px;
            padding-left: 20px;
            border: none;
            outline: none;
            resize: none;
            white-space: pre-wrap;
            overflow-wrap: break-word;

            &::-webkit-scrollbar {
              display: none;
            }
          }
        }

        .editor-ft {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 20px;
          padding-bottom: 20px;

          button {
            width: 68px;
            height: 26px;
            border: none;
            border-radius: 3px;
            background-color: #3875ea;
            outline: none;
            font-size: 13px;
            color: #ffffff;

            &:disabled {
              background-color: #cccccc;
            }
          }
        }
      }

      .notice {
        display: flex;
        flex-direction: column;
        width: 260px;
        border-left: 1px solid #ececec;

        .rich {
          flex: 1;
          min-height: 0;
          padding: 18px 18px 0;
          overflow-x: hidden;
          overflow-y: auto;

          &::-webkit-scrollbar {
            display: none;
          }

          /deep/ img {
            width: 100%;
          }

          /deep/ video {
            width: 100%;
          }
        }

        .copy {
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 12px;
          text-align: center;
          a {
            color: #cccccc !important;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
