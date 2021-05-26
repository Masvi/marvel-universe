<template>
  <div class="base-search">
    <input
      :value="value" 
      type="text"
      placeholder="Procure por heróis"
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
    height: 67px;
    border-radius: 50px;
    background: #FDECEC;
  }
}

</style>