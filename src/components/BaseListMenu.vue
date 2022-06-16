<template>
  <div class="base-list-menu">
    <div class="base-list-menu results">
      {{ test }}
    </div>
    <div class="base-list-menu base-list-menu__options">
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
        Somente favoritos
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
    test() {
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
  justify-content: space-between;
  font-size: .80rem;
  padding: .2rem;
  width: 800px;

  &.results {
    font-weight: bold;
    color: $primary-gray;
  }

  & img {
    padding: .2rem;
  }

  & div {
    display: flex;
    align-items: center;
  }
}
</style>
