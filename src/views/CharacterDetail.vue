<template>
  <div class="character">
    <div class="character__header">
      <div 
        class="character__header logo"
        @click="redirectToHome()"
      >
        <img
          src="../assets/logo_menor.svg"
          alt="logo"
        >
      </div>
      <div class="character__header search">
        <base-search 
          :search-api="true"
          @response="handleResponse"
        />
      </div>
    </div>
    <div class="character__section">
      <div class="character__container character__container--between">
        <div class="character__section character__title">
          {{ currentCharacter.name }}
        </div>
        <div class="character__section">
          <base-favorite 
            :is-large="true"
            :character="currentCharacter"
          />
        </div>
      </div>
      <div class="character__container character__container--column">
        <div 
          v-if="currentCharacter.description"
          class="character__description"
        >
          <p>  
            {{ currentCharacter.description }}
          </p>
        </div>
        <span 
          v-else
          class="character__description character__description--no-description"
        >
          O personagem não possui descrição ainda!
        </span>
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
    </div>
    <div class="character__container--column">
      <div class="character__comics-list">
        <div class="character__comics">
          <h1>Últimos lançamentos</h1>
        </div>
        <div class="character__container character__container--wrap">
          <div
            v-for="(item, i) of comics"
            v-show="i < 10"
            :key="i"
            class="character__comics item"
          >
            <img 
              :src="`${item.thumbnail.path}/portrait_medium.${item.thumbnail.extension}`"
            >
            <span
              class="character__comics title"
            >
              {{ item.dates[0].date | formattedDate }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '../components/BaseSearch.vue';
import marvelService from '../services/marvelService';
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
  name: "CharacterDetail",
  components: { 
    BaseSearch 
  },
  filters: {
    formattedDate(date) {
      return (date) ?  moment(date).format('DD/MM/YYYY') : 'Não encontrado';
    }
  },
  data() {
    return {
      currentCharacter: {},
      comics: [],
      lastComic: null,
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      getLoading: "getLoading",
    }),
  },
  created() {
    if (this.getLoading) {
      this.handleLoading();
    }

    const storage = JSON.parse(localStorage.getItem('favorites'));
    
    if (storage) {
      this.$store.dispatch("setFavoritesFromLocalStorage", storage); 
    }

    const { id } = this.$route.params;
    this.findCharacterById(id);
  },
  methods: {
    async findCharacterById(id) {
      this.handleLoading();
      
      await marvelService.getCharacterById(id)
        .then(({data}) => this.currentCharacter = data.data.results[0]);
      
      await this.findComics(this.currentCharacter);
      
      this.handleLoading();
    },
    findComics( { comics } ) {
      const ids = this.resolveUrl(comics);
      
      ids.forEach((id) =>  {
        marvelService.getComicById(id).then(({data}) => {
          this.comics.push(data.data.results[0]);
          this.setLastSale(this.comics[0]);
        });
      });
    },
    setLastSale({ dates }) {
      this.lastComic = dates[0].date;
    },
    handleResponse(value) {
      this.currentCharacter = value;
    },
    handleLoading() {
      this.$store.dispatch("setLoading");
    },
    resolveUrl({ items }) {
      return items.map(item => item.resourceURI.split("/").pop());
    },
    redirectToHome() {
       this.$router.push({name: "home"});
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem;

  &__header {
    display: flex;

    &.logo{
      cursor: pointer;
    }
    
    &.search {
      max-width: 500px;
      padding-top: 30px;
    }
  }
  
  &__section {
    margin-top: 30px;
    max-width: 400px;
    margin-left: 20px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-left: 0;
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

  &__info {
    display: flex;
    width: 350px;
    margin-top: 16px;

    & label {
      color:$primary-black;
      margin-right: 10px;
      font-size: 1rem;
      font-weight: 500;
    }

    &.detail {
      display: flex;
      justify-content:center;
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
    display: flex;
    margin-top: 30px;
    max-width: 900px;
    flex-wrap: wrap;
    
    &.item {
      display: flex;
      flex-direction: column;
      width: 100px;
      margin-right: 1.5rem;
    }

    &.title {
      font-size: .75rem;
      color: $primary-black;
      font-weight: 500;
      justify-content: center;
    }

    & h1 {
      color: $primary-black;
      font-size: 1.75rem;
    }
  }

  &__comics-list {
    margin-left: 20px;
  }

  &__container { 
    display: flex;
    align-items: center;

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
      max-width: 700px;
      margin-bottom: 80px;
    }
  }
}

@media screen and (max-width: 1440px) { 
  .character__header {
    display: flex;
    flex-wrap: wrap;
  }
  
  .character__section {
    max-width: 300px;
    margin-top: 1rem;
  }

  .character__title{ 
    font-size: 2rem;
  }
}
</style>