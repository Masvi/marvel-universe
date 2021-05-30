const install = (Vue) => {
  Vue.component('base-search', () => import('../components/BaseSearch.vue'));
  Vue.component('base-card-item', () => import('../components/BaseCardItem.vue'));
  Vue.component('base-loading', () => import('../components/BaseLoading.vue'));
  Vue.component('base-favorite', () => import('../components/BaseFavorite.vue'));
}

export default install;
