<template>
  <div class="card-item">
    <div class="card-item__photo">
      <img :src="`${imgUrl}/portrait_xlarge.${extension}`">
    </div>
    <div class="card-item__container">
      <div class="card-item__title">
        {{ name }}
      </div>
      <span 
        class="card-item__favorite"
        @click="$emit('onClick')"
      >
        <img
          src="../assets/favorito_02.svg"
          alt="marvel"
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  width: 150px;
  height: 310px;
  padding: .75rem;

  &__photo {
    height: 224px;
    border-bottom: 2.5px solid red;
  }

  &__title {
    font-weight: 800;
    font-size: .75rem;
    color: $primary-black;
  }

  &__favorite {
    height: 16px;
    cursor: pointer;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
  }
}
</style>