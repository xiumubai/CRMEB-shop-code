(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/points_mall/integral_order_status"],{"591e":function(t,n,e){"use strict";e.r(n);var o=e("e79e"),i=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=i.a},"65dc":function(t,n,e){"use strict";e.r(n);var o=e("8aa2"),i=e("591e");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("f3c1");var a,u=e("f0c5"),d=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=d.exports},"7d29":function(t,n,e){},"8aa2":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement,e=(t._self._c,"offline"!=t.order_pay_info.pay_type?t.$t("商品兑换成功"):null),o="offline"==t.order_pay_info.pay_type?t.$t("订单创建成功"):null,i=t.$t("订单编号"),r=t.$t("兑换时间"),a=t.$t("兑换方式"),u=t.$t("积分兑换"),d=t.$t("兑换积分"),s=0==t.order_pay_info.paid&&"offline"!=t.order_pay_info.pay_type?t.$t("失败原因"):null,f=0==t.order_pay_info.paid&&"offline"!=t.order_pay_info.pay_type&&2==t.status?t.$t("取消兑换"):null,c=t.$t("查看详情"),l=t.$t("返回首页");t.$mp.data=Object.assign({},{$root:{m0:e,m1:o,m2:i,m3:r,m4:a,m5:u,m6:d,m7:s,m8:f,m9:c,m10:l}})},r=[]},e79e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("f7cb"),i=(e("910a"),e("1118")),r=e("26cb"),a=u(e("cf74"));function u(t){return t&&t.__esModule?t:{default:t}}var d=function(){e.e("components/Authorize").then(function(){return resolve(e("4a3a"))}.bind(null,e)).catch(e.oe)},s={components:{authorize:d},mixins:[a.default],data:function(){return{orderId:"",order_pay_info:{paid:1,_status:{}},isAuto:!1,isShowAuth:!1,status:0,msg:"",couponsHidden:!0,couponList:[]}},computed:(0,r.mapGetters)(["isLogin"]),watch:{isLogin:{handler:function(t,n){t&&this.getOrderPayInfo()},deep:!0}},onLoad:function(t){if(!t.order_id)return this.$util.Tips({title:this.$t("缺少参数无法查看订单兑换状态")},{tab:3,url:1});this.orderId=t.order_id,this.status=t.status||0,this.msg=t.msg||"",this.isLogin?this.getOrderPayInfo():(0,i.toLogin)()},methods:{openTap:function(){this.$set(this,"couponsHidden",!this.couponsHidden)},onLoadFun:function(){this.getOrderPayInfo()},getOrderPayInfo:function(){var n=this;t.showLoading({title:n.$t("正在加载中")}),(0,o.integralOrderDetails)(n.orderId).then((function(e){t.hideLoading(),n.$set(n,"order_pay_info",e.data),t.setNavigationBarTitle({title:n.$t("兑换成功")}),n.getOrderCoupon()})).catch((function(n){t.hideLoading()}))},getOrderCoupon:function(){var t=this;orderCoupon(t.orderId).then((function(n){t.couponList=n.data}))},goIndex:function(n){t.switchTab({url:"/pages/index/index"})},goOrderDetails:function(n){var e=this;t.navigateTo({url:"/pages/points_mall/integral_order_details?order_id="+e.orderId})}}};n.default=s}).call(this,e("543d")["default"])},f3c1:function(t,n,e){"use strict";var o=e("7d29"),i=e.n(o);i.a},f4e0:function(t,n,e){"use strict";(function(t){e("d5c5");o(e("66fd"));var n=o(e("65dc"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])}},[["f4e0","common/runtime","common/vendor"]]]);