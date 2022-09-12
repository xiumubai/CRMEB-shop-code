<template>
    <div class="balance-wrapper">
      <div class="user-com-title">我的余额</div>
      <div class="balance-box">
        <div class="money-box" v-if="$auth.user">
          <div class="money-item">
            <span>账户可用余额(元)</span>
            <p>{{userInfo.now_money}}</p>
          </div>
          <div class="money-item">
            <span>累计充值(元)：</span>
            <p>{{userInfo.recharge}}</p>
          </div>
          <div class="money-item">
            <span>累计消费(元)：</span>
            <p>{{userInfo.orderStatusSum}}</p>
          </div>
        </div>
        <div class="tab-box">
          <div class="hd clearfix">
            <div class="hd-item" :class="{on:tabCur == item.key}" v-for="(item,index) in tabList" :key="index" @click="bindTab(item)">{{item.title}}</div>
          </div>
          <div class="bd">
            <div class="bd-item" v-for="(value, key, index) in list" :key="index">
              <div class="time">{{key}}</div>
              <div class="list">
                <ul>
                  <li v-for="list in value" :key="list.id">
                    <span class="txt">{{list.title}}</span>
                    <p class="txt-time">{{list.add_time}}</p>
                    <span class="num" :class="{green:list.pm}"> {{list.pm?'+':'-'}} ¥{{list.number}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="pages-box" v-if="total > 0">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="bindPageCur"
            :current-page.sync="currentPage"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="empty-box" v-if="total == 0">
        <img src="~/assets/images/noyue.png" alt="">
        <p>亲，暂无账单明细哟~</p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "balance",
      auth: "guest",
      data(){
        return {
          tabCur:0,
          tabList:[
            {
              title:'账单明细',
              key:0
            },
            {
              title:'收入明细',
              key:2
            },
            {
              title:'支出明细',
              key:1
            }
          ],
          list:[],
          page:1,
          limit:10,
          total:0,
          userInfo:{},
          currentPage:1
        }
      },
      fetch({ store }) {
        store.commit("isHeader", true);
        store.commit("isFooter", true);
      },
      head() {
        return {
          title: "我的余额-"+this.$store.state.titleCon
        }
      },
      created() {
        this.getList();
        this.getUserInfo();
      },
      methods:{
        getUserInfo(){
          this.$axios.get("/user").then(res=>{
            this.userInfo = res.data;
          })
        },
        bindTab(item){
          this.tabCur= item.key;
          this.page = 1;
          this.currentPage = 1;
          this.getList();
        },
        getList(){
          this.$axios.get(`pc/get_balance_record/${this.tabCur}`,{
            params:{
              page:this.page,
              limit:this.limit
            }
          }).then(res=>{
            let obj = {}
            res.data.list.forEach(el=>{
              if(!obj.hasOwnProperty(el.time)){
                obj[el.time] = []
                obj[el.time].push(el)
              }else{
                obj[el.time].push(el)
              }
            })
            this.total = res.data.count || 0
            this.list = obj
          })
        },
        // 分页点击
        bindPageCur(data){
          this.page = data
          this.getList()
        }
      }
    }
</script>

<style lang="scss" scoped>
.balance-wrapper{
  .balance-box{
    padding-top: 45px;
    .money-box{
        .money-item{
          display: inline-block;
          margin-right: 190px;
          span{
            color: #969696;
            font-size: 14px;
          }
          p{
            margin-top: 10px;
            color: #282828;
            font-size: 32px;
          }
        }
    }
    .tab-box{
      padding-right: 54px;
      margin-top: 35px;
      .hd{
        padding-bottom: 15px;
        border-bottom: 1px solid #ECECEC;
        .hd-item{
          position: relative;
          float: left;
          padding: 0 10px;
          margin-right: 30px;
          text-align: center;
          font-size: 16px;
          color: #999999;
          cursor: pointer;
          &.on{
            color: #E93323;
            &:after{
              content: ' ';
              position: absolute;
              left: 0;
              bottom: -16px;
              width:100%;
              height: 2px;
              background: #E93323;
            }
          }
        }
      }
      .bd{
        .bd-item{
          margin-top: 20px;
          .time{
            height: 36px;
            line-height: 36px;
            background: #F4F4F4;
            color: #969696;
            font-size: 14px;
            padding: 0 10px;
          }
          .list li{
            position: relative;
            padding: 18px 10px;
            border-bottom: 1px dashed #D0D0D0;
            .txt{
              color: #282828;
              font-size: 16px;
            }
            .txt-time{
              margin-top: 10px;
              color: #969696;
              font-size: 14px;
            }
            .num{
              position: absolute;
              right: 10px;
              top: 50%;
              margin-top: -8px;
              font-size: 16px;
              font-weight: bold;
              color: #E93323;
            }
            .green{
              color: #43B36D;
            }
          }
        }
      }
    }
  }
}
  .pages-box{
    padding-right: 54px;
    margin-top: 30px;
    text-align: right;
  }
</style>
