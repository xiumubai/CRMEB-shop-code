(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/order_pay_status/components/lotteryAleart"],{"1e80":function(t,a,e){},"27d8":function(t,a,e){"use strict";var n=e("1e80"),r=e.n(n);r.a},"5b44":function(t,a,e){"use strict";e.r(a);var n=e("c84a"),r=e.n(n);for(var u in n)"default"!==u&&function(t){e.d(a,t,(function(){return n[t]}))}(u);a["default"]=r.a},"5e17":function(t,a,e){"use strict";e.r(a);var n=e("818f"),r=e("5b44");for(var u in r)"default"!==u&&function(t){e.d(a,t,(function(){return r[t]}))}(u);e("27d8");var i,o=e("f0c5"),s=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"21201088",null,!1,n["a"],i);a["default"]=s.exports},"818f":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return u})),e.d(a,"a",(function(){return n}));var r=function(){var t=this,a=t.$createElement;t._self._c},u=[]},c84a:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{aleartData:{}}},props:{aleartType:{type:Number},alData:{type:Object},aleartStatus:{type:Boolean,default:!1}},watch:{aleartType:function(t){1===t?this.aleartData={title:this.$t("no_raffle"),msg:this.$t("lottery_msg"),btn:this.$t("i_see")}:2===t&&(this.aleartData={title:this.$t("lottery_result"),img:this.alData.image,msg:this.alData.prompt,btn:this.$t("ok"),type:this.alData.type})},aleartStatus:function(t){t||(this.aleartData={})}},methods:{posterImageClose:function(t){this.$emit("close",!1)}}};a.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goods/order_pay_status/components/lotteryAleart-create-component',
    {
        'pages/goods/order_pay_status/components/lotteryAleart-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5e17"))
        })
    },
    [['pages/goods/order_pay_status/components/lotteryAleart-create-component']]
]);
