<template>
  <div class="card-item">
    <div class="card-item__photo">
      <img
        :src="`${current.thumbnail.path}/portrait_xlarge.${current.thumbnail.extension}`"
        :alt="current.name"
        @click="$emit('click')"
      >
    </div>
    <div class="card-item__container">
      <div
        data-testid="card-item"
        class="card-item__title"
        @click="$emit('click')"
      >
        {{ current.name }}
      </div>
      <div class="card-item__favorite">
        <base-favorite :character="current" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.card-item {
  width: 150px;
  height: 310px;
  padding: .3rem;

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
    font-size: 0.75rem;
    color: $primary-black;
    cursor: pointer;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
  }
}
</style>
