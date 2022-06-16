<template>
  <div class="base-list-menu">
    <div class="base-list-menu results">
      {{ resolveCounter }}
    </div>
    
    <div class="base-list-menu base-list-menu__actions">
      <img
        src="../assets/icons/ic_heroi.svg"
        alt="character"
      >
      Ordernar A/Z
      <base-toggle
        :default-checked="sortByName"
        @input="sort"
      />
             
      <div
        class="base-list-menu__favorites"
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
        <span>Somente favoritos</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
      default: null,
    },
    sortByName: Boolean,
    onlyFavorites: Boolean,
  },
  computed: {
    resolveCounter() {
      return !this.onlyFavorites
        ? `Econtrados ${this.metadata.total} heróis`
        : "Favoritos encontrados";
    },
  },
  methods: {
    showOnlyFavorites() {
      this.$emit("favorite-only");
    },
  },
};
</script>

<style lang="scss" scoped>
.base-list-menu {
  display: flex;
  padding: 0.2rem;
  font-size: 0.8rem;

  &.results {
    font-weight: 500;
    color: $primary-gray;
  }

  &__actions {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  &__favorites {
    align-items: flex-end;
    justify-content: flex-end;
/* 
    & span {
      text-align: end;
    } */
  }

  /* & img {
    padding: .2rem;
  }  */

  & div {
    display: flex;
    align-items: center;
  }
}
</style>
