<template>
  <div class="card-item">
    <div class="card-item__photo">
      <img 
        :src="`${imgUrl}/portrait_xlarge.${extension}`"
        :alt="name"
        @click="$emit('click')"
      >
    </div>
    <div class="card-item__container">
      <div 
        class="card-item__title"
        @click="$emit('click')"
      >
        {{ name }}
      </div>
      <div 
        class="card-item__favorite"
        @click="$emit('onClick')"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    extension: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
    }),
    isFavorite() {
      return !!this.currentFavorites.find((item) => item.id === this.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.card-item {
  width: 150px;
  height: 310px;
  padding: .75rem;

  &__photo {
    height: 224px;
    border-bottom: 2.5px solid $secondary-red;

    & img {
      border-radius: 2px;
      cursor: pointer;
    }
  }

  &__title {
    font-weight: 800;
    font-size: .75rem;
    color: $primary-black;
    cursor: pointer;
  }

  &__favorite {
    height: 16px;
    cursor: pointer;

    & span:hover > img{
      transform: scale(1.1);
      transition: all 0.4s;
    }
  }

  &__container {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
  }
}
</style>