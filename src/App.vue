<template>
  <div class="app">
    <base-loading v-show="$store.state.isLoading" />
    <div id="#main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer';
import { EventBus } from "./plugins/eventBus"

export default {
  name: 'App',
  components: {
    Footer
  },
  created() {
    EventBus.$on('favoriteLimite', () => {
      this.showNotification();
    })
  },
  methods: {
    showNotification() {
      this.$toast.open({
        message: 'Você atingiu o número máximo de favoritos!',
        type: 'default',
        position: 'top-right',
        pauseOnHover: true,
      });
    },
  }
}
</script>

<style lang="scss">
* {
  /* margin: 0;
  padding: 0; */
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
