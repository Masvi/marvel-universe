<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search 
        @typing="filterOnList"
      />
    </div>
    <div class="home__menu">
      <div class="home__menu results">
        Econtrados {{ metadata.total }} heróis
      </div>
      <div class="home__menu home__options">
        <div>
          <img
            src="../assets/icons/ic_heroi.svg"
            alt="character"
          >
          Ordernar por nome - A/Z
          <div>
            <base-toggle 
              :default-checked="sortByName"
              @input="sort"
            />
          </div>
        </div>
        <div
          class="home__favorites"
          @click="showOnlyFavorites()" 
        >
          <img
            v-show="onlyFavorites"
            src="../assets/favorito_01.svg"
            alt="favorite"
          >
          <img
            v-show="!onlyFavorites"
            src="../assets/favorito_02.svg"
            alt="favorite"
          >
          Somente favoritos
        </div>
      </div>
    </div>
    <div 
      v-if="onlyFavorites" 
      class="home__title"
    >
      Sua lista de favoritos
    </div>
    <div class="home__list">
      <div 
        v-for="item of currentList"
        :key="item.id"
      >
        <base-card-item
          :character="item"
          @click="showDetails(item)"
        />
      </div> 
    </div>
    <div 
      v-if="!onlyFavorites && currentList.length !== 0"
      class="home__pagination"
    >
      <base-pagination 
        :metadata="metadata"
        @handlePagination="updateMetadata"
      />
    </div>
    <span 
      v-if="onlyFavorites && currentList.length === 0"
      class="home__list--no-results"
    >
      {{ (filter) ? 'Não encontrado' : 'Você não possuí favoritos' }}
    </span>
    <div class="home__back">
      <span
        v-if="onlyFavorites" 
        class="home__back"
        @click="showMainList()"
      >
        voltar
      </span>
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
      onlyFavorites: false,
      sortByName: true,
      filter: false,
      metadata:{
        count: 0,
        offset: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
      getLoading: "getLoading",
    }),
  },
  created() {
    const storage = JSON.parse(localStorage.getItem('favorites'));
    
    if (storage) {
      this.$store.dispatch("setFavoritesFromLocalStorage", storage); 
    }
    
    if (!this.getLoading) {
      this.handleLoading();
    }

    this.findCharacters();
  },
  methods: {
    findCharacters() {
      marvelService
        .getCharacters(this.metadata)
        .then(({ data } ) => {

          this.characters = data.data.results;
          const { count, offset, total } = data.data;

          this.metadata = {
            count,
            offset,
            total
          }

          this.currentList = this.characters;
        })
        .finally(() => this.handleLoading());
    },
    showOnlyFavorites() {
      if (!this.onlyFavorites) {
        this.onlyFavorites = true;
        return this.currentList = this.currentFavorites;
      }

      this.showMainList();
    },
    sort() {
      this.currentList.reverse();
    },
    filterOnList(value) {
      this.filter = true;
      const filtered = this.currentList.filter(item => { 
        return value.toLowerCase().split(' ')
          .every(v => item.name.toLowerCase().includes(v));
      });

      this.currentList = filtered;
        
      if (value === '') {
        this.currentList = this.characters;
        this.filter = false;
      }
    },
    showMainList() {
      this.onlyFavorites = false;
      this.currentList = this.characters;
    },
    handleLoading() {
      this.$store.dispatch("setLoading");
    },
    updateMetadata(value) {
      this.metadata.offset = value;
      this.handleLoading();
      this.findCharacters();
    },
    showDetails(item) {
      const { id } = item;

      this.$router.push({ 
        name: "details", 
        params: { 
          id,
          item
         } 
      });
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
 
  &__search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 1.5rem;
    
    &.results { 
      font-size: 1.2rem;
      font-weight: bold;
      color: $primary-gray;
    }

    & img {
      padding: .5rem;
    }

    & div {
      display: flex;
      align-items: center;
    }
  }

  &__options {
    font-size: .85rem;
    color: $secondary-red;
  }

  &__favorites {
    cursor: pointer;
    
    &:hover > img {
      transform:scale(1.1);
      transition:all 0.4s;
    }
  }

  &__title {
    display: flex;
    font-weight: bold;
    padding: 1rem;
    color: $primary-gray;
   }

  &__list {
    display: flex;
    justify-content:center;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 800px;

    &--no-results {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: .75rem;
      padding: 3rem;
      color: $primary-black;
    }
  }

  &__pagination {
    display: flex;
    margin-bottom: 80px;
  }

  &__back {
    display: flex;  
    margin-bottom: 3rem;

    & span {
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      color: $secondary-red;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }
}
</style>