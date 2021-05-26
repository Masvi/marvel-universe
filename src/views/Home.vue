<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search />
    </div>
    <div class="home__menu">
      <div class="home__menu home__menu--results">
        Econtrados 20 heróis
      </div>
      <div class="home__menu home__menu--options">
        <div>
          <img
            src="../assets/icons/ic_heroi.svg"
            alt="marvel"
          >
          Ordernar por nome de A/Z
        </div>
        <div>
          <img
            src="../assets/favorito_01.svg"
            alt="marvel"
          >
          Somente Favoritos
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__search-section {
    margin-top: 35px;
    width: 70%;
  }

  &__menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 900px;
    margin-top: 20px;
  
    &--results { 
      height: 30px;
    }

    &--options {
      justify-content: flex-end;
      height: 30px;
    }

    & img {
      padding: .5rem;
    }

    & div {
      display: flex;
      align-items: center;
      padding: .5rem;
    }
  }
}

</style>