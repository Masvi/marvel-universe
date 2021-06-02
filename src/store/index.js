import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: [],
  },
  getters: {
    getFavorites({ favorites }) {
      return favorites;
    },
    getLoading({ isLoading }) {
      return isLoading;
    }
  },
  mutations: {
    SET_FAVORITES(state, value) {
      state.favorites = [...state.favorites, value];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    SET_FAVORITES_FROM_LOCAL_STORAGE(state, value) {
      Vue.set(state, 'favorites', value)
    },
    UNSET_FAVORITE(state, value) {
      state.favorites.splice(state.favorites.indexOf(value), 1);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    setFavorite({ commit }, character) {
      commit('SET_FAVORITES', character); 
    },
    setFavoritesFromLocalStorage({ commit }, favorites) {
      commit('SET_FAVORITES_FROM_LOCAL_STORAGE', favorites); 
    },
    unsetFavorite({ commit }, character) {
      commit('UNSET_FAVORITE', character); 
    },
    setLoading({ commit }) {
      commit('SET_LOADING'); 
    }
  },
});
