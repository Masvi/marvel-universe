<template>
  <div class="not-found">
    404
    <span>
      Página não encontrada! 
      <a @click="redirectToHome()">
        voltar
      </a>
    </span>
  </div>  
</template>
<script>
export default {
  methods: {
    redirectToHome() {
      this.$router.push({name: "home"});
    } 
  }
}
</script>
<style lang="scss">
.not-found {
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  color: $primary-black;
  font-size: 5rem;
  font-weight: 400;

  & span {
    font-size: 1rem;

    & a {
      color: $primary-black;
      font-weight: 800;
      cursor: pointer;
    
      &:hover {
        color: $primary-gray;
      }
    }
  }
}
</style>