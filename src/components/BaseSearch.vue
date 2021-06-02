<template>
  <div class="base-search">
    <div class="base-search__container">
      <input
        id="search"
        v-model="characterName"
        name="search"
        class="base-search__input"
        placeholder="Procure por heróis"
        onfocus="placeholder=''"
        onblur="placeholder='Procure por heróis'" 
        type="text"
        @focus="() => showHint = !showHint"
        @blur="() => showHint = !showHint"
        @keyup.enter="searchByName"
        @keyup="onChange"
      >
    </div>
    <span
      v-show="error"
      class="base-search__warning base-search__warning--error"
    >
      Nenhum resultado encontrado
    </span>
  </div>
</template>

<script>

import marvelService from '../services/marvelService';
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      characterName: '',
      showHint: false,
      error: false
    }
  },
    computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
    }),
  },
  methods: {
    searchByName() {
      if (this.characterName !== '') {

        this.$store.dispatch("setLoading");
        
        marvelService.getCharacterByName(this.characterName)
          .then(({ data }) => { 
            
            if (!data.data.results[0]) {
              return this.$emit('response', null);
            }

            const search = {...data.data.results[0], favorite: false };
            
            this.checkIfisFavorite(search);   
          })
          .finally(() => this.$store.dispatch("setLoading"));
      }
    },
    checkIfisFavorite(response) {    
      this.currentFavorites.forEach(item =>{
        if (response.id === item.id) {
          response.favorite = true;
        }
      })
      this.$emit('response', [response]) 
    },
    onChange() {
      this.$emit('typing', this.characterName)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;

  &__container {
    display: flex;
    flex-direction: column;
    height: 50px;
  }

  &__input{
    flex: 1;
    width: 100%;
    height: 60px;
    min-width: 450px;
    border-radius: 50px;
    text-indent: 70px;
    border: none;
    outline: none;
    background: $primary-red url(../assets/icons/ic_busca.svg) no-repeat 20px 10px;
    transition: all .4s;
  }

  &__warning {
    font-size: .75rem;
    margin-top: 10px;
    color: $primary-gray;

    &--error {
      color: $secondary-red;
    }
  }

  ::-webkit-input-placeholder {
    color: $secondary-red;
  }
}

</style>