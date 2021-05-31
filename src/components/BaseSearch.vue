<template>
  <div class="base-search">
    <div class="base-search__container">
      <input
        v-model="characterName"
        class="base-search__input"
        placeholder="Procure por heróis"
        onfocus="placeholder=''"
        onblur="placeholder='Procure por heróis'" 
        type="text"
        @focus="() => showHint = !showHint"
        @blur="() => showHint = !showHint"
        @keyup.enter="searchByName"
      >
    </div>
    <span
      v-show="showHint && !error"
      class="base-search__warning"
    >
      Pressione enter para buscar
    </span>
    <span
      v-show="error"
      class="base-search__warning base-search__warning--error"
    >
      Você precisa digitar um nome válido
    </span>
  </div>
</template>

<script>

import marvelService from '../services/marvelService';

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
  methods: {
    searchByName() {
      if (this.characterName) {
        marvelService.getCharacterByName(this.characterName).then(({ data }) => {
          console.log(data)
        });
      }

      this.error = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.base-search {
  display: flex;
  flex-direction: column;
  height: 80px;
  align-items: center;

  &__container {
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 50px;
  }

  &__input{
    flex: 1;
    width: 100%;
    height: 60px;
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