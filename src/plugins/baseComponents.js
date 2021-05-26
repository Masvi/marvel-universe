const install = (Vue) => {
  Vue.component('base-search-input', () => import('../components/BaseSearchInput.vue'));
}

export default install;
