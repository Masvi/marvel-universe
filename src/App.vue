<template>
  <div class="app">
    <base-loading v-show="$store.state.isLoading" />
    <div id="#main">
      <router-view />
    </div>
    <Footer>
      Desenvolvido por Jean Masvi
    </Footer>
  </div>
</template>

<script>
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  font-family: Roboto, "Helvetica Neue", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

</style>
