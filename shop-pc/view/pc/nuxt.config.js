import Setting from './setting';
const env = require('./env');
const MODE = 'spa';  //单页面形式渲染模式 (打包后将 dist目录覆盖到 public/home 目录下) 打包命令: npm run generate
module.exports = {
  buildDir: 'nuxt-dist',
  mode: MODE,
  /*
  ** Headers of the page
  */
  head: {
    title: 'CRMEB',
    meta: [
      {charset: 'utf-8'},
      {name: 'apple-mobile-web-app-capable', content: "yes"},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'http-equiv', 'http-equiv': "X-UA-Compatible", content: "IE=edge"},
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'CRMEB 新零售社交电商 社交电商系统 小程序商城系统 公众号商城系统 商城系统源码 免费商城系统 商城系统开发 开源商城系统 CRMEB源码 微商城源码 多店商城系统 小程序直播电商系统 知识付费系统源码 SCRM 客户管理 客户营销系统 多商户商城 B2B2C B2C B2B O2O'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'CRMEB开源会员电商营销系统，依托社交营销应用场景，独创将用户管理系统与社交电商系统创新性深度集成，充分将公域流量转为私域流量，帮助企业快速积累用户并实现精准营销，一次购买永久享受免费升级服务免费提供升级教程。咨询：400-8888-794'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: `${Setting.apiBaseURL}/get_script`, ssr: false}
    ],
  },
  env: {
    NUXT_ENV: env[process.env.MODE]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    {src: "./assets/iconfont/iconfont.js", ssr: false},
    {src: "~/plugins/vue-swiper.js", ssr: false},
    {src: '~/plugins/utils.js', ssr: false},
    {src: '~/plugins/debounce.js', ssr: false},
    {src: "~/plugins/element-ui", ssr: false},
    {src: "~/plugins/vueqr.js", ssr: false},
    {src: "~/plugins/vue-clipboard.js", ssr: false},
    '~/plugins/main'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '~assets/theme/element-variables.scss'
  ],
  /*
   ** Global CSS
   */
  css: [
    "~assets/iconfont/iconfont.css",
    "~assets/css/index.scss",
    // "~theme/index.css",
    {src: "swiper/dist/css/swiper.css"}
  ],

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      local1: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'get'
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: false
          }
        }
      },
      local2: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/login/mobile',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'get'
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: false
          }
        }
      },
      local3: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/pc/wechat_auth',
            method: 'get',
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'get'
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: false
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: false
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 7
      }
    },
    localStorage: false
  },

  axios: {
    baseURL: ''
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://www.sxitdlc.com/server/api',
  //     pathRewrite: {
  //       '^/api': '/',
  //       changeOrigin: true // 表示是否跨域
  //     }
  //   }
  // },
  /*
  ** Build configuration
  */
  distDir: 'build',
  /*
  ** Build configuration
  */
  build: {
    publicPath: "/home/",
    publicPathFolder: MODE === 'spa' ? '/' : '',
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  },

  server: {
    port: 10822,
    host: '0.0.0.0', // default: localhost
  },

}
