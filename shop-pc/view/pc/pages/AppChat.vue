<template>
  <chat-room
    v-show="chatOptions.show"
    :chat-options="chatOptions"
    @chat-close="chatClose"
    @socket-open="socketOpen"
    @socket-error="socketError"
  ></chat-room>
</template>

<script>
import ChatRoom from "@/components/ChatRoom";
import appChat from "@/mixins/appChat";
export default {
  components: { ChatRoom },
  mixins: [appChat],
  auth: false,
  fetch({ store }) {
    store.commit("isHeader", false);
    store.commit("isFooter", false);
  },
  head() {
    return {
      title: "客服聊天-"+this.$store.state.titleCon
    }
  },
  created() {
    this.chatOptions.show = true;
    this.chatOptions.popup = false;
  },
};
</script>
