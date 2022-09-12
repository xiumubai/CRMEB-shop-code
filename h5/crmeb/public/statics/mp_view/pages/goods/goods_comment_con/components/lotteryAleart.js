(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods_comment_con/components/lotteryAleart"],{2889:function(t,a,e){},"375c":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{aleartData:{}}},props:{aleartType:{type:Number},alData:{type:Object},aleartStatus:{type:Boolean,default:!1}},watch:{aleartType:function(t){1===t?this.aleartData={title:"暂无抽奖资格",msg:"1、您未关注公众号\n2、您未获得VIP权限，获取VIP途径：\n（1）购买过打通版的用户可在会员群联系官方客服开通\n（2）官方小程序商城购买CRMEB打通版、企业版后自动开通",btn:"我知道了"}:2===t&&(this.aleartData={title:"抽奖结果",img:this.alData.image,msg:this.alData.prompt,btn:"好的",type:this.alData.type})},aleartStatus:function(t){t||(this.aleartData={})}},methods:{posterImageClose:function(t){this.$emit("close",!1)}}};a.default=n},3823:function(t,a,e){"use strict";e.r(a);var n=e("375c"),r=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=r.a},"6aa1":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return n}));var r=function(){var t=this,a=t.$createElement;t._self._c},o=[]},e15d:function(t,a,e){"use strict";var n=e("2889"),r=e.n(n);r.a},fadf:function(t,a,e){"use strict";e.r(a);var n=e("6aa1"),r=e("3823");for(var o in r)"default"!==o&&function(t){e.d(a,t,(function(){return r[t]}))}(o);e("e15d");var u,c=e("f0c5"),i=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"3c4464c0",null,!1,n["a"],u);a["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/goods/goods_comment_con/components/lotteryAleart-create-component',
    {
        'pages/goods/goods_comment_con/components/lotteryAleart-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fadf"))
        })
    },
    [['pages/goods/goods_comment_con/components/lotteryAleart-create-component']]
]);
