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
}

figure img {
  width: 100%;
  margin-bottom: -4px;
  object-fit: cover;
}
</style>
