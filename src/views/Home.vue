<template>
  <div
    ref="top"
    class="home"
  >
    <Header />
    <div
      class="home__search-section"
    >
      <base-search
        :err="isEmpty"
        @typing="handleList"
        @response="handleResponse"
      />
    </div>
    <base-list-menu
      :metadata="currentList"
      :only-favorites="onlyFavorites"
      :sort-by-name="sortByName"
      @favorite-only="showOnlyFavorites"
    />
    <div class="home__list">
      <base-card-item
        v-for="item of currentList"
        :key="item.id"
        :character="item"
        @click="showDetails(item)"
      />
    </div>
    <div
      v-if="!onlyFavorites && currentList.length > 1"
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
      {{ filter ? "Não encontrado" : "Você não possuí favoritos" }}
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
import Header from "../components/Header";
import marvelService from "../services/marvelService";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
  },
  data() {
    return {
      characters: [],
      currentList: [],
      onlyFavorites: false,
      sortByName: true,
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
      this.$refs.top.scrollIntoView()
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
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__search-section {
    padding: 1rem;
  }

  &__options {
    font-size: 0.85rem;
    color: $secondary-red;
  }

  &__favorites {
    cursor: pointer;

    &:hover > img {
      transform: scale(1.1);
      transition: all 0.4s;
    }
  }

  &__title {
    display: flex;
    font-weight: bold;
    padding: 1rem;
    color: $primary-gray;
    justify-content: center;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    justify-content: center;

    &--no-results {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 0.75rem;
      padding: 3rem;
      color: $primary-black;
    }
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

  &__menu {
    padding: 0.4rem;
  }

  &__not-found {
    justify-content: center;
    text-align: center;
    margin-top: 20vh;
  }

  &__search-not-found {
    color: $secondary-red;
    font-size: 1rem;
  }
}
</style>
