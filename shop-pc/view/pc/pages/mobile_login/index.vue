<template>
    <div class="mobile-index">
      <div class="logo"><img src="http://v4.pc.crmeb.net/uploads/attach/2020/10/20201010/ce4429b1bb0070b4ea3d9deb3fbc812a.jpg" alt=""></div>
      <p class="name">你的名称</p>
      <span>点击授权登录您的客服工作台</span>
      <div class="btn-item"><el-button type="primary">确定</el-button></div>
      <div class="btn-item"><el-button plain>取消</el-button></div>
    </div>
</template>

<script>
    export default {
      name: "mobile_login",
      auth: false,
      fetch({ store}) {
        store.commit('isHeader', false);
        store.commit('isFooter', false);
      },
    }
</script>

<style lang="scss" scoped>
.mobile-index{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 45px;
  .logo{
    width: 178px;
    height: 178px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name{
    margin: 10px 0;
    font-size: 32px;
    color: #282828;
  }
  span{
    margin-bottom: 30px;
  }
  .btn-item{
    margin: 0 auto 15px;
    width: 85%;
    button{
      width: 100%;
      height: 50px;
      font-size: 16px;
      border-radius: 43px;
    }
  }
}
</style>
