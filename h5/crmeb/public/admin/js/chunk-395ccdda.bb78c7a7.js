(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-395ccdda"],{"31b4":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.FromData?a("div",[a("Modal",{attrs:{scrollable:"","footer-hide":"",closable:"",title:t.FromData.title,"z-index":1,width:"700"},on:{"on-cancel":t.cancel},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[["/marketing/coupon/save.html"===t.FromData.action?a("div",{staticClass:"radio acea-row row-middle"},[a("div",{staticClass:"name ivu-form-item-content"},[t._v("优惠券类型")]),a("Radio-group",{on:{"on-change":t.couponsType},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[a("Radio",{attrs:{label:0}},[t._v("通用券")]),a("Radio",{attrs:{label:1}},[t._v("品类券")]),a("Radio",{attrs:{label:2}},[t._v("商品券")])],1)],1):t._e()],a("form-create",{ref:"fc",staticClass:"formBox",attrs:{option:t.config,rule:Array.from(t.FromData.rules),handleIcon:"false"},on:{"on-submit":t.onSubmit}})],2)],1):t._e()},s=[],i=a("f3f3"),r=a("9860"),o=a.n(r),l=a("6b6c"),c=a("2f62"),u={name:"edit",components:{formCreate:o.a.$form()},computed:Object(i["a"])({},Object(c["e"])("userLevel",["taskId","levelId"])),props:{FromData:{type:Object,default:null},update:{type:Boolean,default:!0}},data:function(){return{modals:!1,type:0,config:{global:{upload:{props:{onSuccess:function(t,e){200===t.status?e.url=t.data.src:this.Message.error(t.msg)}}}}}}},methods:{couponsType:function(){this.$parent.addType(this.type)},onSubmit:function(t){var e=this,a={};a=t,Object(l["a"])({url:this.FromData.action,method:this.FromData.method,data:a}).then((function(t){e.update&&e.$parent.getList(),e.$Message.success(t.msg),e.modals=!1,setTimeout((function(){e.$emit("submitFail")}),1e3)})).catch((function(t){e.$Message.error(t.msg)}))},cancel:function(){this.type=0}}},d=u,m=(a("3c71"),a("2877")),f=Object(m["a"])(d,n,s,!1,null,"671a3e20",null);e["a"]=f.exports},"3c71":function(t,e,a){"use strict";var n=a("e23d"),s=a.n(n);s.a},e23d:function(t,e,a){},e7d9:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header"},[a("div",{staticClass:"i-layout-page-header"},[a("span",{staticClass:"ivu-page-header-title"},[t._v(t._s(t.$route.meta.title))])])]),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Form",{ref:"formValidate",attrs:{model:t.formValidate,"label-width":t.labelWidth,"label-position":t.labelPosition},nativeOn:{submit:function(t){t.preventDefault()}}},[a("Row",{attrs:{type:"flex",gutter:24}},[a("Col",t._b({},"Col",t.grid,!1),[a("FormItem",{attrs:{label:"状态：","label-for":"status1"}},[a("Select",{attrs:{placeholder:"请选择",clearable:""},on:{"on-change":t.userSearchs},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("Option",{attrs:{value:"all"}},[t._v("全部")]),a("Option",{attrs:{value:"1"}},[t._v("开启")]),a("Option",{attrs:{value:"0"}},[t._v("关闭")])],1)],1)],1),a("Col",t._b({},"Col",t.grid,!1),[a("FormItem",{attrs:{label:"搜索：","label-for":"status2"}},[a("Input",{attrs:{search:"","enter-button":"",placeholder:"请输入姓名或者账号"},on:{"on-search":t.userSearchs},model:{value:t.formValidate.name,callback:function(e){t.$set(t.formValidate,"name",e)},expression:"formValidate.name"}})],1)],1)],1),a("Row",{attrs:{type:"flex"}},[a("Col",t._b({},"Col",t.grid,!1),[a("Button",{directives:[{name:"auth",rawName:"v-auth",value:["setting-system_admin-add"],expression:"['setting-system_admin-add']"}],attrs:{type:"primary",icon:"md-add"},on:{click:t.add}},[t._v("添加管理员")])],1)],1)],1),a("Table",{staticClass:"mt25",attrs:{columns:t.columns1,data:t.list,"no-userFrom-text":"暂无数据","no-filtered-userFrom-text":"暂无筛选结果",loading:t.loading,"highlight-row":""},scopedSlots:t._u([{key:"roles",fn:function(e){var n=e.row;e.index;return[0!==n.roles.length?a("div",t._l(n.roles.split(","),(function(e,n){return a("Tag",{key:n,attrs:{color:"blue"},domProps:{textContent:t._s(e)}})})),1):t._e()]}},{key:"status",fn:function(e){var n=e.row;e.index;return[a("i-switch",{attrs:{value:n.status,"true-value":1,"false-value":0,size:"large"},on:{"on-change":function(e){return t.onchangeIsShow(n)}},model:{value:n.status,callback:function(e){t.$set(n,"status",e)},expression:"row.status"}},[a("span",{attrs:{slot:"open"},slot:"open"},[t._v("开启")]),a("span",{attrs:{slot:"close"},slot:"close"},[t._v("关闭")])])]}},{key:"action",fn:function(e){var n=e.row,s=e.index;return[a("a",{on:{click:function(e){return t.edit(n)}}},[t._v("编辑")]),a("Divider",{attrs:{type:"vertical"}}),a("a",{on:{click:function(e){return t.del(n,"删除管理员",s)}}},[t._v("删除")])]}}])}),a("div",{staticClass:"acea-row row-right page"},[a("Page",{attrs:{total:t.total,current:t.formValidate.page,"show-elevator":"","show-total":"","page-size":t.formValidate.limit},on:{"on-change":t.pageChange}})],1)],1),a("admin-from",{ref:"adminfrom",attrs:{FromData:t.FromData},on:{submitFail:t.submitFail}})],1)},s=[],i=a("c964"),r=a("f3f3"),o=(a("96cf"),a("a9e3"),a("a434"),a("2f62")),l=(a("99af"),a("6b6c"));function c(t){return Object(l["a"])({url:"/setting/admin",method:"get",params:t})}function u(){return Object(l["a"])({url:"/setting/admin/create",method:"get"})}function d(t){return Object(l["a"])({url:"/setting/admin/".concat(t,"/edit"),method:"get"})}function m(t){return Object(l["a"])({url:"setting/set_status/".concat(t.id,"/").concat(t.status),method:"PUT"})}var f=a("31b4"),h={name:"systemAdmin",components:{adminFrom:f["a"]},data:function(){return{grid:{xl:7,lg:7,md:12,sm:24,xs:24},total:0,loading:!1,roleData:{status1:""},formValidate:{roles:"",status:"",name:"",page:1,limit:20},status:"",list:[],columns1:[{title:"姓名",key:"real_name",minWidth:120},{title:"账号",key:"account",minWidth:150},{title:"身份",slot:"roles",minWidth:250},{title:"最后一次登录时间",key:"_last_time",minWidth:180},{title:"最后一次登录ip",key:"last_ip",minWidth:180},{title:"开启",slot:"status",minWidth:90},{title:"操作",key:"action",slot:"action",fixed:"right",minWidth:120}],FromData:null,modalTitleSs:"",ids:Number}},computed:Object(r["a"])(Object(r["a"])({},Object(o["e"])("media",["isMobile"])),{},{labelWidth:function(){return this.isMobile?void 0:50},labelPosition:function(){return this.isMobile?"top":"left"}}),created:function(){this.getList()},methods:{onchangeIsShow:function(t){var e=this,a={id:t.id,status:t.status};m(a).then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$Message.success(a.msg);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))},submitFail:function(){this.getList()},getList:function(){var t=this;this.loading=!0,this.formValidate.roles=this.formValidate.roles||"",c(this.formValidate).then(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.total=a.data.count,t.list=a.data.list,t.loading=!1;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.loading=!1,t.$Message.error(e.msg)}))},pageChange:function(t){this.formValidate.page=t,this.getList()},add:function(){var t=this;u().then(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.FromData=a.data,t.$refs.adminfrom.modals=!0;case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$Message.error(e.msg)}))},edit:function(t){var e=this;d(t.id).then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!1!==a.data.status){t.next=2;break}return t.abrupt("return",e.$authLapse(a.data));case 2:e.FromData=a.data,e.$refs.adminfrom.modals=!0;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))},del:function(t,e,a){var n=this,s={title:e,num:a,url:"setting/admin/".concat(t.id),method:"DELETE",ids:""};this.$modalSure(s).then((function(t){n.$Message.success(t.msg),n.list.splice(a,1)})).catch((function(t){n.$Message.error(t.msg)}))},userSearchs:function(){this.formValidate.status="all"===this.status?"":this.status,this.formValidate.page=1,this.list=[],this.getList()}}},p=h,g=a("2877"),v=Object(g["a"])(p,n,s,!1,null,"12b61be0",null);e["default"]=v.exports}}]);