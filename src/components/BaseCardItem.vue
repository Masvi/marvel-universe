<template>
  <div class="card-item">
    <div class="card-item__photo">
      CardItem
    </div>
    <div class="card-item__container">
      <div class="card-item__title">
        Photo do cara
      </div>
      <span class="card-item__favorite">
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

}
</script>

<style lang="scss" scoped>
.card-item {
  width: 200px;
  height: 310px;
  padding: .75rem;
  margin-bottom: 2rem;

  &__photo {
    height: 290px;
    background: rgb(155, 245, 38);
    border-bottom: 2.5px solid red;
  }

  &__title {
    color: black;
  }

  &__favorite {
    height: 16px;
    cursor: pointer;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
  }
}
</style>