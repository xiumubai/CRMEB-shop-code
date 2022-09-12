<template>
  <div class="goodsSearch wrapper_1200">
    <div class="title">
      <span class="home">首页 > </span>{{headerTitle===1?'精品推荐':'首发新品'}}
    </div>
    <div class="list acea-row row-middle" v-if="productslist.length">
      <div class="item" v-for="(item, index) in productslist" :key="index" @click="goDetail(item)">
        <div class="pictrue"><img :src="item.image"></div>
        <div class="top acea-row row-between-wrapper">
          <div><span class="font-color">¥{{item.price}}</span><span class="y_money">¥{{item.ot_price}}</span></div>
          <div class="label" v-if="item.checkCoupon">券</div>
        </div>
        <div class="info line2">{{item.store_name}}</div>
        <div class="bottom acea-row row-between-wrapper">
          <span>{{item.sales}}人付款</span>
          <span>{{item.star}}分</span>
        </div>
      </div>
    </div>
    <div class='loadingicon acea-row row-center-wrapper' v-if="productslist.length && productslist.length>=limit">
      <span class='loading iconfont icon-jiazai' v-if="!pullRefreshss"></span>{{title}}
    </div>
    <div class="noCart" v-if="!productslist.length">
      <div class="pictrue"><img src="../assets/images/noGoods.png"></div>
      <div class="tip">亲，暂无商品哟~</div>
    </div>
    <hotGoods v-if="!productslist.length"></hotGoods>
  </div>
</template>

<script>
  import hotGoods from '@/components/hotGoods';
  export default {
    name: "goods_list",
    auth: false,
    components:{
      hotGoods
    },
    data(){
      return{
        productslist:[],
        pullRefreshss: true, // 代表可以进行下拉加载，false代表不能
        page: 1, //代表页面的初始页数
        limit:20,
        scollY: null,// 离底部距离有多少
        pageTotal: 50, //总页数
        title:'下拉加载更多',
        headerTitle:1
      }
    },
    async asyncData({app,query}){
      return{
        headerTitle:parseInt(query.type)
      }
    },
    fetch({ store}) {
      store.commit('isHeader', true);
      store.commit('isFooter', true);
    },
    head() {
      return {
        title: "商品列表-"+this.$store.state.titleCon
      }
    },
    created(){
      this.getProductslist();
    },
    mounted(){
      this.pullRefresh();
    },
    beforeDestroy() {
      window.onscroll = null;
    },
    methods:{
      goDetail (item) {
        let path = item.presale
        ? (path = {
            path: "/goods_presell_detail",
            query: {
              id: item.id,
            },
          })
        : (path = { path: `/goods_detail/${item.id}` });
      this.$router.push(path);
      },
      getProductslist(){
        let _this = this,currentPage = {page: this.page,limit:this.limit};
        _this.$axios.get('/pc/get_recommend/'+ _this.headerTitle, {
          params: currentPage
        }).then(function (res) {
          _this.pageTotal = res.data.count;
          // 请求完成后，把得到的数据拼接到当前dom里面
          _this.productslist = _this.productslist.concat(res.data.list);
        }).catch(function (err) {
          _this.$message.error(err);
        })
      },
      // 下拉加载ajax
      pullRefresh: function () {
        var _this = this;
        window.onscroll = function () {
          _this.scrollChange()
        }
      },
      scrollChange: function () {
        let _this = this;
        this.scollY = this.comsys.getScrollTop() + this.comsys.getWindowHeight() - this.comsys.getScrollHeight();
        // 把下拉刷新置为false，防止多次请求
        if (this.scollY >= -50) {
          if (this.page > Math.ceil(this.pageTotal/this.limit)) {
            this.title = '已没有更多数据';
            this.pullRefreshss = true;
            return false;
          }
          if (!this.pullRefreshss) {
            return false;
          }
          _this.pullRefreshss = false;
          _this.title = '正在加载中....';
          // 加页码数
          this.page++;
          _this.getProductslist();
        } else {
          // 其他时候把下拉刷新置为true
          _this.pullRefreshss = true;
          this.title = '下拉加载更多';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav{
    width: 100%;
    height: 96px;
    background: #FFFFFF;
    .navCon{
      height:100%;
      .textPic{
        height: 100%;
        .icon{
          font-size: 100px;
        }
        .list{
          margin-left: 85px;
          .item{
            padding: 15px 10px;
            margin-right: 13px;
            color: #282828;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
            &:hover{
              color: #E93323;
            }
          }

        }
      }
      .search{
        width: 360px;
        height: 40px;
        border: 1px solid #E93323;
        border-radius: 2px;
        cursor: pointer;
        .text{
          width: 290px;
          padding-left: 14px;
          color: #C1C1C1;
          input{
            width: 250px;
            height: 36px;
            border:none;
            outline: none;
            padding-left: 10px;
            margin-top: -2px;
          }
          .iconfont{
            font-size: 15px;
            margin-right: 5px;
          }
        }
        .bnt{
          width: 64px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          color: #fff;
        }
      }
    }
  }
  .goodsSearch{
    .title{
      height: 60px;
      line-height: 60px;
      color: #999999;
      .home{
        color: #282828;
        font-size: 14px;
      }
    }
    .list{
      width: 1250px;
      .item{
        padding: 16px;
        width: 224px;
        height: 340px;
        background-color: #fff;
        margin: 0 20px 20px 0;
        cursor: pointer;
        &:hover{
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
        }

        .pictrue{
          width: 192px;
          height: 192px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .top{
          margin-top: 16px;
          .font-color{
            font-size: 22px;
            font-weight: bold;
          }
          .y_money{
            font-size: 12px;
            color: #AAAAAA;
            text-decoration: line-through;
            margin-left: 8px;
          }
          .label{
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background: linear-gradient(330deg, rgba(231, 85, 67, 0.14) 0%, rgba(244, 103, 83, 0.14) 100%);
            font-size:12px;
            color: #E93323;
          }
        }
        .info{
          margin-top: 8px;
          color: #5A5A5A;
        }
        .bottom{
          font-size: 12px;
          color: #AAAAAA;
          margin-top: 10px;
        }
      }
    }
    .noCart{
      text-align: center;
      margin-bottom: 70px;
      .pictrue{
        width: 216px;
        height: 136px;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
        .tip{
          margin-top: 12px;
          color: #646464;
        }
      }
    }
  }
</style>
