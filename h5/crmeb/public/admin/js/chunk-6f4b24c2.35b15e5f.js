(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f4b24c2"],{"0f0e":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"label-wrapper"},[a("div",{staticClass:"list-box"},[t._l(t.labelList,(function(e,s){return t.isUser?a("div",{key:s,staticClass:"label-box"},[e.children?a("div",{staticClass:"title"},[t._v(t._s(e.label_name))]):t._e(),e.children&&e.children.length?a("div",{staticClass:"list"},t._l(e.children,(function(e,s){return a("div",{key:s,staticClass:"label-item",class:{on:e.disabled},on:{click:function(a){return t.selectLabel(e)}}},[t._v("\n          "+t._s(e.label_name)+"\n        ")])})),0):t._e()]):t._e()})),t.isUser?t._e():a("div",[t._v("暂无标签")])],2),a("div",{staticClass:"footer"},[a("Button",{staticClass:"btns",attrs:{type:"primary"},on:{click:t.subBtn}},[t._v("确定")]),a("Button",{staticClass:"btns",attrs:{type:"primary",ghost:""},on:{click:t.cancel}},[t._v("取消")])],1)])},i=[],r=(a("d81d"),a("4de4"),a("d3b7"),a("a434"),a("e9c4"),a("c4c8")),o={name:"userLabel",props:{},data:function(){return{labelList:[],dataLabel:[],isUser:!1}},mounted:function(){},methods:{inArray:function(t,e){for(var a in e)if(e[a].id==t)return!0;return!1},userLabel:function(t){var e=this;this.dataLabel=t,Object(r["y"])().then((function(t){t.data.map((function(t){t.children&&(e.isUser=!0,t.children.map((function(t){e.inArray(t.id,e.dataLabel)?t.disabled=!0:t.disabled=!1})))})),e.labelList=t.data})).catch((function(t){e.$Message.error(t.msg)}))},selectLabel:function(t){if(t.disabled){var e=this.dataLabel.indexOf(this.dataLabel.filter((function(e){return e.id==t.id}))[0]);this.dataLabel.splice(e,1),t.disabled=!1}else this.dataLabel.push({label_name:t.label_name,id:t.id}),t.disabled=!0},subBtn:function(){this.$emit("activeData",JSON.parse(JSON.stringify(this.dataLabel)))},cancel:function(){this.$emit("close")}}},n=o,l=(a("b8f2"),a("2877")),c=Object(l["a"])(n,s,i,!1,null,"2ef182e9",null);e["a"]=c.exports},"2dd5":function(t,e,a){"use strict";var s=a("5bf1"),i=a.n(s);i.a},"5bf1":function(t,e,a){},"7a23":function(t,e,a){},b8f2:function(t,e,a){"use strict";var s=a("7a23"),i=a.n(s);i.a},ed2f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header header"},[a("div",{staticClass:"i-layout-page-header fl_header"},[a("span",{},[a("Button",{attrs:{icon:"ios-arrow-back",size:"small",type:"text"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),a("Divider",{attrs:{type:"vertical"}}),a("span",{staticClass:"ivu-page-header-title mr20",domProps:{textContent:t._s(t.$route.query.id?"编辑渠道码":"添加渠道码")}})],1)]),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Form",{attrs:{model:t.formData,"label-width":150,rules:t.ruleValidate}},[a("FormItem",{attrs:{label:"二维码名称"}},[a("Input",{attrs:{placeholder:"请输入二维码名称"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),a("FormItem",{attrs:{label:"二维码分组","label-width":150}},[a("Select",{staticStyle:{width:"320px"},model:{value:t.formData.cate_id,callback:function(e){t.$set(t.formData,"cate_id",e)},expression:"formData.cate_id"}},t._l(t.labelSort,(function(e,s){return a("Option",{key:s,attrs:{value:e.id}},[t._v(t._s(e.cate_name))])})),1)],1),a("FormItem",{attrs:{label:"用户标签","label-width":150}},[a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"labelInput acea-row row-between-wrapper",on:{click:t.openLabel}},[a("div",{staticStyle:{width:"90%"}},[t.dataLabel.length?a("div",t._l(t.dataLabel,(function(e,s){return a("Tag",{key:s,attrs:{closable:""},on:{"on-close":function(a){return t.closeLabel(e)}}},[t._v(t._s(e.label_name))])})),1):a("span",{staticClass:"span"},[t._v("选择用户关联标签")])]),a("div",{staticClass:"ivu-icon ivu-icon-ios-arrow-down"})]),a("span",{staticClass:"addfont",on:{click:t.addLabel}},[t._v("新增标签")])])]),a("FormItem",{attrs:{label:"关联推广员","label-width":150}},[a("div",{staticClass:"picBox",on:{click:t.customer}},[t.formData.avatar?a("div",{staticClass:"pictrue"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.formData.avatar,expression:"formData.avatar"}]})]):a("div",{staticClass:"upLoad acea-row row-center-wrapper"},[a("Icon",{attrs:{type:"ios-camera-outline",size:"26"}})],1)]),a("div",{staticClass:"trip"},[t._v("扫码注册的新用户,将自动成为此推广员的下级,与分销推广功能一致")])]),a("FormItem",{attrs:{label:"有效期"}},[a("RadioGroup",{model:{value:t.isReceiveTime,callback:function(e){t.isReceiveTime=e},expression:"isReceiveTime"}},[a("Radio",{attrs:{label:0}},[t._v("永久")]),a("Radio",{attrs:{label:1}},[t._v("有效期")])],1),a("span",{directives:[{name:"show",rawName:"v-show",value:t.isReceiveTime,expression:"isReceiveTime"}]},[a("InputNumber",{staticStyle:{width:"100px"},attrs:{min:1,max:1e4,precision:0,placeholder:"请输入天数"},model:{value:t.formData.time,callback:function(e){t.$set(t.formData,"time",e)},expression:"formData.time"}}),t._v("\n          天\n        ")],1),a("div",{staticClass:"trip"},[t._v("临时码过期后不能再扫码,永久二维码最大创建数量为10万个")])],1),a("FormItem",{attrs:{label:"回复内容"}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("Menu",{staticStyle:{width:"150px"},attrs:{theme:"light","active-name":t.formData.type},on:{"on-select":t.selectMenu}},[a("MenuItem",{attrs:{name:"text"}},[t._v("文字内容")]),a("MenuItem",{attrs:{name:"voice"}},[t._v("声音消息")]),a("MenuItem",{attrs:{name:"image"}},[t._v("图片消息")]),a("MenuItem",{attrs:{name:"news"}},[t._v("图文消息")])],1)],1),a("Col",{attrs:{span:"18"}},["text"===t.formData.type||"url"===t.formData.type?a("FormItem",{attrs:{label:"消息内容：",prop:"content"}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.content.content,expression:"formData.content.content"}],staticStyle:{width:"50%"},attrs:{placeholder:"text"===t.formData.type?"请填写消息内容":"请填写网址链接"},domProps:{value:t.formData.content.content},on:{input:function(e){e.target.composing||t.$set(t.formData.content,"content",e.target.value)}}})]):t._e(),"news"===t.formData.type?a("FormItem",{attrs:{label:"选取图文："}},[a("Button",{attrs:{type:"info"},on:{click:function(e){t.modals=!0}}},[t._v("选择图文消息")]),t.formData.content.list.title?a("div",{staticClass:"news-box"},[a("img",{staticClass:"news_pic",attrs:{src:t.formData.content.list.image_input[0]}}),a("span",[t._v(t._s(t.formData.content.list.title))])]):t._e()],1):t._e(),"image"===t.formData.type||"voice"===t.formData.type?a("FormItem",{attrs:{label:"image"===t.formData.type?"图片地址：":"语音地址：",prop:"src"}},[a("div",{staticClass:"acea-row row-middle"},[a("Input",{staticClass:"mr15",staticStyle:{width:"75%"},attrs:{readonly:"readonly",placeholder:"请填入链接地址"},model:{value:t.formData.content.src,callback:function(e){t.$set(t.formData.content,"src",e)},expression:"formData.content.src"}}),a("Upload",{staticClass:"mr20",staticStyle:{"margin-top":"1px"},attrs:{"show-upload-list":!1,action:t.fileUrl,"on-success":t.handleSuccess,format:"image"===t.formData.type?t.formatImg:t.formatVoice,"max-size":2048,headers:t.header,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize}},[a("Button",{attrs:{type:"primary"}},[t._v("上传")])],1)],1),a("span",{directives:[{name:"show",rawName:"v-show",value:"image"===t.formData.type,expression:"formData.type === 'image'"}]},[t._v("文件最大2Mb，支持bmp/png/jpeg/jpg/gif格式")]),a("span",{directives:[{name:"show",rawName:"v-show",value:"voice"===t.formData.type,expression:"formData.type === 'voice'"}]},[t._v("文件最大2Mb，支持mp3/wma/wav/amr格式,播放长度不超过60s")])]):t._e()],1)],1)],1)],1),a("Button",{staticClass:"submit",attrs:{type:"primary",disabled:t.disabled},on:{click:t.save}},[t._v("立即提交")])],1),a("Modal",{attrs:{scrollable:"",title:"请选择商城用户",closable:!1,width:"800"},model:{value:t.customerShow,callback:function(e){t.customerShow=e},expression:"customerShow"}},[t.customerShow?a("customerInfo",{on:{imageObject:t.imageObject}}):t._e()],1),a("Modal",{staticClass:"modelBox",attrs:{scrollable:"",title:"发送消息",width:"1200",height:"800","footer-hide":""},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[t.modals?a("news-category",{attrs:{scrollerHeight:t.scrollerHeight,contentTop:t.contentTop,contentWidth:t.contentWidth,maxCols:t.maxCols},on:{getCentList:t.getCentList}}):t._e()],1),a("Modal",{attrs:{scrollable:"",title:"请选择用户标签",closable:!1,width:"500","footer-hide":!0,"mask-closable":!1},model:{value:t.labelShow,callback:function(e){t.labelShow=e},expression:"labelShow"}},[a("userLabel",{ref:"userLabel",on:{activeData:t.activeData,close:t.labelClose}})],1)],1)},i=[],r=a("f3f3"),o=a("fc11"),n=(a("e9c4"),a("4de4"),a("d3b7"),a("a434"),a("b0c0"),a("d81d"),a("498a"),a("2f62")),l=a("0f0e"),c=a("c4ad"),m=a("c42b"),d=a("c4c8"),u=a("c24f"),f=a("90e7"),h=a("d708"),b=a("c276"),p=a("8c03"),v={name:"storeCouponCreate",components:{goodsList:c["default"],newsCategory:m["a"],customerInfo:p["default"],userLabel:l["a"]},data:function(){var t;return t={customerShow:!1,labelShow:!1,disabled:!1,modals:!1,maxCols:4,labelSelect:[],scrollerHeight:"600",contentTop:"130",contentWidth:"98%",formatImg:["jpg","jpeg","png","bmp","gif"],formatVoice:["mp3","wma","wav","amr"],header:{},fileUrl:h["a"].apiBaseURL+"/file/upload/1",formData:{name:"",type:"text",time:0,label_id:[],image:"",cate_id:"",content:{content:"",src:"",list:{}}},labelSort:[],isReceiveTime:0},Object(o["a"])(t,"modals",!1),Object(o["a"])(t,"ruleValidate",{name:[{required:!0,message:"请填写二维码名称",trigger:"blur"}],cate_id:[{required:!0,message:"请选择二维码分组",trigger:"change"}]}),Object(o["a"])(t,"id",0),Object(o["a"])(t,"dataLabel",[]),t},computed:Object(r["a"])({},Object(n["e"])("media",["isMobile"])),created:function(){this.getUserLabelAll(),this.userLabel(),this.getToken(),this.$route.query.id&&(this.id=this.$route.query.id,this.getDetail())},methods:{activeData:function(t){this.labelShow=!1,this.dataLabel=t},labelClose:function(){this.labelShow=!1},openLabel:function(t){this.labelShow=!0,this.$refs.userLabel.userLabel(JSON.parse(JSON.stringify(this.dataLabel)))},closeLabel:function(t){var e=this.dataLabel.indexOf(this.dataLabel.filter((function(e){return e.id==t.id}))[0]);this.dataLabel.splice(e,1)},getDetail:function(){var t=this;Object(f["Jb"])(this.id).then((function(e){t.formData=e.data,e.data.label_id.length&&(t.dataLabel=e.data.label_id)}))},customer:function(){this.customerShow=!0},addLabel:function(){var t=this;this.$modalForm(Object(u["M"])(0)).then((function(){return t.userLabel()}))},userLabel:function(){var t=this;Object(d["m"])().then((function(e){t.labelSelect=e.data.list})).catch((function(e){t.$Message.error(e.msg)}))},imageObject:function(t){this.customerShow=!1,this.formData.uid=t.uid,this.formData.avatar=t.image},getCentList:function(t){this.formData.content.list=t.new[0],this.modals=!1},handleSuccess:function(t,e){200===t.status?(this.formData.content.src=t.data.src,this.$Message.success(t.msg)):this.$Message.error(t.msg)},handleFormatError:function(t){"image"===this.formData.type?this.$Message.warning("请上传bmp/png/jpeg/jpg/gif格式的图片"):this.$Message.warning("请上传mp3/wma/wav/amr格式的语音")},handleMaxSize:function(t){this.$Message.warning("请上传文件2M以内的文件")},getToken:function(){this.header["Authori-zation"]="Bearer "+Object(b["d"])("token")},selectMenu:function(t){this.formData.type=t},getUserLabelAll:function(){var t=this;Object(f["Nb"])().then((function(e){var a=e.data.data;t.labelSort=a}))},save:function(){var t=this;if(!this.formData.name)return this.$Message.error("请输入二维码名称");if(!this.formData.cate_id)return this.$Message.error("请选择分组");if(!this.dataLabel.length)return this.$Message.error("请选择用户标签");var e=[];if(this.dataLabel.map((function(t){e.push(t.id)})),this.formData.label_id=e,!this.formData.uid)return this.$Message.error("请选择推广员");if(this.isReceiveTime){if(this.formData.time<1)return this.$Message.error("使用有效期限不能小于1天")}else this.formData.time=0;return"text"!==this.formData.type&&"url"!==this.formData.type||this.formData.content.content.trim()?"voice"!==this.formData.type&&"image"!==this.formData.type||this.formData.content.src.trim()?"news"!==this.formData.type||this.formData.content.list.title.trim()?(this.disabled=!1,void Object(f["Lb"])(this.id,this.formData).then((function(e){t.disabled=!0,t.$Message.success(e.msg),setTimeout((function(){t.$router.push({path:"/admin/marketing/channel_code/channelCodeIndex"})}),1e3)})).catch((function(e){t.disabled=!0,t.$Message.error(e.msg)}))):this.$Message.error("请选择图文消息"):this.$Message.error("请先上传消息"):this.$Message.error("请输入内容")}}},g=v,w=(a("2dd5"),a("2877")),_=Object(w["a"])(g,s,i,!1,null,"645a7da2",null);e["default"]=_.exports}}]);