<template>
  <div class="header">
    <img
      src="../assets/logo.svg"
      alt="marvel"
      @click="redirectToHome()"
    >
    <div
      data-testid="main-title"
      class="header__title"
    >
      <h1>Explore o universo</h1>
    </div>
    <div
      data-testid="main-description"
      class="header__description"
    >
      <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    redirectToHome() {
      this.$router.push({ name: "home" });
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    & h1 {
      color: $primary-black;
      font-weight: 800;
      font-size: 28px;
      height: 50px;
      text-transform: uppercase;
    }
  }

  &__description {
    color: $primary-gray;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    padding: 1rem;
    max-width: 800px;
  }

  & img {
    cursor: pointer;
  }
}
</style>