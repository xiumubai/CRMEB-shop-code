(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/columnGoods/HotNewGoods/feedback"],{1937:function(t,e,n){"use strict";n.r(e);var i=n("daaf"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},"1f01":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$t("商城客服已离线")),i=t.$t("我要反馈"),a=t.$t("请输入姓名"),c=t.$t("请输入手机号"),o=t.$t("请填写内容"),u=t.$t("提交");t.$mp.data=Object.assign({},{$root:{m0:n,m1:i,m2:a,m3:c,m4:o,m5:u}})},c=[]},"6ebe":function(t,e,n){"use strict";n.r(e);var i=n("1f01"),a=n("1937");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("76f1");var o,u=n("f0c5"),f=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=f.exports},"6fb2":function(t,e,n){},"76f1":function(t,e,n){"use strict";var i=n("6fb2"),a=n.n(i);a.a},aa6c:function(t,e,n){"use strict";(function(t){n("d5c5");i(n("66fd"));var e=i(n("6ebe"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},daaf:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("bdf2"),a={name:"feedback",data:function(){return{name:"",phone:"",con:"",feedback:""}},onLoad:function(){this.getInfo()},methods:{getInfo:function(){var t=this;(0,i.serviceFeedBack)().then((function(e){t.feedback=e.data.feedback}))},subMit:function(){var t=this;return this.name?this.phone&&/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.phone)?this.con?void(0,i.feedBackPost)({rela_name:this.name,phone:this.phone,content:this.con}).then((function(e){t.$util.Tips({title:e.msg,icon:"success"},{tab:3})})).catch((function(t){that.$util.Tips({title:t})})):this.$util.Tips({title:this.$t("请填写内容")}):this.$util.Tips({title:this.$t("请输入正确的手机号码")}):this.$util.Tips({title:this.$t("请输入姓名")})}}};e.default=a}},[["aa6c","common/runtime","common/vendor"]]]);