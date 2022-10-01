<template>
  <figure>
    <img
      :src="`${current.thumbnail.path}/portrait_uncanny.${current.thumbnail.extension}`"
      :alt="current.name"
      @click="$emit('click')"
    >
    <figcaption>
      {{ current.name }}
      <BaseFavorite :character="current" />
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "BaseCardItem",
  components: {
    BaseFavorite: () => import("../BaseFavorite.vue"),
  },
  props: {
    character: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      current: null,
    };
  },
  created() {
    this.current = this.character;
  },
};
</script>

<style lang="scss" scoped>

figure {
  margin: 0 0 0.5rem 0;
  padding: 0;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}

figure img {
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}

figcaption {
  background-color: rgba(18, 17, 17, 0.8);
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 0;
  width: 94%;
  margin: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
