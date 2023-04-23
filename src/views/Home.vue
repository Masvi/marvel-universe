<template>
  <div 
    ref="top" 
    class="home"
  >
    <div class="home__search-section">
      <base-search
        :err="isEmpty"
        @typing="handleList"
        @response="handleResponse"
      />
    </div>
    <div class="home__options">
      <base-list-menu
        :metadata="currentList"
        :only-favorites="onlyFavorites"
        @sort="sort"
        @favorite-only="showOnlyFavorites"
      />
    </div>
    <div class="home__list">
      <base-card-item
        v-for="item of currentList"
        :key="item.id"
        :character="item"
        @click="showDetails(item)"
      />
      <span
        v-if="onlyFavorites && currentList.length === 0"
        data-testid="no-results"
        class="home__list--no-results"
      >
        {{ filter ? "Não encontrado" : "Você não possuí favoritos" }}
      </span>
    </div>
    <div 
      v-if="onlyFavorites"
      class="home__back"  
    >
      <span 
        v-if="onlyFavorites"
        @click="showMainList()"
      >
        voltar
      </span>
    </div>
    <!-- <div
      v-if="!onlyFavorites && currentList.length > 1"
      class="home__pagination"
    >
      <base-pagination
        :metadata="metadata"
        @handlePagination="updateMetadata"
      />
    </div> -->
  </div>
</template>

<script>
import marvelService from "../services/marvelService";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      characters: [],
      currentList: [],
      onlyFavorites: false,
      filter: false,
      isEmpty: false,
      metadata: {
        count: 0,
        offset: 0,
        total: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
      getLoading: "getLoading",
    }),
  },
  created() {
    if (!this.getLoading) {
      this.handleLoading();
    }

    const storage = JSON.parse(localStorage.getItem("favorites"));

    if (storage) {
      this.$store.dispatch("setFavoritesFromLocalStorage", storage);
    }

    this.findCharacters();
  },
  methods: {
    handleResponse(response) {
      if (response) {
        return (this.currentList = response);
      }
      this.isEmpty = true;
    },
    handleList(value) {
      if (value === "") {
        this.isEmpty = false;
        this.onlyFavorites = false;
        this.currentList = this.characters;
      }
    },
    findCharacters() {
      marvelService
        .getCharacters(this.metadata)
        .then(({ data }) => {
          this.characters = data.data.results.map((item) => ({
            ...item,
            favorite: false,
          }));

          if (this.characters.length > 0) {
            this.checkIfisFavorite();
            const { count, offset, total } = data.data;

            this.metadata = {
              count,
              offset,
              total,
            };
            return (this.currentList = this.characters);
          }

          this.isEmpty = true;
        })
        .finally(() => this.handleLoading());
    },
    showOnlyFavorites() {
      if (!this.onlyFavorites) {
        this.onlyFavorites = true;
        return (this.currentList = this.currentFavorites);
      }
      this.showMainList();
    },
    sort() {
      this.currentList.reverse();
    },
    showMainList() {
      this.checkIfisFavorite();

      this.onlyFavorites = false;
      this.currentList = this.characters;
    },
    checkIfisFavorite() {
      this.currentFavorites.forEach((item) => {
        this.characters.filter((character) => {
          if (character.id === item.id) {
            character.favorite = true;
          }
        });
      });
    },
    handleLoading() {
      this.$store.dispatch("setLoading");
    },
    updateMetadata(value) {
      this.$refs.top.scrollIntoView();
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
          item,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  max-width: 1000px;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px;
  
  &__search-section {
    width: 60%;
    margin: 10px 0 10px 0;
  }

  &__options {
    width: 100%;
    font-size: 0.85rem;
    color: $secondary-red;
  }

  &__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    max-width: 1000px;
    gap: 5px;
    
    &--no-results {
      padding: 5rem;
    }
  }

  &__back {
    width: 100%;
    padding-top: 30px;
  }

  &__pagination {
    display: flex;
    margin-bottom: 80px;
    justify-content: center;
  }

  &__back {
    display: flex;
    margin-bottom: 3rem;
    justify-content: center;

    & span {
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      color: $secondary-red;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 600px) {
    .home__list {
      display: flex;
      align-items: center;
      justify-content:center; 
    }
  }
}
</style>
