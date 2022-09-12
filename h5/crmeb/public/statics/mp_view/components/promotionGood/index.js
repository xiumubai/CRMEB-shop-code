(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/promotionGood/index"],{"32d7":function(t,n,e){"use strict";var a=e("eac3"),u=e.n(a);u.a},"3caf":function(t,n,e){"use strict";e.r(n);var a=e("d2f5"),u=e("4a6e");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("32d7");var c,i=e("f0c5"),r=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"4dae15d0",null,!1,a["a"],c);n["default"]=r.exports},"4a6e":function(t,n,e){"use strict";e.r(n);var a=e("c97a"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=u.a},c97a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("26cb"),u=e("c9cb"),o=c(e("cf74"));function c(t){return t&&t.__esModule?t:{default:t}}var i={computed:(0,a.mapGetters)(["uid"]),mixins:[o.default],props:{benefit:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{goDetail:function(n){var e=this;(0,u.goPage)().then((function(a){(0,u.goShopDetail)(n,e.uid).then((function(e){t.navigateTo({url:"/pages/goods_details/index?id=".concat(n.id)})}))}))}}};n.default=i}).call(this,e("543d")["default"])},d2f5:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$t("￥"));t.$mp.data=Object.assign({},{$root:{m0:e}})},o=[]},eac3:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/promotionGood/index-create-component',
    {
        'components/promotionGood/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3caf"))
        })
    },
    [['components/promotionGood/index-create-component']]
]);
