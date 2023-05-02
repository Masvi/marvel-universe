<template>
  <div class="app">
    <Header />
    <base-loading v-show="$store.state.isLoading" />
    <div id="main">
      <router-view />
    </div>
    <Footer>Every generation needs a hero</Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { EventBus } from "./plugins/eventBus";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    EventBus.$on("favoriteLimite", () => this.showNotification());
  },
  methods: {
    showNotification() {
      this.$toast.open({
        message: "Você atingiu o número máximo de favoritos!",
        type: "default",
        position: "top-right",
        pauseOnHover: true,
      });
    },
  },
};
</script>

<style lang="scss">
* {
  font-family: Roboto, "Helvetica Neue", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #main {
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}
</style>
