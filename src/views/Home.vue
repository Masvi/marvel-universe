<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search />
    </div>
    <div class="home__menu">
      <div class="home__menu results">
        Econtrados 20 heróis
      </div>
      <div class="home__menu options">
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

    <div class="home__list">
      <base-card-item
        v-for="(item, i) of array"
        :key="item"
      > 
        {{ i }}
      </base-card-item>
    </div>
  </div>
</template>

<script>

import Header from '../components/Header';

export default {
  components: {
    Header
  },
  data() {
    return {
      array: [0,1,2,3,4,5,6,7,9,10,11,12]
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 4rem;

  &__search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    width: 60rem;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0;
    width: 100%;
  
    & .results { 
      height: 30px;
      padding-left: 20px;
    }

    & .options {
      padding-right: 20px;
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

  &__list {
    display: flex;
    justify-content:center;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

</style>