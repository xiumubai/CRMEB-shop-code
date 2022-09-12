export default {
  data() {
    return {
      chatOptions: {
        popup: true,
        show: false,
        goodsId: "",
        orderId: ""
      }
    };
  },
  created() {
    this.chatOptions.goodsId = this.$route.params.id || this.$route.query.productId || '';
    this.chatOptions.orderId = this.$route.query.orderId || '';
  },
  methods: {
    chatOpen() {
      const { href } = this.$router.resolve({
        name: `AppChat`
      });
      window.open(href, "_blank");
    },
    chatShow() {
      this.chatOptions.show = true;
      this.$cookies.set('unreadKefu',0);
      this.$store.commit('unreadKefu', 0);
    },
    chatClose() {
      this.chatOptions.show = false;
    },
    socketOpen() {
      console.log("socketOpen");
    },
    socketError() {
      console.error("socketError");
    }
  }
};
