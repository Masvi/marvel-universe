<template>
  <div 
    class="base-favorite"
    @click="setAsFavorite"
  >
    <span 
      class="base-favorite__icon"
      :class="{'base-favorite__icon--is-large': isLarge }"
    >
      <img
        v-if="isFavorite"
        src="../assets/favorito_01.svg"
        alt="favorite"
      >
      <img
        v-else
        src="../assets/favorito_02.svg"
        alt="favorite"
      >
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "BaseFavorite",
  props: {
    character: {
      type: Object,
      required: true,
      default: null
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
    }),
    isFavorite() {
      return !!this.currentFavorites.find((item) => item.id === this.character.id)
    },
  },
  methods: {
    setAsFavorite() {
      if (!(this.isFavorite)) {
        return this.$store.dispatch("setFavorite", this.character); 
      } 
      this.$store.dispatch("unsetFavorite", this.character); 
    },
  }
}
</script>

<style lang="scss" scoped>
.base-favorite {
  display: flex;
  cursor: pointer;

  &__icon {

    & img {
      height: 16px;  
      width: 16px;
    }

    &--is-large {
      & img {
        height: 24px;  
        width: 24px;
      }
    }

    &:hover > img {
      transform: scale(1.1);
      transition: all .4s;
    }
  }
}
</style>    