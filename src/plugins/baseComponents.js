const install = (Vue) => {
  Vue.component('base-search', () => import('../components/BaseSearch.vue'));
  Vue.component('base-card-item', () => import('../components/BaseCardItem/BaseCardItem.vue'));
  Vue.component('base-loading', () => import('../components/BaseLoading.vue'));
  Vue.component('base-favorite', () => import('../components/BaseFavorite.vue'));
  Vue.component('base-pagination', () => import('../components/BasePagination.vue'));
  Vue.component('base-toggle', () => import('../components/BaseToggle.vue'));
  Vue.component('base-list-menu', () => import('../components/BaseListMenu.vue'));
}

export default install;
