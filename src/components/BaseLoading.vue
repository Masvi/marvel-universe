<template>
  <transition name="fade">
    <div class="base-loading">
      <div class="base-loading__img">
        <img
          src="../assets/loadingdot.svg"
          alt="loading"
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseLoading'
}
</script>

<style lang="scss" scoped>
.base-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: fixed;
  
  background: $secondary-red;

  & img {
    width: 100px;
  }
}
</style>