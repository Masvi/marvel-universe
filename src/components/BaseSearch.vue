<template>
  <div class="base-search">
    <input
      :value="value"
      placeholder="Procure por heróis"
      onfocus="placeholder=''" 
      onblur="placeholder='Procure por heróis'"
    >
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.base-search {
  padding: 1rem;

  & input {
    width: 100%;
    height: 47px;
    border-radius: 50px;
    text-indent: 70px;
    border: none;
    outline: none;
    background: $primary-red url(../assets/icons/ic_busca.svg) no-repeat 20px 10px;
  }

  ::-webkit-input-placeholder {
    color:red;
  }
}

</style>