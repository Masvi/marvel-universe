import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: []
  },
  getters: {
    getFavorites({ favorites }) {
      return favorites;
    },
  },
  mutations: {
    SET_FAVORITES(state, value) {
      state.favorites.push(value);
    },
    UNSET_FAVORITE(state, value) {
      state.favorites.splice(state.favorites.indexOf(value), 1);
    },
    REMOVE_ONE_FAVORITE(state) {
      state.favorites.shift();
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    setFavorite({ commit }, id) {
      if (this.state.favorites.length === 5) {
        commit('REMOVE_ONE_FAVORITE'); 
      }
      commit('SET_FAVORITES', id); 
    },
    unsetFavorite({ commit }, id) {
      commit('UNSET_FAVORITE', id); 
    },
    setLoading({ commit }) {
      commit('SET_LOADING'); 
    }
  },
});
