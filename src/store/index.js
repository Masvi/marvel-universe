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
      console.log(`mutation`)
      console.log(state)
      console.log(value)
      state.favorites = [...state.favorites, value];

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    SET_FAVORITES_FROM_LOCAL_STORAGE(state, value) {
      state.favorites = value;
    },
    UNSET_FAVORITE(state, value) {
      state.favorites.splice(state.favorites.indexOf(value), 1);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    SET_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
    SET_FAVORITES_AS_FULL(state) {
      state.isFullFavorites = !state.isFullFavorites;
    },
  },
  actions: {
    setFavorite({ commit, state }, character) {
      console.log('set...');
      console.log(character);
      if (state.favorites && state.favorites.length === 5) {
        return commit('SET_FAVORITES_AS_FULL');
      }
      
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
