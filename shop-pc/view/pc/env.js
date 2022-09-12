module.exports = {
  // 测试环境 接口请求地址 (http)或(https)://www.crmeb.com(换成你的域名)/api
  test: {
    MODE: 'test',
    VUE_APP_API_URL: ''
  },
  // 开发环境 接口请求地址 (http)或(https)://www.crmeb.com(换成你的域名)/api
  dev: {
    MODE: 'dev',
    VUE_APP_API_URL: ''
  },
  // 生产环境 接口请求地址 (http)或(https)://www.crmeb.com(换成你的域名)/api 非独立部署默认为空
  prod: {
    MODE: 'prod',
    VUE_APP_API_URL: ''
  }
}
