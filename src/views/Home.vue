<template>
  <div class="home">
    <Header />
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
}

</style>