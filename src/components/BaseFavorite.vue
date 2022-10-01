<template>
  <div 
    class="base-favorite"
    @click="setAsFavorite"
  >
    <span
      data-testid="favorite-icon" 
      class="base-favorite__icon"
      :class="{'base-favorite__icon--is-large': isLarge }"
    > 
      <img
        v-if="character.favorite"
        src="../assets/favorito_01.svg"
        alt="favorite-checked"
        data-testid="icon-01"
      >
      <img
        v-else
        src="../assets/favorito_02.svg"
        alt="favorite"
        data-testid="icon-02"
      >
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from "../plugins/eventBus";

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
      getFavorites : "getFavorites"
    }),
  },
  methods: {
    setAsFavorite() {
      if (this.getFavorites.length === 6 && !this.character.favorite) {
        EventBus.$emit("favoriteLimite");
      }
   
      if (!this.character.favorite && this.getFavorites.length < 6) {
        this.character.favorite = true;
        return this.$store.dispatch("setFavorite", this.character); 
      }

      if (this.character.favorite) {
        this.character.favorite = false;
        this.$store.dispatch("unsetFavorite", this.character); 
      }
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