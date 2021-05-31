<template>
  <div class="base-toggle">
    <input
      id="checkbox"
      v-model="checked"
      type="checkbox"
      @change="change"
    >
    <label
      for="checkbox"
      class="base-toggle__slider"
    />
  </div>
</template>

<script>
export default {
  name: "BaseToggle",
  props: {
    defaultChecked: {
      type: Boolean, 
      default: false
    }
  },
  data() {
    return {
      checked: false,
    }
  },
  watch: {
    defaultChecked() {
      this.checked = this.defaultChecked
      this.change()           
    }
  },
  created() {
    this.checked = this.defaultChecked;
  },
  methods: {
    change() {
      this.$emit("input", this.checked)
    },  
  }
}
</script>

<style lang="scss" scoped>
.base-toggle {
  display: flex;
  align-items: center;
  padding: 6px;

  &__slider {
    position: relative;
    width: 45px;
    height: 23px;
    background: #ddd;
    transition: .4s;
    border-radius: 15px;
    cursor: pointer
  }

  &__slider::before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 5px;
    top:4px;
    background: $secondary-red;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 0 1px rgba(0,0,0,0.15);
  }

  input {
    display: none;
  }

  input:checked + .base-toggle__slider {
    background:#ddd;
  }

  input:checked + .base-toggle__slider:before {
    transform: translateX(20px);
  }
}
</style>