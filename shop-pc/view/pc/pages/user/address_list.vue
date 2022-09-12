<template>
    <div class="address-wrapper">
      <div class="user-com-title">
        地址管理
      </div>
      <div class="address-content">
        <ul class="clearfix">
          <li v-for="(item,index) in list" :index="index">
            <div class="name line1">{{item.real_name}}</div>
            <div class="phone">{{item.phone}}</div>
            <div class="text line4">{{item.province}}{{item.city}}{{item.district}}{{item.detail}}</div>
            <div class="edit-box">
              <span @click="bindDefault(item)" v-if="item.is_default !=1">设为默认地址</span>
              <span @click="edit(item)">修改</span>
              <span @click="bingDelete(item,index)">删除</span>
            </div>
            <div class="moren" v-if="item.is_default ==1">默认</div>
          </li>
          <li class="addbox" @click="addAddress">
            <div class="box">
              <img src="~assets/images/add.png" alt="">
              <p>添加新地址</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 添加地址弹窗 -->
      <el-dialog
        title="添加收货地址"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="handleClose"
        >
          <div class="form-box">
            <div class="input-item" style="width: 48%;display:inline-block">
              <el-input v-model="formData.name" maxlength="25" placeholder="姓名"></el-input>
            </div>
            <div class="input-item" style="width: 48%;display:inline-block;margin-left: 3%">
              <el-input v-model="formData.phone" placeholder="手机号"></el-input>
            </div>
            <div class="input-item text-wrapper">
              <p @click="bindAdd" v-if="!cityData.province.name">请选择省/市/区/街道</p>
              <p @click="bindAdd" v-if="cityData.province.name" style="color: #333">
                <span v-if="cityData.province.name">{{cityData.province.name}}/</span>
                <span v-if="cityData.city.name">{{cityData.city.name}}/</span>
                <span>{{cityData.district.name}}</span>
              </p>
              <div class="select-wrapper" v-if="isShowSelect">
                <div class="title-box" v-if="!cityData.province.city_id">选择省/自治区</div>
                <div class="title-box" v-if="cityData.step == 2">
                  <span>{{cityData.province.name}}</span>选择区县
                </div>
                <div class="title-box" v-if="cityData.step == 3">
                  <span>{{cityData.province.name}}</span>
                  <span>{{cityData.city.name}}</span>请选择配送区域
                </div>
                <div class="label-txt">
                  <span v-for="(item,index) in cityData.list" :key="index" @click="bindCity(item)" :class="{on:cityData.pid == item.city_id}">{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="input-item">
              <el-input type="textarea" rows="3" v-model="formData.con" placeholder="详细地址"></el-input>
            </div>
            <div class="input-item">
              <el-checkbox v-model="formData.checked">设为默认</el-checkbox>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="bindSubmit">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
    import { Message,MessageBox  } from 'element-ui';
    export default {
      name: "addressList",
      auth: "guest",
      data(){
        return{
          list:[],
          page:1,
          limit:20,
          isShowSelect:false,
          dialogVisible:false,
          editId:0,
          formData:{
            name:'',
            phone:'',
            con:'',
            checked:false
          },
          cityData:{
            pid:0,
            step:1,
            list:[],
            con:'',
            province:{},
            city:{},
            district:{}
          }
        }
      },
      fetch({ store }) {
        store.commit("isHeader", true);
        store.commit("isFooter", true);
      },
      head() {
        return {
          title: "地址管理-"+this.$store.state.titleCon
        }
      },
      created(){
      },
      mounted() {
        this.getList()
      },
      methods:{
        getList(){
          this.$axios.get('address/list').then(res=>{
            this.list = res.data
          })
        },
        addAddress(){
          this.editId = 0
          this.dialogVisible = true
        },
        handleClose(){
          this.formReset()
          this.dialogVisible = false
          this.isShowSelect = false
        },
        bindAdd(){
          this.isShowSelect = !this.isShowSelect
          if(this.cityData.step == 3){
            return
          }else{
            this.cityData.city = {}
            this.cityData.district ={}
            this.cityData.province ={}
            this.getCityList()
          }

        },
        getCityList(){
          this.$axios.get(`pc/get_city/${this.cityData.pid}`).then(res=>{
            this.cityData.list= res.data
          })
        },
        // 选择城市
        bindCity(item){
          if(this.cityData.step == 3){
            this.cityData.district = item
            this.cityData.pid = item.city_id
            this.isShowSelect = false
          }else {
            if(this.cityData.step == 1){
              this.cityData.province = item
            }
            if(this.cityData.step == 2){
              this.cityData.city = item
            }
            this.cityData.pid = item.city_id
            this.cityData.step++
            this.getCityList()
          }
        },
        bindSubmit(){
          if(!this.formData.name){
            return Message.error('请填写姓名')
          }
          if(!this.formData.phone || !/^1(3|4|5|7|8|9|6)\d{9}$/i.test(this.formData.phone)){
            return Message.error('请填写正确的手机号码')
          }
          if(!this.cityData.province.name){
            return Message.error('请选择省市区')
          }
          if(!this.formData.con){
            return Message.error('请填写详细地址')
          }
          this.$axios.post('address/edit',{
            address:{
              province:this.cityData.province.name,
              city:this.cityData.city.name,
              district:this.cityData.district.name,
              city_id:this.cityData.city.city_id,
            },
            is_default:this.formData.checked?1:0,
            real_name:this.formData.name,
            phone:this.formData.phone,
            detail:this.formData.con,
            id:this.editId
          }).then(res=>{
            this.dialogVisible = false
            this.getList()
            this.formReset()
            return Message.success('添加成功')
          }).catch(err=>{
            return Message.error(err);
          })
        },
        // 设为默认
        bindDefault(item){
          this.$axios.post('address/default/set',{
            id:item.id
          }).then(res=>{
            this.getList()
            return Message.success('设置成功')
          })
        },
        // 删除
        bingDelete(item,index){
          MessageBox.confirm('确定删除该地址吗','提示').then(res=>{
            this.$axios.post('/address/del',{
              id:item.id
            }).then(data=>{
              this.getList()
              return Message.success('删除成功')
            })
          })
        },
        // 编辑
        edit(item){
          this.dialogVisible = true
          this.formData.name = item.real_name
          this.formData.phone = item.phone
          this.formData.con = item.detail
          this.formData.checked = item.is_default?true:false
          this.cityData.province.name = item.province
          this.cityData.city.name = item.city
          this.cityData.district.name = item.district
          this.editId = item.id
          this.cityData.city.city_id = item.city_id
        },
        // 表单重置
        formReset(){
          this.formData.name = ''
          this.formData.phone = ''
          this.formData.con = ''
          this.formData.checked = false
          this.cityData.province = {}
          this.cityData.city = {}
          this.cityData.district = {}
          this.cityData.step = 1
          this.cityData.pid = 0
        }
      }
    }
</script>

<style lang="scss" scoped>
.address-wrapper{
  .address-content{
    li{
      position: relative;
      float: left;
      width: 250px;
      min-height: 200px;
      margin-top: 30px;
      margin-right: 30px;
      padding: 22px 27px;
      border: 1px solid #EAEAEA;
      .moren{
        position: absolute;
        right: 0;
        top: 0;
        width: 56px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        color: #fff;
        background: #E93323;
      }
      .name{
        color: #282828;
        font-size: 16px;
      }
      .phone{
        margin-top: 14px;
        margin-bottom: 4px;
        font-size: 12px;
      }
      .text{
        color: #999999;
        font-size: 14px;
        height: 75px;
      }
      .edit-box{
        opacity: 0;
        position: absolute;
        right: 14px;
        bottom: 12px;
        color: #E93323;
        span{
          margin-left: 5px;
          cursor: pointer;
        }
      }
      &.addbox{
        .box{
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -25px;
          text-align: center;
          width: 100%;
          color: #C8C8C8;
          font-size: 14px;
          img{
            display: inline-block;
            width: 27px;
            height: 27px;
          }
        }
      }
      &:hover{
        .edit-box{
          opacity: 1;
          transition: all .6s ease;
        }
      }
    }
  }
}
.input-item{
  margin-bottom: 20px;
}
.text-wrapper{
  position: relative;
  height: 40px;
  line-height: 40px;
  border: 1px solid #DCDFE6;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 4px;
  color: #cfcfcf;
  .select-wrapper{
    z-index: 10;
    position: absolute;
    left: 0;
    top: 45px;
    width: 100%;
    padding:0 15px;
    background: #fff;
    border: 1px solid #E93323;
    border-radius: 4px;
    line-height: 2;
    .title-box{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #EFEFEF;
      color: #E93323;
      font-size: 14px;
      span{
        margin-right: 8px;
        color: #666666;
      }
    }
    .label-txt{
      margin: 8px 0 18px;
      color: #666666;
      font-size: 14px;
      span{
        margin-right: 10px;
        cursor: pointer;
        &.on{
          color: #E93323;
        }
      }
    }
  }
}
</style>
