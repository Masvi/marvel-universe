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
  background-color: $secondary-red;
  height: 2.5rem;
  font-weight: 600;
  justify-content:center;
  align-items:center;

  &__info {
    color: $primary-red;
    font-size: .75rem;
  }
}
</style>