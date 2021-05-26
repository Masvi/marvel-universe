<template>
  <div class="home">
    <Header />
    <div class="home__search-section">
      <base-search />
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
  justify-content: center;
  flex-direction: column;

  &__search-section {
    margin-top: 35px;
  }
}

</style>