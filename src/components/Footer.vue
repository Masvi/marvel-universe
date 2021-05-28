<template>
  <div class="footer">
    <div class="footer__info">
      <slot />
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>

.footer {
  display: flex;
  justify-content:center;
  align-items:center;

  font-weight: 600;
  background-color: $secondary-red;
  height: 2.5rem;


  &__info {
    color: $primary-red;
    font-size: .75rem;
  }
}
</style>