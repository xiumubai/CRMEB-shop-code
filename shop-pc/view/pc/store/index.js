// import Vue from 'vue'
// import Vuex from 'vuex'
// //
// Vue.use(Vuex);

export const state = () => ({
  headers: true,
  footers: true,
  cartnumber: 0,
  logoUrl: '',
  titleCon: '',
  unreadNum:0,
  service_num:0
})

export const mutations = {
  isHeader (state, data) {
    state.headers = data;
  },
  isFooter (state, data) {
    state.footers = data;
  },
  cartNum (state, data){
    state.cartnumber = data;
  },
  serviceNum (state, data){
    state.service_num = data;
  },
  logo (state, data){
    state.logoUrl = data;
  },
  titles (state, data){
    state.titleCon = data;
  },
  unreadKefu (state, data){
    state.unreadNum = data;
  }
}

export const actions = {
  nuxtServerInit({commit}, {app}) {
    commit('unreadKefu', app.$cookies.get('unreadKefu'));
    commit('logo', app.$cookies.get('logo'));
    commit('titles', app.$cookies.get('titles'));
  }
}
