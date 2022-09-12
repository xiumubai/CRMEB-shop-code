// 请求接口地址 根据环境判断
// 接口配置 在根目录 env.js 进行配置
let VUE_APP_API_URL
if (process.browser) {
  VUE_APP_API_URL = `${process.env.NUXT_ENV.VUE_APP_API_URL}` || `${location.origin}/api`;
}
const Setting = {
  // 接口请求地址
  apiBaseURL: VUE_APP_API_URL,
};

export default Setting;
