<template>
  <div class="character">
    <div class="character__header">
      <div class="character__header logo">
        <img
          src="../assets/logo_menor.svg"
          alt="logo"
        >
      </div>
      <div class="character__header search">
        <base-search />
      </div>
    </div>
    <div class="character__section">
      <div class="character__container character__container--between">
        <div class="character__section character__title">
          {{ currentCharacter.name }}
        </div>
        <div class="character__section character__favorite">
          <span>
            <img
              src="../assets/favorito_01.svg"
              alt="favorite"
            >
          </span>
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
          O personagen não possui descrição ainda!
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
          <span>10/02/2001</span>
        </div>
      </div>
    </div>
    <div class="character__container--column">
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
            v-if="item.title.length < 10"
            class="character__comics title"
          >
            {{ item.title }}
          </span>
          <span 
            v-else
            class="character__comics title"
          >
            {{ item.title.substring(0,12)+"..." }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '../components/BaseSearch.vue';
import marvelService from '../services/marvelService';

export default {
  name: "CharacterDetail",
  components: { 
    BaseSearch 
  },
  data() {
    return {
      currentCharacter: {},
      comics: [],
      show: false
    }
  },
  created() {
    const { id } = this.$route.params;
    this.findCharacterById(id);
  },
  methods: {
    async findCharacterById(id) {
      this.handleLoading();
      
      await marvelService.getCharacterById(id)
        .then(({data}) => this.currentCharacter = data.data.results[0]);
      
      await this.handleWithComics(this.currentCharacter);

      this.handleLoading();
    },
    handleWithComics({ comics }) {
      comics.items.forEach((item) => {
        marvelService.getComicById(
          this.resolveUrl(item)
        )
        .then(({data}) => {
          this.comics.push(data.data.results[0]);
        });
      })
    },
    handleLoading() {
      this.$store.dispatch("setLoading");
    },
    resolveUrl({ resourceURI }) {
      return resourceURI.split("/").pop();
    },
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: column;
  margin: 2rem 4rem;

  &__header {
    display: flex;
    
    &.logo {
      padding: .75rem;
    }

    &.search {
      max-width: 800px;
    }
  }
  
  &__section {
    margin-top: 30px;
    max-width: 400px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__favorite {
    display: flex;
    align-items: center;
    height: 50px;
    font-weight: 500;

    & img {
      width: 28px;
      height:28px;
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
      cursor: pointer;
    }

    & h1 {
      color: $primary-black;
      font-size: 1.75rem;
    }
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
      width: 800px;
      margin-bottom: 80px;
    }
  }
}
</style>