import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || {
      username: '',
      // ...其他用户信息
    },
  },
  mutations: {
    setLoggedInUser(state, userInfo) {
      state.loggedInUser.username = userInfo.username;
      // 更新 localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
    },
  },
  actions: {
    setLoggedInUser({ commit }, userInfo) {
      commit('setLoggedInUser', userInfo);
    },
  },
});

export default store;
