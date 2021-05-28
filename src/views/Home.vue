<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search />
    </div>
    <div class="home__menu">
      <div class="home__menu results">
        Econtrados 20 heróis
      </div>
      <div class="home__menu options">
        <div>
          <img
            src="../assets/icons/ic_heroi.svg"
            alt="marvel"
          >
          Ordernar por nome de A/Z
        </div>
        <div

          @click="showOnlyFavorites()" 
        >
          <img
            src="../assets/favorito_01.svg"
            alt="marvel"
          >
          Somente Favoritos
        </div>
      </div>
    </div>
    <div class="home__list">
      <base-card-item
        v-for="item of currentList"
        :key="item.id"
        :name="item.name"
        :img-url="item.thumbnail.path"
        :extension="item.thumbnail.extension"
        @onClick="setAsFavorite(item)"
      /> 
    </div>
    <div 
      v-if="currentList.length === 0"
      class="home__list--no-results"
    >
      Você não possuí favoritos
    </div>
    <div
      v-if="onlyFavorites" 
      class="home__back"
      @click="showMainList()"
    >
      <a>Voltar</a>
    </div>
  </div>
</template>

<script>

import Header from '../components/Header';
import marvelService from '../services/marvelService';
import { mapGetters } from "vuex";

export default {
  components: {
    Header
  },
  data() {
    return {
      characters: [],
      currentList: [],
      onlyFavorites: false
    }
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
    }),
  },
  created(){
    this.findCharacters();
  },
  methods: {
    findCharacters() {
      marvelService.getCharacters().then(({ data }) => {
        this.characters = data.data.results;
        this.currentList = this.characters;
      });
    },
    setAsFavorite(character) {
      const favorite = this.currentFavorites.find((item) => character.id === item.id);
  
      if (!(favorite)) {
        return this.$store.dispatch("setFavorite", character); 
      } 

      this.$store.dispatch("unsetFavorite", character); 
    },
    showOnlyFavorites() {
      this.onlyFavorites = true;
      this.currentList = this.currentFavorites;
    },
    showMainList() {
      this.onlyFavorites = false;
      this.currentList = this.characters;
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 4rem;
  width: 900px;

  &__search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    width: 60rem;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0;
    width: 100%;
  
    &.results { 
      font-size: 1.2rem;
      font-weight: bold;
      color: $primary-gray;
    }

    &.options {
      font-size: 1rem;
      color: $secondary-red;
    }

    & img {
      padding: .5rem;
    }

    & div {
      display: flex;
      align-items: center;
      padding: .5rem;
    }
  }

  &__list {
    display: flex;
    justify-content:center;
    flex-direction: row;
    flex-wrap: wrap;

    &--no-results {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 1rem;
    }
  }

  &__back {
    padding: 2rem;
    font-size: 1.3rem;
    color: $secondary-red;
    cursor: pointer;
  }
}

</style>