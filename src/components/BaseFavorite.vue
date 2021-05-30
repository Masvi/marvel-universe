<template>
  <div 
    class="base-favorite"
    @click="setAsFavorite"
  >
    <span v-if="!isFavorite">
      <img
        src="../assets/favorito_02.svg"
        alt="favorite"
      >
    </span>
    <span v-else>
      <img
        src="../assets/favorito_01.svg"
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
      const favorite = this.currentFavorites.find((item) => this.character.id === item.id);
  
      if (!(favorite)) {
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
  height: 16px;
  cursor: pointer;

  & span:hover > img{
    transform: scale(1.1);
    transition: all 0.4s;
  }
}
</style>