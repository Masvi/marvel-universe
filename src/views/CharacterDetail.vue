<template>
  <div class="character"> 
    <div 
      class="character__header" 
      @click="redirectToHome()" 
    />
    <div class="character__header search">
      <base-search 
        :err="isEmpty" 
        @response="handleResponse" 
      />
    </div>

    <div class="character__title">
      <h1
        data-testid="name-title"
      >
        {{ currentCharacter.name }}
      </h1>
      <base-favorite 
        :is-large="true" 
        :character="currentCharacter" 
      />
    </div>
  
    <div 
      v-if="currentCharacter.thumbnail"   
      class="character__container character__container--column"
    >
      <div
        class="character__profile-photo"
        :class="{
          'character__profile-photo--empty': !currentCharacter.description,
        }"
      >
        <img
          name="comic"
          :src="`${currentCharacter.thumbnail.path}/portrait_uncanny.${currentCharacter.thumbnail.extension}`"
          :alt="`${currentCharacter.thumbnail.path}`"
        >
      </div>
      <div 
        v-if="currentCharacter.description" 
        class="character__description"
      >
        <p>
          {{ currentCharacter.description }}
        </p>
      </div>
      <div class="character__description">
        <span
          v-if="!currentCharacter.description"
          class="character__description character__description--no-description"
        >
          O personagem não possui descrição ainda!
        </span>
      </div>
    </div>

    <div class="character__container">
      <div class="character__info">
        <div class="character__info detail">
          <label> Quadrinhos </label>
          <div class="character__container character__container--margin">
            <img 
              src="../assets/icons/ic_quadrinhos.svg" 
              alt="comics"
            >
            <span v-if="currentCharacter.comics">
              {{ currentCharacter.comics.available }}
            </span>
          </div>
        </div>
        <div class="character__info detail">
          <label>Filmes</label>
          <div class="character__container character__container--margin">
            <img 
              src="../assets/icons/ic_trailer.svg" 
              alt="movie"
            >
            <span v-if="currentCharacter.series">
              {{ currentCharacter.series.available }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="character__container--column character__container--margin">
      <div class="character__info rating">
        <label>Rating:</label>
        <img 
          src="../assets/avaliacao_on.svg" 
          alt="comics" 
        >
      </div>
      <div class="character__info last-comic">
        <label>Último quadrinho:</label>
        <span>
          {{ lastComic | formattedDate }}
        </span>
      </div>
    </div>

    <div class="character__container--column">
      <div class="character__comics">
        <h1 data-testid="secondary-title">
          Últimos lançamentos
        </h1>
      </div>
      <div 
        class="character__comics list" 
        data-testid="latest-editions"
      >
        <figure 
          v-for="(item, i) of comics" 
          v-show="i < 10" 
          :key="i"
        >
          <img
            name="comic"
            :src="`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`"
            :alt="`${item.thumbnail.path}`"
          >
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from "../components/BaseSearch.vue";
import marvelService from "../services/marvelService";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "CharacterDetail",
  components: {
    BaseSearch,
  },
  filters: {
    formattedDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "Não encontrado";
    },
  },
  data() {
    return {
      currentCharacter: {},
      comics: [],
      lastComic: null,
      isEmpty: false,
    };
  },
  computed: {
    ...mapGetters({
      getLoading: "getLoading",
      currentFavorites: "getFavorites",
    }),
  },
  created() {
    if (this.getLoading) {
      this.handleLoading();
    }

    const storage = JSON.parse(localStorage.getItem("favorites"));

    if (storage) {
      this.$store.dispatch("setFavoritesFromLocalStorage", storage);
    }

    const { id } = this.$route.params;

    this.findCharacterById(id);
  },
  methods: {
    checkIfisFavorite(id) {
      const isFavorite = this.currentFavorites.find((item) => item.id === id);

      if (isFavorite) {
        this.currentCharacter.favorite = true;
      }
    },
    async findCharacterById(id) {
      this.handleLoading();

      this.currentCharacter = await marvelService
        .getCharacterById(id)
        .then(({ data }) =>
          data.data.results[0]
            ? { ...data.data.results[0], favorite: false }
            : ""
        );

      this.checkIfisFavorite(this.currentCharacter.id);

      this.findComics(this.currentCharacter);
    },
    findComics({ comics }) {
      const ids = this.resolveUrl(comics);

      ids.forEach((id) => {
        marvelService.getComicById(id).then(({ data }) => {
          this.comics.push(data.data.results[0]);
          this.setLastSale(this.comics[0]);
        });
      });

      this.handleLoading();
    },
    setLastSale({ dates }) {
      this.lastComic = dates[0].date;
    },
    handleResponse(value) {
      if (value) {
        this.isEmpty = false;
        this.currentCharacter = value[0];
        this.handleLoading();

        return this.findComics(this.currentCharacter);
      }
      this.isEmpty = true;
    },
    handleLoading() {
      this.$store.dispatch("setLoading");
    },
    resolveUrl({ items }) {
      return items.map((item) => item.resourceURI.split("/").pop());
    },
    redirectToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: column;
  max-width: 1000px;

  &__not-found {
    color: $secondary-red;
    font-size: 1rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;

    & h1 {
      font-size: 2.5rem;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    }
  }

  &__description {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: $primary-gray;

    &--no-description {
      margin: 60px 0;
    }

    & p {
      letter-spacing: 2.5px;
      line-height: 1.8;
    }
  }

  &__profile-photo {
    display: flex;
    justify-content: center;
    align-items: center;

    &--empty {
      margin-left: 0;
    }
  }

  &__info {
    display: flex;
    width: 350px;
    margin-top: 16px;

    & label {
      color: $primary-black;
      font-size: 1rem;
      font-weight: 500;
    }

    &.detail {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    &.rating {
      align-items: center;

      & img {
        width: 18px;
        height: 18px;
      }
    }

    &.last-comic {
      align-items: center;

      & span {
        color: $primary-gray;
        font-weight: 500;
        margin-left: 10px;
      }
    }

    & img {
      width: 24px;
      height: 24px;
    }

    & span {
      margin-left: 20px;
    }
  }

  &__comics {
    &.list {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      max-width: 900px;
      gap: 5px;

      & figure {
        margin: 0 0 0.5rem 0;
        padding: 0;
        max-height: 340px;
        overflow: hidden;
        position: relative;
        flex-basis: 80%;
      }

      & figure img {
        width: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }

  &__container {
    display: flex;

    &--column {
      flex-direction: column;
    }

    &--margin {
      margin-top: 20px;
    }

    &--between {
      justify-content: space-between;
    }

    &--row {
      flex-direction: row;
    }

    &--wrap {
      flex-wrap: wrap;
      max-width: 40rem;
      margin-bottom: 80px;
    }
  }
}

@media (min-width: 450px) {
  .character {
    &__comics {
      &.list {
        figure {
          flex-basis: 45%;
        }
      }
    }
  }
}

@media (min-width: 600px) {
  .character {
    &__comics {
      &.list {
        justify-content: space-between;
        figure {
          flex-basis: 23%;
        }
      }
    }
    &__header {
      display: grid;
      margin: 0 auto;

      &.search {
        width: 60%;
      }
    }
  }
}
</style>
