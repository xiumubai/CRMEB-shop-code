(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b7caf0b"],{"629c":function(t,e,o){"use strict";var i=o("e002"),a=o.n(i);a.a},7624:function(t,e,o){"use strict";e["a"]=["em-tlj-1","em-tlj-2","em-tlj-3","em-tlj-4","em-tlj-5","em-tlj-6","em-tlj-7","em-tlj-8","em-tlj-9","em-tlj-10","em-tlj-11","em-tlj-12","em-tlj-13","em-tlj-14","em-tlj-15","em-tlj-16","em-tlj-17","em-tlj-18","em-tlj-19","em-tlj-20","em-tlj-21","em-tlj-22","em-tlj-23","em-tlj-24","em-tlj-25","em-tlj-26","em-tlj-27","em-tlj-28","em-tlj-29","em-tlj-30","em-tlj-31","em-tlj-32","em-tlj-33","em-tlj-34","em-tlj-35","em-tlj-36","em-tlj-37","em-tlj-38","em-tlj-39","em-tlj-40","em-tlj-41","em-tlj-42","em-tlj-43","em-tlj-44","em-tlj-45","em-tlj-46","em-tlj-47","em-tlj-48","em-tlj-49","em-tlj-50","em-tlj-51","em-tlj-52","em-tlj-53","em-tlj-54","em-tlj-55","em-tlj-56","em-tlj-57","em-tlj-58","em-tlj-59","em-tlj-60","em-tlj-61","em-tlj-62","em-tlj-63","em-tlj-64","em-tlj-65","em-tlj-66","em-tlj-67","em-tlj-68","em-tlj-69","em-tlj-70","em-tlj-71","em-tlj-72","em-tlj-73","em-tlj-74","em-tlj-75","em-tlj-76","em-tlj-77","em-tlj-78","em-tlj-79","em-tlj-80","em-tlj-81","em-tlj-82","em-tlj-83","em-tlj-84","em-tlj-85","em-tlj-86","em-tlj-87","em-tlj-88","em-tlj-89","em-tlj-90","em-tlj-91","em-tlj-92","em-tlj-93","em-tlj-94","em-tlj-95","em-tlj-96"]},"9bab":function(t,e,o){},e002:function(t,e,o){},e358:function(t,e,o){"use strict";var i=o("9bab"),a=o.n(i);a.a},eea8:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"chat-room"},[o("div",{staticClass:"room",class:{win:!t.chatOptions.popup},on:{click:t.roomClick}},[o("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"head"},[o("div",{staticClass:"image"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.serviceData&&t.serviceData.avatar,expression:"serviceData && serviceData.avatar"}]})]),o("div",{staticClass:"name"},[t._v(t._s(t.serviceData&&t.serviceData.nickname))]),o("div",{class:["iconfont",t.muted?"icon-shengyinjingyinxianxing":"icon-shengyinyinliang"],on:{click:function(e){e.stopPropagation(),t.muted=!t.muted}}}),o("div",{staticClass:"iconfont icon-guanbi5",on:{click:function(e){return e.stopPropagation(),t.close(e)}}})]),o("div",{staticClass:"main"},[o("div",{staticClass:"chat"},[o("div",{ref:"record",staticClass:"record",on:{scroll:t.onScroll}},[o("div",{ref:"scrollBox",attrs:{id:"chat_scroll"}},[o("Spin",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]},[o("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"ios-loading",size:"18"}}),o("div",[t._v("Loading")])],1),o("ul",[t._l(t.records,(function(e){return[o("li",{key:e.id,class:{right:e.uid===t.serviceData.tourist_uid},attrs:{id:"chat_"+e.id}},[e.show?o("div",{staticClass:"time-tag"},[t._v("\n                    "+t._s(e.add_time)+"\n                  ")]):t._e(),o("div",{staticClass:"avatar"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.avatar,expression:"item.avatar"}]})]),o("div",{ref:"chatContent",refInFor:!0,staticClass:"content"},[1===e.msn_type?o("div",{staticClass:"text",domProps:{innerHTML:t._s(e.msn)}}):t._e(),2===e.msn_type?o("div",{staticClass:"image"},[o("div",{staticClass:"text"},[o("i",{class:"em "+e.msn})])]):t._e(),3===e.msn_type?o("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"image"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.msn,expression:"item.msn"}]})]):t._e(),5===e.msn_type?o("div",{staticClass:"goods"},[o("div",{staticClass:"thumb"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.productInfo.image,expression:"item.productInfo.image"}]})]),o("div",{staticClass:"intro"},[o("div",{staticClass:"name"},[t._v("\n                          "+t._s(e.productInfo.store_name)+"\n                        ")]),o("div",{staticClass:"attr"},[o("span",[t._v("库存："+t._s(e.productInfo.stock))]),o("span",[t._v("销量："+t._s(e.productInfo.sales))])]),o("div",{staticClass:"group"},[o("div",{staticClass:"money"},[t._v("￥"+t._s(e.productInfo.price))]),o("span",{staticStyle:{cursor:"pointer"},on:{click:function(o){return o.stopPropagation(),t.onLook(e.productInfo.id)}}},[t._v("查看商品 >")])])])]):t._e(),6===e.msn_type?t._l(e.orderInfo.cartInfo,(function(i){return o("div",{key:i.id,staticClass:"order"},[o("div",{staticClass:"thumb"},[o("img",{attrs:{src:i.productInfo.image}})]),o("div",{staticClass:"intro"},[o("div",{staticClass:"name"},[t._v("订单ID："+t._s(e.orderInfo.order_id))]),o("div",{staticClass:"attr"},[t._v("商品数量："+t._s(i.cart_num))]),o("div",{staticClass:"group"},[o("div",{staticClass:"money"},[t._v("￥"+t._s(i.productInfo.price))]),o("nuxt-link",{attrs:{target:"_blank",to:{path:"/order_detail",query:{orderId:e.orderInfo.order_id}}}},[t._v("查看订单 >")])],1)])])})):t._e()],2)])]}))],2)],1)]),o("div",{staticClass:"editor"},[o("div",{staticClass:"editor-hd"},[o("div",[o("button",{staticClass:"emoji-btn",attrs:{title:"表情"},on:{click:function(e){return e.stopPropagation(),t.emojiSwitch(e)}}},[o("span",{staticClass:"iconfont iconbiaoqing1"})]),t.kufuToken?o("button",{attrs:{title:"图片"}},[o("Upload",{attrs:{"show-upload-list":!1,action:t.uploadAction,"before-upload":t.beforeUpload,format:["jpg","jpeg","png","gif"],"on-format-error":t.handleFormatError,data:t.uploadData,"on-success":t.uploadSuccess,"on-error":t.uploadError}},[o("span",{staticClass:"iconfont icontupian1"})])],1):t._e()]),t.emojiShow?o("div",{staticClass:"emoji-panel"},t._l(t.emojiList,(function(e,i){return o("i",{key:i,staticClass:"em",class:e,on:{click:function(o){return o.stopPropagation(),t.selectEmoji(e)}}})})),0):t._e()]),o("div",{staticClass:"editor-bd"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.chatCont,expression:"chatCont"}],attrs:{placeholder:"请输入文字内容"},domProps:{value:t.chatCont},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.ctrlEnter(e)},input:function(e){e.target.composing||(t.chatCont=e.target.value)}}})]),o("div",{staticClass:"editor-ft"},[o("button",{attrs:{disabled:!t.chatCont},on:{click:function(e){return e.stopPropagation(),t.sendMessage(e)}}},[t._v("发送")])])])]),o("div",{staticClass:"notice"},[t.notice?o("div",{staticClass:"rich",domProps:{innerHTML:t._s(t.notice)}}):t._e(),t._m(0)])]),o("audio",{ref:"audio",attrs:{src:t.audioSrc}})]),t.change?o("feed-back",{attrs:{change:t.change},on:{closeChange:function(e){return t.closeChange(e)}}}):t._e()],1)},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"copy"},[o("a",{attrs:{href:"http://www.crmeb.com/",target:"_blank"}},[t._v("CRMEB提供技术支持")])])}],n=o("d0ff"),s=(o("d3b7"),o("159b"),o("d81d"),o("ac1f"),o("5319"),o("1276"),o("99af"),o("498a"),o("f9db"),o("7624")),r=o("49ea"),c=o("d708"),l=o("a78e"),d=o.n(l),u=o("42e3"),m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"feedback",class:!0===t.change?"on":""},[o("div",{staticClass:"feedback-header acea-row"},[o("span",{staticClass:"sp1"},[t._v("商城客服已离线")]),o("div",[o("Icon",{attrs:{type:"md-close",color:"#fff",size:"18"},on:{click:t.close}})],1)]),t.isShow?t._e():o("div",[o("div",{staticClass:"feedback-conent mb20"},[o("div",{staticClass:"ft",domProps:{textContent:t._s(t.notice)}})]),o("div",[o("Form",{ref:"formItem",staticClass:"pl15",attrs:{model:t.formItem,rules:t.ruleValidate}},[o("FormItem",{attrs:{prop:"rela_name"}},[o("Input",{attrs:{placeholder:"请输入您的姓名"},model:{value:t.formItem.rela_name,callback:function(e){t.$set(t.formItem,"rela_name",e)},expression:"formItem.rela_name"}})],1),o("FormItem",{attrs:{prop:"phone"}},[o("Input",{attrs:{placeholder:"请输入您的联系电话"},model:{value:t.formItem.phone,callback:function(e){t.$set(t.formItem,"phone",e)},expression:"formItem.phone"}})],1),o("FormItem",{attrs:{prop:"content"}},[o("Input",{staticClass:"mb10",attrs:{type:"textarea",placeholder:"请输入留言内容"},model:{value:t.formItem.content,callback:function(e){t.$set(t.formItem,"content",e)},expression:"formItem.content"}})],1),o("FormItem",[o("Button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formItem")}}},[t._v("提交留言")])],1)],1)],1)]),t.isShow?o("div",{staticClass:"sure"},[o("div",{staticClass:"sure-yuan"},[o("Icon",{attrs:{type:"md-checkmark",color:"#fff",size:"30"}})],1),o("div",{staticClass:"sp1 mb10"},[t._v("提交成功")]),o("div",{staticClass:"sp2 mb30"},[t._v("您的信息提交成功，我们会尽快与您取得联系！")]),o("Button",{attrs:{type:"primary"},on:{click:t.close}},[t._v("好的")])],1):t._e()]),o("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.change,expression:"change === true"}],staticClass:"maskModel",on:{touchmove:function(t){t.preventDefault()}}})])},f=[],h={name:"feedback",props:{change:Boolean},data:function(){return{isShow:!1,formItem:{rela_name:"",content:"",phone:""},notice:"",ruleValidate:{rela_name:[{required:!0,message:"请输入您的姓名",trigger:"blur"}],content:[{required:!0,message:"请输入留言内容",trigger:"blur"}],phone:[{required:!0,message:"请填写手机号码",trigger:"change"},{pattern:/^1[3456789]\d{9}$/,message:"手机号码格式不正确",trigger:"blur"}]}}},mounted:function(){this.getNotice()},methods:{handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t&&Object(u["i"])(e.formItem).then((function(t){e.isShow=!0})).cache((function(t){e.$Message.error(t.msg)}))}))},close:function(){this.$emit("closeChange",!1)},getNotice:function(){var t=this;Object(u["h"])().then((function(e){t.notice=e.data.feedback})).cache((function(e){t.$Message.error(e.msg)}))}}},p=h,v=(o("629c"),o("2877")),g=Object(v["a"])(p,m,f,!1,null,"49ef920f",null),j=g.exports,_=function(t,e){e=1*e||1;var o=[];return t.forEach((function(t,i){i%e===0&&o.push([]),o[o.length-1].push(t)})),o},k={name:"ChatRoom",auth:!1,components:{feedBack:j},props:{chatOptions:{type:Object,default:function(){return{show:!1}}}},directives:{drag:{inserted:function(t){var e=0,o=0,i=0,a=0,n=!1;t.onmousedown=function(s){return e=s.clientX,o=s.clientY,i=t.parentNode.offsetLeft,a=t.parentNode.offsetTop,n=!0,t.style.cursor="move",window.onmousemove=function(s){if(0!=n){var r=s.clientX,c=s.clientY,l=r-(e-i),d=c-(o-a);t.parentNode.style.left=l+"px",t.parentNode.style.top=d+"px"}},window.onmouseup=function(){n=!1,t.style.cursor="default",window.onmousemove=null,window.onmouseup=null},!1}}}},data:function(){return{locations:"".concat(location.origin),change:!1,emojiGroup:_(s["a"],20),emojiList:s["a"],emojiShow:!1,recordList:[],limit:20,loading:!1,finished:!1,chatCont:"",service:null,serviceData:{},uploadAction:"",notice:"",audio:null,muted:!1,audioSrc:"",upperId:0,uploadData:{},is_tourist:1,text:"",isLoad:!1,page:1,tourist_avatar:"",tourist_uid:"",toUid:"",kufuToken:""}},watch:{muted:function(t){this.audio.muted=t}},computed:{records:function(){var t=this;return this.recordList.map((function(e,o){return o&&new Date(e.add_time)-new Date(t.recordList[o-1].add_time)>=3e5?e.show=!0:e.show=!1,e}))}},created:function(){-1!=location.href.indexOf("kefu")&&(this.uploadAction=c["a"].apiBaseURL.replace(/adminapi/,"kefuapi")+"/tourist/upload");var t=d.a.get("auth._token.local1");this.kufuToken=t?t.split("Bearer ")[1]:""},mounted:function(){var t=this,e=this;window.addEventListener("click",(function(){e.emojiShow=!1})),this.$wechat._isMobile()&&this.$router.replace("/kefu/mobile_user_chat"),this.getNotice(),r["a"].then((function(e){t.kufuToken&&e.send({type:"login",data:t.kufuToken}),t.getService(),e.$on(["reply","chat"],(function(e){1==e.msn_type&&(e.msn=t.replace_em(e.msn)),t.recordList.push(e),setTimeout((function(e){t.$nextTick((function(){this.$refs.record.scrollTop=this.$refs.record.scrollHeight-this.$refs.record.clientHeight}))}),300)})),e.$on("to_transfer",(function(o){t.toUid=o.toUid,e.send({data:{id:t.toUid},type:"to_chat"})})),e.$on("socket_error",(function(){t.$Message.error("连接失败")})),e.$on("err_tip",(function(e){t.$Message.error(e.msg)})),e.$on("success",(function(e){t.is_tourist=0}))})),this.text=this.replace_em("[em-smiling_imp]")},beforeDestroy:function(){this.socket.close()},methods:{onLook:function(t){window.open("".concat(location.origin,"/home/goods_detail/").concat(t))},closeChange:function(t){this.change=t},sendMsg:function(t,e){var o={type:"chat",data:{msn:t,type:e,is_tourist:this.is_tourist,to_uid:this.toUid,tourist_uid:this.tourist_uid,tourist_avatar:this.tourist_avatar,form_type:this.$wechat.isWeixin()?1:3}};r["a"].then((function(t){t.send(o)}))},getService:function(){var t=this;Object(u["L"])({token:this.kufuToken||""}).then((function(e){t.serviceData=e.data,t.upperId=0,t.toUid=e.data.uid,t.tourist_uid=e.data.tourist_uid,t.tourist_avatar=e.data.tourist_avatar;var o={data:{id:e.data.uid,tourist_uid:t.tourist_uid},type:"to_chat"};r["a"].then((function(t){t.send(o)})),t.kufuToken&&t.getRecordList()})).catch((function(e){t.$Message.error(e.msg),t.change=!0}))},roomClick:function(t){},ctrlEnter:function(t){13==t.keyCode&&t.preventDefault(),this.chatCont.trim()&&this.sendMessage()},close:function(){this.$emit("chat-close")},selectEmoji:function(t){var e="[".concat(t,"]");this.chatCont+=e,this.emojiShow=!1},replace_em:function(t){return t=t.replace(/\[em-([\s\S]*)\]/g,"<span class='em em-$1'/></span>"),t},onScroll:function(t){t.target.scrollTop<=30&&this.kufuToken&&this.getRecordList()},getRecordList:function(){var t=this;this.loading||this.finished||(this.loading=!0,Object(u["e"])({uid:this.serviceData.uid,limit:this.limit,upperId:this.upperId,token:this.kufuToken}).then((function(e){if(0===e.data.length)return t.loading=!1;e.data.forEach((function(e){1==e.msn_type&&(e.msn=t.replace_em(e.msn))}));var o="";o=0==t.upperId?"chat_".concat(e.data[e.data.length-1].id):"chat_".concat(t.recordList[0].id),t.recordList=[].concat(Object(n["a"])(e.data),Object(n["a"])(t.recordList)),t.upperId=e.data.length>0?e.data[0].id:0,t.loading=!1,t.finished=e.data.length<t.limit,t.$nextTick((function(){this.setPageScrollTo(o)}))})).catch((function(e){t.$Message.error(e.msg),t.loading=!1})))},setPageScrollTo:function(t){var e=this;this.$nextTick((function(){if(t)setTimeout((function(){var o=parseFloat(document.getElementById(t).offsetTop)-60;e.$refs.record.scrollTop=o}),0);else{var o=document.querySelector("#chat_scroll");e.$refs.record.scrollTop=o.offsetHeight,setTimeout((function(t){e.$refs.record.scrollTop!=e.$refs.scrollBox.offsetHeight&&(e.$refs.record.scrollTop=document.querySelector("#chat_scroll").offsetHeight)}),300)}}))},emojiSwitch:function(){this.emojiShow=!this.emojiShow},sendMessage:function(){this.sendMsg(this.chatCont,1),this.chatCont=""},chat:function(t){var e=this;t.uid!=this.$auth.user.uid&&this.audio&&this.audio.play(),this.recordList.push(t),this.$nextTick((function(){e.$refs.record.scrollTop=e.$refs.record.scrollHeight-e.$refs.record.clientHeight}))},sendGoods:function(){var t=this;this.chatOptions.goodsId&&r["a"].then((function(e){e.send({data:{msn:t.chatOptions.goodsId,type:5,to_uid:t.toUid},type:"to_chat"})}))},sendOrder:function(){var t=this;this.chatOptions.orderId&&r["a"].then((function(e){e.send({data:{msn:t.chatOptions.orderId,type:6,to_uid:t.toUid},type:"to_chat"})}))},chatEnd:function(){navigator.userAgent.indexOf("MSIE")>0?navigator.userAgent.indexOf("MSIE 6.0")>0?(window.opener=null,window.close()):(window.open("","_top"),window.top.close()):navigator.userAgent.indexOf("Firefox")>0?window.location.href="about:blank ":(window.opener=null,window.open("","_self",""),window.close())},getNotice:function(){var t=this;Object(u["j"])().then((function(e){t.notice=e.data.content}))},beforeUpload:function(t){var e=this;this.uploadData={filename:t,token:this.kufuToken};var o=new Promise((function(t){e.$nextTick((function(){t(!0)}))}));return o},handleFormatError:function(t){this.$Message.error("上传图片只能是 jpg、jpg、jpeg、gif 格式!")},uploadSuccess:function(t){this.sendMsg(t.data.url,3)},uploadError:function(t){this.$Message.error(t)}}},w=k,C=(o("e358"),Object(v["a"])(w,i,a,!1,null,"5e15a960",null));e["default"]=C.exports},f9db:function(t,e,o){}}]);