const install = (Vue) => {
  Vue.component('base-search', () => import('../components/BaseSearch.vue'));
  Vue.component('base-card-item', () => import('../components/BaseCardItem.vue'));
}

export default install;
