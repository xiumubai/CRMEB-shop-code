(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/columnGoods/live_list/index"],{1043:function(t,e,n){"use strict";n.r(e);var i=n("fb51"),a=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=a.a},"6ea8":function(t,e,n){"use strict";n.r(e);var i=n("f3df"),a=n("1043");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("c007");var c,o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=s.exports},bb04:function(t,e,n){"use strict";(function(t){n("d5c5");i(n("66fd"));var e=i(n("6ea8"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},c007:function(t,e,n){"use strict";var i=n("ddc5"),a=n.n(i);a.a},ddc5:function(t,e,n){},f3df:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.liveList.length>0?t.__map(t.liveList,(function(e,n){var i=t.__get_orig(e),a=102==e.live_status?t.$t("预告"):null,u=103==e.live_status?t.$t("回放"):null,c=101==e.live_status?t.$t("进行中"):null;return{$orig:i,m0:a,m1:u,m2:c}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},u=[]},fb51:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("e5e8"),a={name:"liveBroadcast",props:{dataConfig:{type:Object,default:function(){}}},data:function(){return{page:1,limit:10,listStyle:1,isScroll:!0,liveList:[],custom_params:""}},created:function(){},mounted:function(){this.custom_params=encodeURIComponent(JSON.stringify({spid:this.$store.state.app.uid})),this.getLiveList()},methods:{getLiveList:function(){var t=this;this.$config.LIMIT;this.isScroll&&(0,i.getLiveList)(this.page,this.limit).then((function(e){t.isScroll=e.data.length>=t.limit,t.page++,t.liveList=t.liveList.concat(e.data)})).catch((function(t){}))}},onReachBottom:function(){this.getLiveList()}};e.default=a}},[["bb04","common/runtime","common/vendor"]]]);