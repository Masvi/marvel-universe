<template>
  <div class="character">
    <div class="character__header">
      <div class="character__header logo">
        <img
          src="../assets/logo_menor.svg"
          alt="logo"
        >
      </div>
      <div class="character__header search">
        <base-search />
      </div>
    </div>
    <div class="character__section">
      <div class="character__container">
        <div class="character__section character__title">
          {{ currentCharacter.name }}
        </div>
        <div class="character__section character__favorite">
          <span>
            <img
              src="../assets/favorito_01.svg"
              alt="favorite"
            >
          </span>
        </div>
      </div>
      <div class="character__container character__container--column">
        <div 
          v-if="currentCharacter.description"
          class="character__description"
        >
          <p>  
            {{ currentCharacter.description }}
          </p>
        </div>
        <span 
          v-else
          class="character__description character__description--no-description"
        >
          O personagen não possui descrição ainda!
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '../components/BaseSearch.vue';
export default {
  name: "CharacterDetail",
  components: { BaseSearch },
  data() {
    return {
      currentCharacter: {}
    }
  },
  created() {
    const { id, item } = this.$route.params;

    if (!item ) {
      // TODO: busca na api... 
    }
    console.log(id);
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: column;
  margin: 2rem 4rem;

  &__header {
    display: flex;
    
    &.logo {
      padding: .75rem;
    }

    &.search {
      max-width: 800px;
    }
  }
  
  &__section {
    margin-top: 60px;
    max-width: 400px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__favorite {
    display: flex;
    align-items: center;
    height: 50px;
    font-weight: 500;

    & img {
      width: 28px;
      height:28px;
    }
  }

  &__description { 
    margin-top: 1rem;
      font-size: 1rem;
      font-weight: 500;
      color: $primary-gray;

    & p {
      letter-spacing: 2.5px;
      line-height: 1.8;
    }

    &--no-description {
      margin-top: 80px;
    }
  }
  
  &__container { 
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--column {
      flex-direction: column;
    }
  }
}
</style>