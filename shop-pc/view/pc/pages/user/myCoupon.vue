<template>
    <div class="mycoupon-wrapper">
      <div class="user-com-tab">
        <span class="item" :class="{on:tabCur == 0}" @click="tabCur= 0">未使用</span>
        <span class="item" :class="{on:tabCur == 1}" @click="tabCur= 1">已使用/已过期</span>
      </div>
      <div class="main-section">
        <div class="main-bd">
          <div class="list acea-row">
            <div v-for="item in list" :key="item.id" class="item acea-row" :class="{svip:item.receive_type===4,disabled:tabCur==1}">
              <div class="text">
                <div v-if="item.applicable_type === 0" class="label">通用券</div>
                <div v-else-if="item.applicable_type === 1" class="label">品类券</div>
                <div v-else-if="item.applicable_type === 2" class="label">商品券</div>
                <div class="text-cont acea-row row-middle">
                  <div class="money">
                    ￥<span class="num">{{ parseFloat(item.coupon_price) }}</span>
                  </div>
                  <div class="info">
                    <div class="name line1">{{ item.coupon_title }}</div>
                    <div>满{{ parseFloat(item.use_min_price)}}可用</div>
                  </div>
                </div>
                <div class="time">
                  有效时间：{{ item.add_time }}-{{ item.end_time }}
                </div>
              </div>
<!--              <div class="btn acea-row row-middle" v-if="item._type == 2">可使用</div>-->
<!--              <div class="btn acea-row row-middle" v-else>已失效</div>-->
              <div class="btn acea-row row-middle">{{ item.pc_msg }}</div>
            </div>
          </div>
          <div class="empty-box" v-if="list.length == 0">
            <img src="~/assets/images/noCoupou.png" alt="">
            <p>亲，暂无可使用优惠券哟~</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "myCoupon",
      auth: "guest",
      data(){
        return {
          tabCur: 0,
          list:[],
          couponList:[],
          expireList:[]
        }
      },
      watch:{
        tabCur(nVal,oVal){
          if(nVal == 1){
            this.list = this.expireList
          }else{
            this.list = this.couponList
          }
        }
      },
      fetch({ store }) {
        store.commit("isHeader", true);
        store.commit("isFooter", true);
      },
      head() {
        return {
          title: "我的优惠券-"+this.$store.state.titleCon
        }
      },
      created() {
        this.getCouponList()
      },
      methods:{
        getCouponList() {
          this.$axios
            .get("coupons/user/0")
            .then(res => {
              res.data.forEach(el=>{
                if(el.pc_type == 0){
                  this.expireList.push(el)
                }else{
                  this.couponList.push(el)
                }
              })
              if(this.tabCur == 1){
                this.list = this.expireList
              }else{
                this.list = this.couponList
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        },
      }
    }
</script>

<style lang="scss" scoped>
.main-section{
  margin-top: 30px;
  .list {
    .item {
      width: 300px;
      height: 130px;
      margin-right: 15px;
      margin-bottom: 15px;
      background: url("~assets/images/coupon-back1.png") center/cover no-repeat;
      box-shadow: 0 3px 20px rgba(0, 0, 0, 0.08);
      &.svip{
        background-image: url("~assets/images/vipCouB.png");
        .label {
          background-color: #FEE2B6;
          color: #863C0D;
        }
        .money {
          color: #863C0D;
        }
        .btn{
          color: #863C0D;
        }
      }
      &.disabled {
        background-image: url("~assets/images/coupon-back2.png");
        .label {
          background-color: rgba(145, 145, 145, 0.1);
          color: #acacac;
        }
        .text-cont {
          color: #d0d0d0;
        }
        .money {
          color: #bfbfbf;
        }
        .name {
          color: #bfbfbf;
        }
        .time {
          color: #d0d0d0;
        }
      }
      .text {
        flex: 1;
        padding-left: 14px;
      }
      .text-cont {
        margin-top: 14px;
        font-size: 14px;
        color: #969696;
      }
      .label {
        width: 62px;
        height: 24px;
        background-color: rgba(233, 51, 35, 0.1);
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #e93323;
      }
      .money {
        margin-right: 14px;
        font-size: 16px;
        color: #e93323;
        .num {
          font-weight: bold;
          font-size: 32px;
        }
      }
      .info {
        flex: 1;
        min-width: 0;
      }
      .name {
        margin-bottom: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #282828;
        width: 107px;
      }
      .time {
        margin-top: 14px;
        font-size: 12px;
        color: #969696;
      }
      .btn {
        width: 52px;
        padding-right: 18px;
        padding-left: 18px;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
.user-com-tab span{
  padding: 0 8px;
}

</style>
