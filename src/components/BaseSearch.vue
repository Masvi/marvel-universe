<template>
  <div class="base-search">
    <input
      v-model="characterName"
      data-testid="search-home"
      name="search"
      class="base-search__input"
      placeholder="Procure por heróis"
      onfocus="placeholder=''"
      onblur="placeholder='Procure por heróis'"
      type="text"
      @keyup="debounceFn(searchByName)"
    >
    <span
      v-show="err"
      data-testid="search-err"
      class="base-search__warning base-search__warning--error"
    >
      Nenhum resultado encontrado
    </span>
  </div>
</template>

<script>
import marvelService from "../services/marvelService";
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    err: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      characterName: "",
      isCalling: false,
      debounce: 2000,
    };
  },
  computed: {
    ...mapGetters({
      currentFavorites: "getFavorites",
    }),
  },
  methods: {
    debounceFn(fn) {
      if (this.isCalling) return;

      this.isCalling = true;

      setTimeout(() => {
        fn(this.characterName);
        this.isCalling = false;
      }, this.debounce);
    },
    searchByName() {
      if (this.characterName !== "") {
        this.$store.dispatch("setLoading");

        marvelService
          .getCharacterByName(this.characterName)
          .then(({ data }) => {
            if (!data.data.results[0]) {
              return this.$emit("response", null);
            }

            const response = this.checkIfisFavorite({
              ...data.data.results[0],
            });
            
            const search = { ...data.data.results[0], favorite: response };

            this.$emit("response", [search]);
          })
          .finally(() => this.$store.dispatch("setLoading"));
      } else {
        this.$emit("response", []);
      }
    },
    checkIfisFavorite(response) {
      let isFavorite = false;

      this.currentFavorites.length &&
        this.currentFavorites.forEach((item) => {
          if (response.id === item.id) {
            isFavorite = true;
          }
        });

      return isFavorite;
    },
  },
};
</script>
<style lang="scss" scoped>
.base-search {
  display: flex;
  flex-direction: column;

  &__input {
    width: 100%;
    height: 3rem;
    text-indent: 4rem;
    border-radius: 50px;
    border: none;
    outline: none;
    background: $primary-red url(../assets/icons/ic_busca.svg) no-repeat 20px
      10px;
    transition: all 0.4s;
  }

  &__warning {
    font-size: 0.9rem;
    margin: 10px 15px 0 10px;
    color: $primary-gray;

    &--error {
      color: $secondary-red;
    }
  }

  ::-webkit-input-placeholder {
    color: $secondary-red;
  }
}
</style>
