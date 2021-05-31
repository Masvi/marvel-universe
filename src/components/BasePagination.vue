<template>
  <div class="base-pagination">
    <button 
      class="base-pagination__button"
      :class="{ 'base-pagination__button--disabled': disableBtn}"
      :disabled="disableBtn"
      @click="prev"
    >
      Anterior
    </button>
    <button 
      class="base-pagination__button"
      @click="next"
    >
      Próximo
    </button>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    metadata: {
      type: Object,
      required: true
    }
  },
  computed: {
    disableBtn() {
      return (this.metadata.offset === 0)
    }
  },
  methods: {
    next() { 
      let { offset } = this.metadata;
      this.$emit('handlePagination', offset + 20) 
    },
    prev() { 
      let { offset } = this.metadata;
      this.$emit('handlePagination', offset - 20) 
    }
  }
}
</script>

<style lang="scss" scoped>
.base-pagination {

  &__button {
    color: $secondary-red;
    font-weight: 500;
    border-radius: 2px;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: none;
    transition: background-color .3s;
    cursor: pointer;
    padding: 1rem;
    margin: .5rem;
    
    &:hover {
      color:$primary-gray;
    }

    &--disabled {
      color:$primary-gray;
    }
  }
}
</style>