<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search />
    </div>
    <div>
      {{ currentFavorites }}
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
        <div>
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
        v-for="item of characters"
        :key="item.id"
        :name="item.name"
        :img-url="item.thumbnail.path"
        :extension="item.thumbnail.extension"
        @onClick="setAsFavorite(item)"
      /> 
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
      });
    },
    setAsFavorite({ id }) {
      const isFavorite = this.currentFavorites.find((item) => id === item);
  
      if (!(isFavorite)) {
        return this.$store.dispatch("setFavorite", id); 
      } 

      this.$store.dispatch("unsetFavorite", id); 
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
  
    & .results { 
      font-size: 1.2rem;
      font-weight: bold;
      color: $primary-gray;
    }

    & .options {
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
  }
}

</style>