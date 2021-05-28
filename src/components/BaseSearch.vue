<template>
  <div class="base-search">
    <input
      class="base-search__input"
      :value="value"
      placeholder="Procure por heróis"
      onfocus="placeholder=''" 
      onblur="placeholder='Procure por heróis'"
      type="text"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  }
}
</script>

<style lang="scss" scoped>
.base-search {
  display: flex;
  align-items: center;
  width: 50vw;

  &__input{
    flex: 1;
    width: 100%;
    height: 47px;
    border-radius: 50px;
    text-indent: 70px;
    border: none;
    outline: none;
    background: $primary-red url(../assets/icons/ic_busca.svg) no-repeat 20px 10px;
  }

  ::-webkit-input-placeholder {
    color: $secondary-red;
  }
}

</style>