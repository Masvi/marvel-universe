const install = (Vue) => {
  Vue.component('base-search', () => import('../components/BaseSearch.vue'));
}

export default install;
