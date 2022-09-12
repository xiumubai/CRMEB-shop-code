<template>
    <div class="error-page">
      <template v-if="error.statusCode == 404">
        <img src="~assets/images/404.png" alt="" >
        <p class="title">抱歉，您访问的页面出错了</p>
        <span class="small">您可能输错了网址，或该网页已被删除、不存在等</span>
      </template>
      <template v-else>
        <img src="~assets/images/400.png" alt="">
        <p class="title">错误的请求</p>
        <span class="small">请检查您的配置文件</span>
      </template>
      <el-button plain @click="goHome">返回首页</el-button>
    </div>
</template>

<script>
    export default {
      props: ['error'],
      name: "error.vue",
      methods:{
        goHome(){
          this.$router.replace('/')
        }
      }
    }
</script>

<style lang="scss" scoped>
.error-page{
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    margin-top: 20px;
    font-size: 24px;
    color: #282828;
  }
  .small{
    margin: 12px 0 24px;
    font-size: 14px;
    color: #969696;
  }
}
</style>
