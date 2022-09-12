import Setting from "@/setting";

const Socket = function(wsSocketUrl) {
  this.ws = new WebSocket(wsSocketUrl);
  this.ws.onopen = this.onOpen.bind(this);
  this.ws.onerror = this.onError.bind(this);
  this.ws.onmessage = this.onMessage.bind(this);
  this.ws.onclose = this.onClose.bind(this);
};

function wss(wsSocketUrl) {
  let ishttps = document.location.protocol == "https:";
  if (ishttps) {
    return wsSocketUrl.replace("ws:", "wss:");
  } else {
    return wsSocketUrl.replace("wss:", "ws:");
  }
}

Socket.prototype = {
  vm(vm) {
    this.vm = vm;
  },
  close() {
    clearInterval(this.timer);
    this.ws.close();
  },
  onOpen: function() {
    let strategy = this.vm.$auth.$storage.getCookie("strategy"),
      token = this.vm.$auth.$storage
        .getCookie(`_token.${strategy}`)
        .split(" ")[1];
    this.init();
    this.send({
      type: "login",
      data: token
    });
    this.vm.$emit("socket-open");
  },
  init: function() {
    var that = this;
    this.timer = setInterval(function() {
      that.send({ type: "ping" });
    }, 10000);
  },
  send: function(data) {
    return this.ws.send(JSON.stringify(data));
  },
  onMessage: function(res) {
    const { type, data = {} } = JSON.parse(res.data);
    if (type === "chat" || type === "reply") {
      this.vm.chat(data);
    }
    if (type === "reply") {
      this.vm.chatNum(data);
    }
    if (type == "to_transfer") {
      this.vm.toTransfer(data);
    }
    // this.vm.$emit(type, data);
  },
  onClose: function() {
    clearInterval(this.timer);
  },
  onError: function(e) {
    this.vm.$emit("socket-error", e);
  }
};

Socket.prototype.constructor = Socket;

export default Socket;
