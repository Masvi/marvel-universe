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
      <span>
        A/Z
      </span>
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
        <span>Favoritos</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Array,
      default: null,
    },
    sortByName: Boolean,
    onlyFavorites: Boolean,
  },
  computed: {
    resolveCounter() {
      return this.metadata.length === 1
        ? `Encontrado ${this.metadata.length} herói`
        : `Econtrados ${this.metadata.length} heróis`;
    },
  },
  methods: {
    showOnlyFavorites() {
      this.$emit("favorite-only");
    },
    sort() {
      this.$emit("sort");
    }
  },
};
</script>

<style lang="scss" scoped>
.base-list-menu {
  display: flex;
  margin: 0 5px 0 5px;
  font-size: 0.8rem;
  max-width: 800px;
  width: 100%;

  &__favorites {
    color: $primary-gray;
    font-weight: 500;
  }

  &.results {
    font-weight: 500;
    color: $primary-gray;
  }

  &__actions {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    cursor: pointer;
    
    & span {
      margin-right: 5px;
    }
  }

  & img {
    padding: .3rem;
  }

  & div {
    display: flex;
    align-items: center;
  }
}
</style>
