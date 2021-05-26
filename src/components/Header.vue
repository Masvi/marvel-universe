<template>
  <div class="header">
    <img
      src="../assets/logo.svg"
      alt="marvel"
    >
    <div class="header__title">
      Explore o universo
    </div>
    <div class="header__description">
      Mergulhe no domínio deslumbrante de todos os personagens os personagens 
      clássicos que você ama - e aqueles que você descobrirá em breve!
    </div>
  </div>
</template>

<script>
export default {


}
</script>

<style lang="scss" scoped>
.header {

  &__title {
    color: $primary-black;
    font-weight: 800;
    font-size: 28px;
    height: 50px;
    text-transform: uppercase;
  }

  &__description {
    color: $primary-gray;
    font-weight: 500;
    font-size: 15px;
  }
}
</style>