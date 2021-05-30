import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: [],
    isFullFavorites : false
  },
  getters: {
    getFavorites({ favorites }) {
      return favorites;
    },
    getFavoritesStatus({ isFullFavorites }) {
      return isFullFavorites;
    }
  },
  mutations: {
    SET_FAVORITES(state, value) {
      state.favorites.push(value);
    },
    UNSET_FAVORITE(state, value) {
      state.favorites.splice(state.favorites.indexOf(value), 1);
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
    SET_FAVORITES_AS_FULL(state) {
      state.isFullFavorites = !state.isFullFavorites;
    },
  },
  actions: {
    setFavorite({ commit }, character) {
      if (this.state.favorites.length < 5) {
        return commit('SET_FAVORITES', character); 
      }
      commit('SET_FAVORITES_AS_FULL');
    },
    unsetFavorite({ commit }, character) {
      commit('UNSET_FAVORITE', character); 
    },
    setLoading({ commit }) {
      commit('SET_LOADING'); 
    }
  },
});
